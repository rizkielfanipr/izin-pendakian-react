import React from 'react';

const FormInput = ({ label, name, value, onChange, type = 'text', required = false, placeholder = '' }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded"
      required={required}
      placeholder={placeholder}
    />
  </div>
);

export default FormInput;
