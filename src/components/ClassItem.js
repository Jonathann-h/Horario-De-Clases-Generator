import React, { useState, useContext, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import '../styles/ClassItem.css'

const ClassItem = ({ classData, day, onRemove, overlapping }) => {
  const { darkMode } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CLASS',
    item: { classId: classData.id, day },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Cierra el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onRemove();
    setMenuOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      layout
    >
      <div 
        ref={drag}
        className={`class-item ${isDragging ? 'class-item--dragging' : ''} ${overlapping ? 'class-item--overlapping' : ''}`}
        style={{ 
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: classData.color || '#ffffff',
          color: getContrastColor(classData.color || '#ffffff'),
          position: 'relative',
          cursor: 'grab'
        }}
      >
        <div className="class-header">
          <span className="class-time">{classData.startTime} - {classData.endTime}</span>
          
          {/* Contenedor del menú (aquí aplicamos la ref) */}
          <div ref={menuRef} style={{ display: 'inline-block', position: 'relative' }}>
            <button 
              className="menu-btn" 
              onClick={toggleMenu}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '0 5px',
                color: getContrastColor(classData.color || '#ffffff')
              }}
            >
              ⋮
            </button>

            {/* Menú desplegable */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    backgroundColor: darkMode ? '#2d3748' : 'white',
                    color: darkMode ? 'white' : '#333333',
                    borderRadius: '6px',
                    boxShadow: darkMode 
                      ? '0 2px 10px rgba(0,0,0,0.3)' 
                      : '0 2px 10px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    minWidth: '150px',
                    overflow: 'hidden'
                  }}
                >
                  <button 
                    onClick={handleDelete}
                    style={{
                      width: '100%',
                      padding: '10px 15px',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: darkMode ? 'white' : '#333333',
                      ':hover': {
                        backgroundColor: darkMode ? '#4a5568' : '#f7fafc'
                      }
                    }}
                  >
                    Eliminar Clase
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="class-details">
          <h4>{classData.name}</h4>
          <p>Aula: {classData.classroom}</p>
          <p>Sección: {classData.section}</p>
          <p>Profesor: {classData.professor}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Función para calcular color de texto contrastante
function getContrastColor(hexColor) {
  const color = hexColor.toLowerCase();
  /*if (!hexColor || hexColor.toLowerCase() === '#ffffff' || hexColor.toLowerCase() === '#fff') {
    return '#333333';
  }*/
  if (color === 'white') { return '#333333';}
  if (color === '#ffffff' || color === '#fff') { return '#333333'; }
  
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#333333' : '#ffffff';
}

export default ClassItem;