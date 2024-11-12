import React from 'react';

const ChecklistRisiko = ({ checked, onChange }) => (
  <div className="mb-4">
    <label className="flex items-center">
      <input
        type="checkbox"
        name="checklistResiko"
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      Checklist Resiko
    </label>
  </div>
);

export default ChecklistRisiko;
