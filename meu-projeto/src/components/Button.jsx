import React from 'react';

const Button = ({ children, onClick, backgroundColor, strokeColor }) => {
  return (
    <button
      onClick={onClick}
      className="custom-button"
      style={{ backgroundColor, borderColor: strokeColor }}
    >
      {children}
    </button>
  );
};

export default Button;