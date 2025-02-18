import React from 'react';
import { useNavigate } from 'react-router-dom';

const FuncionalidadePopup = ({ title, onClose, onGerar }) => {
  const navigate = useNavigate();

  const conteudoFuncionalidades = {
    "Plano de ensino personalizado": "Desenvolvimento de planos de ensino personalizados, com estratégias para a apresentação de conteúdos e atividades práticas em sala de aula.",
    "Materiais de estudo e atividades para casa": "Elaboração de materiais de estudo e atividades para uso em casa, promovendo a autonomia no aprendizado.",
    "Estratégia de gamificação": "Implementação de estratégias de gamificação, incentivando o engajamento e a motivação dos alunos no processo educacional.",
    "Modelo de avaliação individualizado": "Criação de modelos de avaliações individualizadas, garantindo uma avaliação equitativa e alinhada ao perfil de cada aluno."
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{title}</h2>
        <p>{conteudoFuncionalidades[title]}</p>
        <div className="popup-buttons">
          <button onClick={onClose}>Fechar</button>
          <button onClick={onGerar} style={{ backgroundColor: "#022651"}}>Gerar</button>
        </div>
      </div>
    </div>
  );
};

export default FuncionalidadePopup;