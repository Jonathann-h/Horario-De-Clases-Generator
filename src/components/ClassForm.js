import React, { useState } from 'react';

const ClassForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: '',
    startTime: '08:00',
    endTime: '09:00',
    classroom: '',
    section: '',
    professor: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="class-form-modal">
      <form onSubmit={handleSubmit}>
        <h3>Agregar Nueva Clase</h3>
        
        <label>
          Nombre de la clase:
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </label>
        
        <div className="time-inputs">
          <label>
            Hora de inicio:
            <input 
              type="time" 
              name="startTime" 
              value={formData.startTime} 
              onChange={handleChange} 
              required 
            />
          </label>
          
          <label>
            Hora de fin:
            <input 
              type="time" 
              name="endTime" 
              value={formData.endTime} 
              onChange={handleChange} 
              required 
            />
          </label>
        </div>
        
        <label>
          Aula:
          <input 
            type="text" 
            name="classroom" 
            value={formData.classroom} 
            onChange={handleChange} 
          />
        </label>
        
        <label>
          Sección:
          <input 
            type="text" 
            name="section" 
            value={formData.section} 
            onChange={handleChange} 
          />
        </label>
        
        <label>
          Profesor:
          <input 
            type="text" 
            name="professor" 
            value={formData.professor} 
            onChange={handleChange} 
          />
        </label>
        
        <div className="form-actions">
          <button type="button" onClick={onCancel}>Cancelar</button>
          <button type="submit">Guardar Clase</button>
        </div>
      </form>
    </div>
  );
};

export default ClassForm;