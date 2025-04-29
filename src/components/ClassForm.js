import React, { useState } from 'react';
import '../styles/schedule.css';
import '../styles/ClassForm.css'

const ClassForm = ({ onSave, onCancel }) => {
  // Colores predeterminados
  const DEFAULT_COLORS = [
    'white',
    '#4361ee', // Azul primario
    '#4cc9f0', // Celeste
    '#7209b7', // Morado
    '#f72585', // Rosado
    '#f8961e', // Naranja
    '#4caf50'  // Verde
  ];

  const [formData, setFormData] = useState({
    id: Date.now(),
    name: '',
    startTime: '08:00',
    endTime: '09:00',
    classroom: '',
    section: '',
    professor: '',
    color: DEFAULT_COLORS[0] // Primer color como predeterminado
  });

  const [errors, setErrors] = useState({
    time: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar errores al cambiar
    if (name === 'startTime' || name === 'endTime') {
      setErrors(prev => ({ ...prev, time: '' }));
    }
    if (name === 'name') {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleColorSelect = (color) => {
    setFormData(prev => ({ ...prev, color }));
  };

  const validateTime = (start, end) => {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);
    
    if (startHours > endHours || (startHours === endHours && startMinutes >= endMinutes)) {
      return 'La hora de fin debe ser posterior a la hora de inicio';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones
    const timeError = validateTime(formData.startTime, formData.endTime);
    const nameError = formData.name.trim() === '' ? 'El nombre de la clase es requerido' : '';
    
    setErrors({
      time: timeError,
      name: nameError
    });

    if (!timeError && !nameError) {
      onSave(formData);
    }
  };

  return (
    <div className="class-form-modal">
      <form onSubmit={handleSubmit}>
        <h3>Agregar Nueva Clase</h3>
        
        <label>
          Nombre de la clase: *
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </label>
        
        <div className="time-inputs">
          <label>
            Hora de inicio: *
            <input 
              type="time" 
              name="startTime" 
              value={formData.startTime} 
              onChange={handleChange}
              className={errors.time ? 'input-error' : ''}
              required 
            />
          </label>
          
          <label>
            Hora de fin: *
            <input 
              type="time" 
              name="endTime" 
              value={formData.endTime} 
              onChange={handleChange}
              className={errors.time ? 'input-error' : ''}
              required 
            />
          </label>
          {errors.time && <span className="error-message time-error">{errors.time}</span>}
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

        <label>
          Color de la materia:
          <div className="default-colors-container">
            {DEFAULT_COLORS.map((color) => (
              <div
                key={color}
                className={`default-color-option ${formData.color === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                title={color}
              />
            ))}
          </div>
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