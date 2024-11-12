import React from 'react';

const DateInput = ({ label, name, value, onChange, required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold mb-1">{label}</label>
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded"
      required={required}
    />
  </div>
);

export default DateInput;
