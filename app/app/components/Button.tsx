import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  backgroundColor?: string;
  strokeColor?: string;
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  backgroundColor,
  strokeColor,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className="custom-button"
      style={{ backgroundColor, borderColor: strokeColor }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
