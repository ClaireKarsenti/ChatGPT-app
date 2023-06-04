import React from 'react';

const Button = ({ title, onClick }) => {
  return (
    <button type="button" onClick={onClick} className="ce-chat-form-button">
      {title}
    </button>
  );
};

export default Button;
