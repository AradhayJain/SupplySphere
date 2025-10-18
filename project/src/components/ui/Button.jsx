import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) => {
  // Base styles for all buttons
  const baseStyles = 'w-full flex justify-center py-2.5 px-4 border rounded-md shadow-sm text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  // Style variants for different button types
  const variants = {
    primary: 'border-transparent text-white bg-primary hover:bg-primary-dark focus:ring-primary',
    secondary: 'border-dark-400 text-light-200 bg-dark-200 hover:bg-dark-300 focus:ring-primary',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

