import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authClient } from "../lib/auth-client"; // Importa o authClient

const UserPopup = ({ onClose }) => {
  const navigate = useNavigate();

  // Obtém a sessão do usuário
  const { data: session } = authClient.useSession();

  // Verifica se há sessão ativa
  if (!session?.user) {
    return <div>Carregando...</div>;
  }

  const { name, cpf, email } = session.user; // Pegando os dados do usuário

  const handleLogout = async () => {
    await authClient.signOut({ fetchOptions: { onSuccess: () => { navigate('/login') } } });
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h2>Dados do Usuário</h2>
        <p><strong>Nome:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <div className="popup-buttons">
          <button onClick={onClose} style={{ backgroundColor: '#5A5858', color: 'white', width: '100px', height: '40px', marginTop: '10px', marginLeft: '10%' }}>Fechar</button>
          <button onClick={handleLogout} style={{ backgroundColor: '#510202', color: 'white', width: '100px', height: '40px', marginTop: '10px', marginRight: '10%' }}>Sair</button>
        </div>
      </div>
    </div>
  );
};

export default UserPopup;
