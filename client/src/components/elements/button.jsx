import React from 'react';

const Button = ({ title, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
