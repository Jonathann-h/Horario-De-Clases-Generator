import React from 'react';
import { useDrag } from 'react-dnd';

const ClassItem = ({ classData, day, onRemove, overlapping, editMode }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CLASS',
    item: { classId: classData.id, day },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div 
      ref={drag}
      className={`class-item ${isDragging ? 'class-item--dragging' : ''} ${overlapping ? 'class-item--overlapping' : ''}`}
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: classData.color || '#ffffff',
        color: getContrastColor(classData.color || '#ffffff')
      }}
    >
      <div className="class-header">
        <span className="class-time">{classData.startTime} - {classData.endTime}</span>
        {overlapping && <span className="overlap-warning">⚠️ Solapado</span>}
        {editMode && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }} 
            className="remove-btn"
          >×</button>
        )}
      </div>
      <div className="class-details">
        <h4>{classData.name}</h4>
        <p>Aula: {classData.classroom}</p>
        <p>Sección: {classData.section}</p>
        <p>Profesor: {classData.professor}</p>
      </div>
    </div>
  );
};
// Función para determinar si usar texto claro u oscuro según el fondo
function getContrastColor(hexColor) {
  // Si el color es blanco o muy claro, usa texto oscuro
  if (!hexColor || hexColor.toLowerCase() === '#ffffff' || hexColor.toLowerCase() === '#fff') {
    return '#333333';
  }
  
  // Convertir hex a RGB
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  
  // Calcular luminosidad
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Usar texto blanco para fondos oscuros
  return luminance > 0.5 ? '#333333' : '#ffffff';
}

export default ClassItem;