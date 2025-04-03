import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { insertRequest } from "../api/insertRequest";

const FuncionalidadePopup = ({ alunoId, title, chave, onClose }) => {
  const navigate = useNavigate();

  const conteudoFuncionalidades = {
    LEARN_PLAN:
      "Elaboração de um plano de ensino personalizado, com estratégias para a apresentação do conteúdo selecionado e atividades práticas em sala de aula, ajustadas à quantidade de aulas definidas.",
    MATERIALS:
      "Elaboração de um material de estudo sobre o conteúdo escolhido, incluindo resumos e atividades para reforço em casa, com o objetivo de promover a autonomia no aprendizado.",
    GAMIFICATION:
      "Elaboração de uma estratégia de gamificação personalizada para o aluno, visando estimular o engajamento e a motivação no processo de aprendizagem.",
    EVALUATION_MODEL:
      "Elaboração de um modelo de avaliação personalizado para o conteúdo escolhido, garantindo um processo equitativo e alinhado ao perfil e às necessidades de cada aluno.",
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

    navigate(`/aluno/${alunoId}`);
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
              placeholder="Conteúdo (ex: Guerra Fria)"
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
            style={{
              backgroundColor: isButtonDisabled ? "#d3d3d3" : "", // Cinza quando desativado
              cursor: isButtonDisabled ? "not-allowed" : "pointer", // Cursor de 'não permitido' quando desativado
            }}
          >
            Gerar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FuncionalidadePopup;
