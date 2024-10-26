import React from "react";

interface ButtonProps {
  label: string;
  handler: () => void;
}
const Button: React.FC<ButtonProps> = ({ label, handler }) => {
  return (
    <button
      className="text-FlockBlue hover:rounded-lg hover:outline hover:outline-FlockBlue"
      onClick={handler}
    >
      {label}
    </button>
  );
};

export default Button;
