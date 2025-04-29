import React, { useState } from 'react';
import ClassForm from './ClassForm';
import '../styles/ScheduleControls.css'

const ScheduleControls = ({ schedule, addClass, removeClass }) => {
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [showForm, setShowForm] = useState(false);

  const handleAddClass = (newClass) => {
    addClass(selectedDay, newClass);
    setShowForm(false);
  };

  return (
    <div className="schedule-controls">
      <div className="day-selector">
        <label>Selecciona un día:</label>
        <select 
          value={selectedDay} 
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          {Object.keys(schedule).map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <button onClick={() => setShowForm(true)}>Agregar Clase</button>
      </div>

      {showForm && (
        <ClassForm 
          onSave={handleAddClass} 
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default ScheduleControls;