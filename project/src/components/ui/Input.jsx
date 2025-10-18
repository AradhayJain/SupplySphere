import React from 'react';

const Input = ({ id, name, type = 'text', placeholder, value, onChange, required = false }) => {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="block w-full rounded-md border-0 bg-dark-200 py-2.5 px-3 text-light-100 shadow-sm ring-1 ring-inset ring-dark-400 placeholder:text-light-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;

