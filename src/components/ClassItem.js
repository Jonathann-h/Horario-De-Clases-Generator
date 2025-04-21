import React from 'react';

const ClassItem = ({ classData, onRemove }) => {
  return (
    <div className="class-item">
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