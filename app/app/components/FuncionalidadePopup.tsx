import { useEffect, useState } from "react";
import { useFetcher, useRevalidator } from "react-router";

interface FuncionalidadePopupProps {
  alunoId: string; // Replace 'string' with the appropriate type if needed
  title: string;
  chave: "LEARN_PLAN" | "MATERIALS" | "GAMIFICATION" | "EVALUATION_MODEL";
  onClose: () => void;
}

interface Meta {
  content?: string;
  lessons?: string;
}

const FuncionalidadePopup: React.FC<FuncionalidadePopupProps> = ({
  alunoId,
  title,
  chave,
  onClose,
}) => {
  const revalidator = useRevalidator();

  const fetcher = useFetcher();

  const conteudoFuncionalidades = {
    LEARN_PLAN:
      "Elaboração de um plano de ensino individualizado, com estratégias para a apresentação do conteúdo selecionado e atividades práticas em sala de aula, ajustadas à quantidade de aulas definidas.",
    MATERIALS:
      "Elaboração de um material de estudo sobre o conteúdo escolhido, incluindo resumos e atividades para reforço em casa, com o objetivo de promover a autonomia no aprendizado.",
    GAMIFICATION:
      "Elaboração de uma estratégia de gamificação personalizada para o aluno, visando estimular o engajamento e a motivação no processo de aprendizagem.",
    EVALUATION_MODEL:
      "Elaboração de um modelo de avaliação individualizado para o conteúdo escolhido, garantindo um processo equitativo e alinhado ao perfil e às necessidades de cada aluno.",
  };

  const [conteudoMateria, setConteudoMateria] = useState("");
  const [quantidadeAulas, setQuantidadeAulas] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const inputStyle: React.CSSProperties = {
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

    const meta: Meta = {};

    if (["LEARN_PLAN", "EVALUATION_MODEL", "MATERIALS"].includes(chave)) {
      meta.content = conteudoMateria;
    }

    if (chave === "LEARN_PLAN") {
      meta.lessons = quantidadeAulas;
    }

    await fetcher.submit(
      {
        title,
        categoria: chave,
        meta: JSON.stringify(meta),
      },
      {
        method: "post",
        action: `/api/request/${alunoId}`,
        encType: "application/json",
      }
    );

    revalidator.revalidate();
    onClose();
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
