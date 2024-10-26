import React from "react";

function Button({ label, onClick }) {
  return (
    <button
      className="text-FlockBlue hover:rounded-lg hover:outline hover:outline-FlockBlue"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
