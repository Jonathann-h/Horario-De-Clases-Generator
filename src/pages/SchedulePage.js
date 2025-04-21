import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DayColumn from '../components/DayColumn';
import ScheduleControls from '../components/ScheduleControls';
import PDFGenerator from '../components/PDFGenerator';
import '../styles/schedule.css';

// Clave para el localStorage con versión
const STORAGE_KEY = 'classScheduleData_v1';

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

  // Cargar datos al iniciar
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Validar la estructura de los datos
        if (parsedData.Lunes && Array.isArray(parsedData.Lunes)) {
          setSchedule(parsedData);
        } else {
          console.warn('Estructura de datos inválida, usando valores por defecto');
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        console.error('Error al parsear datos guardados:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Guardar datos cuando cambien
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
  }, [schedule]);

  // Sincronizar entre pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const newData = JSON.parse(e.newValue);
          setSchedule(newData);
        } catch (error) {
          console.error('Error al sincronizar datos:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addClass = (day, newClass) => {
    setSchedule(prev => ({
      ...prev,
      [day]: [...prev[day], {
        ...newClass,
        id: Date.now() // Asegurar ID único
      }]
    }));
  };

  const removeClass = (day, classId) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day].filter(cls => cls.id !== classId)
    }));
  };

  const moveClass = (fromDay, toDay, classId) => {
    setSchedule(prev => {
      const classToMove = prev[fromDay].find(cls => cls.id === classId);
      if (!classToMove) return prev;
      
      return {
        ...prev,
        [fromDay]: prev[fromDay].filter(cls => cls.id !== classId),
        [toDay]: [...prev[toDay], classToMove]
      };
    });
  };

  const clearSchedule = () => {
    if (window.confirm('¿Estás seguro de querer borrar todo el horario? Esta acción no se puede deshacer.')) {
      setSchedule({
        Lunes: [],
        Martes: [],
        Miércoles: [],
        Jueves: [],
        Viernes: [],
        Sábado: [],
        Domingo: []
      });
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="schedule-page">
        <div className="header-controls">
          <h1>Generador de Horarios</h1>
          <button onClick={clearSchedule} className="clear-btn">
            Borrar Todo
          </button>
        </div>
        
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