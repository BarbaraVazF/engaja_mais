import { useNavigate } from "react-router";

const VoltarButton = ({ ...props }: any) => {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleVoltar}
      className="voltar-button"
      style={{ backgroundColor: "transparent" }}
    >
      <img src="/voltar.png" alt="Voltar" />
    </button>
  );
};

export default VoltarButton;
