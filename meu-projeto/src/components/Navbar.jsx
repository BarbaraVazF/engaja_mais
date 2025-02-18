import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import UserPopup from './UserPopup';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const [userCpf, setUserCpf] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setUserName(localStorage.getItem('userName') || 'Usuário');
    setUserCpf(localStorage.getItem('userCpf') || '000.000.000-00'); // Padrão se não houver CPF
    setUserEmail(localStorage.getItem('userEmail') || 'usuario@email.com');
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <Logo />
      </div>
      <div className="user-circle" onClick={togglePopup}>
        {userName ? userName[0].toUpperCase() : 'U'}
      </div>
      {showPopup && (
        <UserPopup
          userName={userName}
          userCpf={userCpf}
          userEmail={userEmail} // Passando o email para o UserPopup
          onClose={togglePopup}
        />
      )}
    </div>
  );
};

export default Navbar;