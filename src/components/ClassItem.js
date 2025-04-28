import React, { useState, useContext } from 'react'; // Añadido useContext
import { useDrag } from 'react-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const ClassItem = ({ classData, day, onRemove, overlapping, editMode }) => {
  const { darkMode } = useContext(ThemeContext); // Usando useContext
  const [menuOpen, setMenuOpen] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CLASS',
    item: { classId: classData.id, day },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

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
          
          <div className="menu-container" style={{ display: 'inline-block' }}>
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

            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  className="menu-dropdown"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    backgroundColor: darkMode ? '#2d3748' : 'white', // Fondo oscuro/light
                    color: darkMode ? 'white' : '#333333', // Texto claro/oscuro
                    borderRadius: '4px',
                    boxShadow: darkMode 
                      ? '0 2px 5px rgba(255,255,255,0.1)' 
                      : '0 2px 5px rgba(0,0,0,0.2)',
                    zIndex: 100,
                    minWidth: '120px',
                    overflow: 'hidden' // Para bordes redondeados
                  }}
                >
                  <button 
                    className="menu-item" 
                    onClick={handleDelete}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: darkMode ? 'white' : '#333333',
                      ':hover': {
                        backgroundColor: darkMode ? '#4a5568' : '#f5f5f5'
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

// Función para contraste de color
function getContrastColor(hexColor) {
  if (!hexColor || hexColor.toLowerCase() === '#ffffff' || hexColor.toLowerCase() === '#fff') {
    return '#333333';
  }
  
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#333333' : '#ffffff';
}

export default ClassItem;