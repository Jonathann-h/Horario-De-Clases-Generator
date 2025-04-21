import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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

  // Función para agregar clases
  const addClass = (day, newClass) => {
    setSchedule(prev => ({
      ...prev,
      [day]: [...prev[day], newClass]
    }));
  };

  // Función para eliminar clases
  const removeClass = (day, classId) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day].filter(cls => cls.id !== classId)
    }));
  };

  // Función para mover clases entre días
  const moveClass = (fromDay, toDay, classId) => {
    setSchedule(prev => {
      // Encontrar la clase a mover
      const classToMove = prev[fromDay].find(cls => cls.id === classId);
      if (!classToMove) return prev;
      
      return {
        ...prev,
        [fromDay]: prev[fromDay].filter(cls => cls.id !== classId),
        [toDay]: [...prev[toDay], classToMove]
      };
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="schedule-page">
        <h1>Generador de Horarios</h1>
        
        <ScheduleControls 
          schedule={schedule} 
          addClass={addClass} 
          removeClass={removeClass} 
        />
        
        <div className="schedule-grid">
          {Object.keys(schedule).map(day => (
            <DayColumn 
              key={day}
              day={day}
              classes={schedule[day]}
              onRemoveClass={removeClass}
              onMoveClass={moveClass}
            />
          ))}
        </div>
        
        <PDFGenerator schedule={schedule} />
      </div>
    </DndProvider>
  );
};

export default SchedulePage;