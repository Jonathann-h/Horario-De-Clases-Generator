import React, { useState, useEffect, useContext, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DayColumn from '../components/DayColumn';
import ScheduleControls from '../components/ScheduleControls';
import PDFGenerator from '../components/PDFGenerator';
import '../styles/schedule.css';
import { ThemeContext } from '../context/ThemeContext';

// Clave para el localStorage con versión
const STORAGE_KEY = 'classScheduleData_v1';

// Función para validar la estructura de los datos
const validateScheduleData = (data) => {
  const requiredDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  return (
    data &&
    typeof data === 'object' &&
    requiredDays.every(day => Array.isArray(data[day]))
  );
};

// Función para obtener datos iniciales
const getInitialSchedule = () => ({
  Lunes: [],
  Martes: [],
  Miércoles: [],
  Jueves: [],
  Viernes: [],
  Sábado: [],
  Domingo: []
});

const SchedulePage = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext); 
  const [schedule, setSchedule] = useState(getInitialSchedule());
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar datos al iniciar (solo una vez)
  useEffect(() => {
    const loadData = () => {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          if (validateScheduleData(parsedData)) {
            setSchedule(parsedData);
          } else {
            console.warn('Estructura de datos inválida, usando valores por defecto');
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
  }, []);

  // Guardar datos cuando cambien (solo si ya se cargaron los datos iniciales)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
      } catch (error) {
        console.error('Error al guardar datos:', error);
        // Manejar error de quota exceeded u otros
        if (error.name === 'QuotaExceededError') {
          alert('El almacenamiento local está lleno. Por favor, borra algunos datos.');
        }
      }
    }
  }, [schedule, isLoaded]);

  // Sincronizar entre pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const newData = JSON.parse(e.newValue);
          if (validateScheduleData(newData)) {
            setSchedule(newData);
          }
        } catch (error) {
          console.error('Error al sincronizar datos:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addClass = useCallback((day, newClass) => {
    setSchedule(prev => {
      const newSchedule = {
        ...prev,
        [day]: [...prev[day], {
          ...newClass,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9) // ID más único
        }]
      };
      return newSchedule;
    });
  }, []);

  const removeClass = useCallback((day, classId) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day].filter(cls => cls.id !== classId)
    }));
  }, []);

  const moveClass = useCallback((fromDay, toDay, classId) => {
    setSchedule(prev => {
      const classToMove = prev[fromDay].find(cls => cls.id === classId);
      if (!classToMove) return prev;
      
      const newSchedule = {
        ...prev,
        [fromDay]: prev[fromDay].filter(cls => cls.id !== classId),
        [toDay]: [...prev[toDay], classToMove]
      };
      return newSchedule;
    });
  }, []);

  const clearSchedule = useCallback(() => {
    if (window.confirm('¿Estás seguro de querer borrar todo el horario? Esta acción no se puede deshacer.')) {
      const newSchedule = getInitialSchedule();
      setSchedule(newSchedule);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSchedule));
    }
  }, []);

  if (!isLoaded) {
    return <div>Cargando...</div>; // O un spinner de carga
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`schedule-page ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="header-controls">
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
          <h1>MiHorario - Planificador Académico</h1>
          <div className="header-actions">
            <PDFGenerator schedule={schedule} />
            <button onClick={clearSchedule} className="clear-btn">
              Borrar Todo
            </button>
          </div>
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
      </div>
    </DndProvider>
  );
};

export default SchedulePage;