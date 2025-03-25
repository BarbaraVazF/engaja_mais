import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteReport } from "../api/deleteReport";
import { getActions } from "../api/getActions";
import { getStudent } from "../api/getStudent";
import FuncionalidadePopup from "../components/FuncionalidadePopup";
import Navbar from "../components/Navbar";
import VoltarButton from "../components/VoltarButton";

const AlunoDetalhes = () => {
  const { alunoId } = useParams();
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupChave, setPopupChave] = useState("");
  const [aluno, setAluno] = useState(null);
  const [actions, setActions] = useState([]);

  let params = useParams();
  function getAluno() {
    getStudent(params.alunoId).then((aluno) => {
      setAluno(aluno);
    });

    getActions(params.alunoId).then((actions) => {
      setActions(actions);
    });
  }

  useEffect(() => {
    getAluno();
  }, [alunoId]);

  const removerRelatorio = async (id) => {
    await deleteReport(params.alunoId, id);
    await getAluno();
  };

  const desabilitarBotao = aluno?.report && aluno.report.length > 0;

  const handleFuncionalidadeClick = (title, chave) => {
    setPopupTitle(title);
    setPopupChave(chave);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleDownloadRelatorio = (url, nome) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = nome;
    link.click();
  };

  if (!aluno) {
    return <div>Aluno não encontrado.</div>;
  }

  const handleVoltar = () => {
    navigate("/");
  };

  return (
    <div className="aluno-detalhes-page">
      <Navbar userName="Bárbara" />
      <div
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: "100px",
        }}
      >
        <div style={{ marginRight: "10px" }}>
          <VoltarButton onClick={handleVoltar} />
        </div>
        <h2 style={{ fontSize: "18px", marginLeft: "10px" }}>
          Funcionalidades
        </h2>
      </div>

      <div className="funcionalidades">
        {actions &&
          actions.map((func, index) => {
            const corComOpacidade = func.color + "33";
            return (
              <button
                key={index}
                style={{
                  backgroundColor:
                    aluno.report && aluno.report.length === 0
                      ? "#d3d3d3" // Cor cinza se não houver relatórios
                      : corComOpacidade,
                  border: `2px solid ${func.color}`,
                  color: "black",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  margin: "5px",
                  cursor: aluno.report && aluno.report.length === 0 ? "not-allowed" : "pointer", // Desabilita o clique
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

      <h2 style={{ fontSize: "18px", marginTop: "40px" }}>
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
                <td><Link to={`/aluno/${aluno.id}/solicitacao/${solicitacao.id}`}>{solicitacao.title}</Link></td>
                <td>{solicitacao.createdAt}</td>
                <td>
                  <button
                    // onClick={() => removerSolicitacao(solicitacao.id)}
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
              <td colSpan="3">Nenhuma solicitação cadastrada.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 style={{ fontSize: "18px" }}>Relatórios</h2>
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
                <td>{rel.createdAt}</td>
                <td>{rel.createdAt}</td>
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
                    onClick={() => handleDownloadRelatorio(rel.url, rel.nome)}
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
              <td colSpan="3">Nenhum relatório cadastrado.</td>
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
              !desabilitarBotao && navigate(`/cadastrar-relatorio/${alunoId}`)
            }
            style={{
              width: "100%",
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
          alunoId={alunoId}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default AlunoDetalhes;
