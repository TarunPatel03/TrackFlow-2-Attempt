// /src/components/FormField.jsx
import React from 'react';
import './Formfield.css';

const FormField = ({ label, type = 'text', name, value, onChange, placeholder, required = false }) => {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormField;
