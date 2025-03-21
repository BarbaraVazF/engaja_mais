import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { insertRequest } from "../api/insertRequest";

const FuncionalidadePopup = ({ alunoId, title, chave, onClose }) => {
  const navigate = useNavigate();

  const conteudoFuncionalidades = {
    LEARN_PLAN:
      "Desenvolvimento de planos de ensino personalizados, com estratégias para a apresentação de conteúdos e atividades práticas em sala de aula.",
    MATERIALS:
      "Elaboração de materiais de estudo e atividades para uso em casa, promovendo a autonomia no aprendizado.",
    GAMIFICATION:
      "Implementação de estratégias de gamificação, incentivo o envolvimento e a motivação dos alunos no processo educacional.",
    EVALUATION_MODEL:
      "Criação de modelos de avaliações individualizadas, garantindo uma avaliação equitativa e alinhada ao perfil de cada aluno.",
  };

  const [conteudoMateria, setConteudoMateria] = useState("");
  const [quantidadeAulas, setQuantidadeAulas] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const inputStyle = {
    height: "40px",
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
  };

  useEffect(() => {
    // Desabilitar o botão "Gerar" se os campos necessários estiverem vazios
    if (chave === "LEARN_PLAN") {
      setIsButtonDisabled(!(conteudoMateria && quantidadeAulas));
    } else {
      setIsButtonDisabled(!conteudoMateria);
    }

    if (chave === "GAMIFICATION") {
      setIsButtonDisabled(false);
    }
  }, [conteudoMateria, quantidadeAulas, chave]);

  async function onGerar() {
    console.log("conteudoMateria", conteudoMateria);

    const meta = {};

    if (["LEARN_PLAN", "EVALUATION_MODEL", "MATERIALS"].includes(chave)) {
      meta.content = conteudoMateria;
    }

    if (chave === "LEARN_PLAN") {
      meta.lessons = quantidadeAulas;
    }

    const solicitacao = await insertRequest(alunoId, {
      title,
      categoria: chave,
      meta,
    });

    navigate(`/aluno/${alunoId}/solicitacao/${solicitacao.id}`);
  }

  return (
    <div className="popup-overlay">
      <div className="popup" style={{ width: "500px", padding: "20px" }}>
        <h2>{title}</h2>
        <p>{conteudoFuncionalidades[chave]}</p>

        {chave === "LEARN_PLAN" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              placeholder="Conteúdo / Matéria"
              value={conteudoMateria}
              onChange={(e) => setConteudoMateria(e.target.value)}
              className="custom-input"
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Quantidade de aulas"
              value={quantidadeAulas}
              onChange={(e) => setQuantidadeAulas(e.target.value)}
              className="custom-input"
              style={inputStyle}
            />
          </div>
        )}

        {(chave === "MATERIALS" || chave === "EVALUATION_MODEL") && (
          <input
            type="text"
            placeholder="Conteúdo / Matéria"
            value={conteudoMateria}
            onChange={(e) => setConteudoMateria(e.target.value)}
            className="custom-input"
            style={inputStyle}
          />
        )}

        {/* Mostrar o conteúdo escrito, se aplicável */}
        {(conteudoMateria || quantidadeAulas) && chave === "LEARN_PLAN" && (
          <div style={{ marginTop: "20px" }}>
            <p>
              <strong>Matéria:</strong> {conteudoMateria}
            </p>
            <p>
              <strong>Quantidade de aulas:</strong> {quantidadeAulas}
            </p>
          </div>
        )}

        {conteudoMateria &&
          (chave === "MATERIALS" || chave === "EVALUATION_MODEL") && (
            <div style={{ marginTop: "20px" }}>
              <p>
                <strong>Matéria:</strong> {conteudoMateria}
              </p>
            </div>
          )}

        <div className="popup-buttons">
          <button onClick={onClose} className="custom-button">
            Fechar
          </button>
          <button
            onClick={onGerar}
            className="custom-button"
            disabled={isButtonDisabled}
          >
            Gerar
            {isButtonDisabled}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FuncionalidadePopup;
