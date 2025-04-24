import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');
  
  const translations = {
    es: {
      appTitle: 'MiHorario - Planificador Académico',
      clearAll: 'Borrar Todo',
      lightMode: 'Modo Claro',
      darkMode: 'Modo Oscuro',
      loading: 'Cargando...',
      confirmClear: '¿Estás seguro de querer borrar todo el horario? Esta acción no se puede deshacer.',
      days: {
        Lunes: 'Lunes',
        Martes: 'Martes',
        Miércoles: 'Miércoles',
        Jueves: 'Jueves',
        Viernes: 'Viernes',
        Sábado: 'Sábado',
        Domingo: 'Domingo'
      }
    },
    en: {
      appTitle: 'MySchedule - Academic Planner',
      clearAll: 'Clear All',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      loading: 'Loading...',
      confirmClear: 'Are you sure you want to clear all schedule? This action cannot be undone.',
      days: {
        Lunes: 'Monday',
        Martes: 'Tuesday',
        Miércoles: 'Wednesday',
        Jueves: 'Thursday',
        Viernes: 'Friday',
        Sábado: 'Saturday',
        Domingo: 'Sunday'
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);