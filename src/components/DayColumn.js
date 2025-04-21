import React from 'react';
import ClassItem from './ClassItem';

const DayColumn = ({ day, classes, onRemoveClass }) => {
  return (
    <div className="day-column">
      <h3>{day}</h3>
      <div className="classes-container">
        {classes.map(cls => (
          <ClassItem 
            key={cls.id}
            classData={cls}
            onRemove={() => onRemoveClass(day, cls.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DayColumn;