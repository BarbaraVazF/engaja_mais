import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserPopup = ({ userName, userCpf, userEmail, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('professorId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userCpf');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h2>Dados do Usuário</h2>
        <p><strong>Nome:</strong> {userName}</p>
        <p><strong>CPF:</strong> {userCpf}</p>
        <p><strong>Email:</strong> {userEmail}</p> {/* Exibindo o email cadastrado */}
        <div className="popup-buttons">
          <button onClick={onClose} style={{ backgroundColor: '#5A5858', color: 'white', width: '90px', marginTop: '10px' }}>Fechar</button>
          <button onClick={handleLogout} style={{ backgroundColor: '#510202', color: 'white', width: '90px', marginTop: '10px' }}>Sair</button>
        </div>
      </div>
    </div>
  );
};

export default UserPopup;