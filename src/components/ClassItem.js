import React from 'react';
import { useDrag } from 'react-dnd';

const ClassItem = ({ classData, day, onRemove }) => {
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
      className={`class-item ${isDragging ? 'class-item--dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="class-header">
        <span className="class-time">{classData.startTime} - {classData.endTime}</span>
        <button onClick={onRemove} className="remove-btn">×</button>
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

export default ClassItem;