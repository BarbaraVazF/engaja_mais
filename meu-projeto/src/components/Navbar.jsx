import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import UserPopup from './UserPopup';
import { authClient } from '../lib/auth-client';

const Navbar = () => {
  const user = authClient.useSession().data.user
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <Logo />
      </div>
      <div className="user-circle" onClick={togglePopup}>
        {user.name ? user.name[0].toUpperCase() : 'U'}
      </div>
      {showPopup && (
        <UserPopup
          userName={user.name}
          userEmail={user.email} // Passando o email para o UserPopup
          onClose={togglePopup}
        />
      )}
    </div>
  );
};

export default Navbar;