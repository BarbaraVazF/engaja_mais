import { useState } from "react";
import { Link, useFetcher, useNavigate, useRevalidator } from "react-router";
import { getActions } from "../api/getActions.server";
import { getStudent } from "../api/getStudent.server";
import FuncionalidadePopup from "../components/FuncionalidadePopup";
import Navbar from "../components/Navbar";
import VoltarButton from "../components/VoltarButton";
import type { Route } from "./+types/aluno.$alunoId._index";

export async function loader({ params, request }: Route.LoaderArgs) {
  const alunoId = params.alunoId;
  if (!alunoId) {
    throw new Response("Aluno não encontrado", { status: 404 });
  }

  const aluno = await getStudent(alunoId, request);
  if (!aluno) {
    throw new Response("Aluno não encontrado", { status: 404 });
  }

  const actions = await getActions(alunoId);

  return { aluno, actions };
}

type TypeChave =
  | "LEARN_PLAN"
  | "MATERIALS"
  | "GAMIFICATION"
  | "EVALUATION_MODEL";

export default function AlunoDetalhes({
  loaderData,
  params,
}: Route.ComponentProps) {
  const { actions, aluno } = loaderData;

  const navigate = useNavigate();

  const fetcher = useFetcher();
  const revalidator = useRevalidator();

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupChave, setPopupChave] = useState<TypeChave>("EVALUATION_MODEL");

  const removerRelatorio = async (id: string) => {
    await fetcher.submit(null, {
      method: "delete",
      action: `/api/reports/${id}`,
    });
    revalidator.revalidate();
  };

  const removerSolicitacao = async (id: string) => {
    await fetcher.submit(null, {
      method: "delete",
      action: `/aluno/${params.alunoId}/solicitacao/${id}`,
    });
    revalidator.revalidate();
  };

  const desabilitarBotao = aluno && aluno.report && aluno.report.length > 0;

  const handleFuncionalidadeClick = (title: string, chave: TypeChave) => {
    setPopupTitle(title);
    setPopupChave(chave);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleDownloadRelatorio = ({ content, title }: any) => {
    const uint8Array = new Uint8Array(Object.values(content));
    const blob = new Blob([uint8Array], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = title;
    document.body.appendChild(link);
    link.click();
  };

  if (!aluno) {
    return <div>Aluno não encontrado.</div>;
  }

  const handleVoltar = () => {
    navigate("/");
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="aluno-detalhes-page">
          <div className="header">
            <VoltarButton onClick={handleVoltar} />
            <h1>Detalhamento de {aluno.name}</h1>
          </div>
          <div className="funcionalidades">
            <h2
              style={{
                fontSize: "18px",
                marginBottom: "10px",
                marginTop: "15px",
              }}
            >
              Funcionalidades
            </h2>
            {actions &&
              actions!.map((func, index) => {
                const corComOpacidade = func.color + "33";
                return (
                  <button
                    key={index}
                    style={{
                      backgroundColor:
                        aluno.report && aluno.report.length === 0
                          ? "#d3d3d3"
                          : corComOpacidade,
                      border: `2px solid ${
                        aluno.report && aluno.report.length > 0
                          ? func.color
                          : "#d3d3d3"
                      }`,
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 15px",
                      borderRadius: "8px",
                      margin: "5px",
                      cursor:
                        aluno.report && aluno.report.length === 0
                          ? "not-allowed"
                          : "pointer", // Desabilita o clique
                    }}
                    onClick={() => {
                      if (aluno.report && aluno.report.length > 0) {
                        handleFuncionalidadeClick(func.title, func.key);
                      }
                    }}
                    disabled={aluno.report && aluno.report.length === 0} // Desabilita o botão
                  >
                    {func.title}
                  </button>
                );
              })}
          </div>

          <h2
            style={{
              fontSize: "18px",
              marginTop: "30px",
              textAlign: "left",
              width: "100%",
              marginLeft: 0,
            }}
          >
            Histórico de Solicitações
          </h2>

          <table className="relatorios-table">
            <thead>
              <tr>
                <th>Título da Solicitação</th>
                <th>Data da Solicitação</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {aluno.requests && aluno.requests.length > 0 ? (
                aluno.requests.map((solicitacao) => (
                  <tr key={solicitacao.id}>
                    <td>
                      <Link
                        to={`/aluno/${aluno.id}/solicitacao/${solicitacao.id}`}
                      >
                        {solicitacao.title}
                      </Link>
                    </td>
                    <td>
                      {new Date(solicitacao.createdAt).toLocaleDateString(
                        "pt-BR"
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => removerSolicitacao(solicitacao.id)}
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src="/apagar_aluno.png"
                          alt="Apagar"
                          width="20"
                          height="20"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>Nenhuma solicitação cadastrada.</td>
                </tr>
              )}
            </tbody>
          </table>

          <h2
            style={{
              fontSize: "18px",
              marginTop: "20px",
              textAlign: "left",
              width: "100%",
              marginLeft: 0,
            }}
          >
            Relatórios
          </h2>
          <table className="relatorios-table">
            <thead>
              <tr>
                <th>Nome do Relatório</th>
                <th>Data de Inserção</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {aluno.report && aluno.report.length > 0 ? (
                aluno.report.map((rel) => (
                  <tr key={rel.id}>
                    <td>{rel.title}</td>
                    <td>
                      {new Date(rel.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td>
                      <button
                        onClick={() => removerRelatorio(rel.id)}
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          marginRight: "10px",
                        }}
                      >
                        <img
                          src="/apagar_aluno.png"
                          alt="Apagar"
                          width="20"
                          height="20"
                        />
                      </button>
                      <button
                        onClick={() => handleDownloadRelatorio(rel)}
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src="/download.png"
                          alt="Download"
                          width="20"
                          height="20"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>Nenhum relatório cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>

          {(!aluno.report || aluno.report.length === 0) && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <button
                disabled={desabilitarBotao}
                onClick={() =>
                  !desabilitarBotao &&
                  navigate(`/cadastrar-relatorio/${params.alunoId}`)
                }
                style={{
                  width: "900px",
                  padding: "12px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: desabilitarBotao ? "#5A5858" : "#022651",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: desabilitarBotao ? "not-allowed" : "pointer",
                  opacity: desabilitarBotao ? 1 : 1,
                }}
              >
                Inserir Relatório
              </button>
            </div>
          )}

          {aluno.report && aluno.report.length > 0 && (
            <div
              style={{
                textAlign: "center",
                color: "gray",
                fontSize: "16px",
                marginBottom: "6px",
              }}
            >
              Para inserir um novo relatório, é necessário excluir o atual.
            </div>
          )}

          {popupOpen && (
            <FuncionalidadePopup
              title={popupTitle}
              chave={popupChave}
              alunoId={params.alunoId}
              onClose={handleClosePopup}
            />
          )}
        </div>
      </div>
    </div>
  );
}
