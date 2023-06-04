import React from 'react';

const Input = ({
  className,
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
  disabled,
}) => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
    />
  );
};

export default Input;
