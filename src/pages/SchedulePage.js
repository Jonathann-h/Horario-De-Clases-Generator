import React, { useState } from 'react';
import DayColumn from '../components/DayColumn';
import ScheduleControls from '../components/ScheduleControls';
import PDFGenerator from '../components/PDFGenerator';
import '../styles/schedule.css';

const SchedulePage = () => {
  const [schedule, setSchedule] = useState({
    Lunes: [],
    Martes: [],
    Miércoles: [],
    Jueves: [],
    Viernes: [],
    Sábado: [],
    Domingo: []
  });

  const addClass = (day, newClass) => {
    setSchedule(prev => ({
      ...prev,
      [day]: [...prev[day], newClass]
    }));
  };

  const removeClass = (day, classId) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day].filter(cls => cls.id !== classId)
    }));
  };

  return (
    <div className="schedule-page">
      <h1>Generador de Horarios</h1>
      
      <ScheduleControls schedule={schedule} addClass={addClass} />
      
      <div className="schedule-grid">
        {Object.keys(schedule).map(day => (
          <DayColumn 
            key={day}
            day={day}
            classes={schedule[day]}
            onRemoveClass={removeClass}
          />
        ))}
      </div>
      
      <PDFGenerator schedule={schedule} />
    </div>
  );
};

export default SchedulePage;