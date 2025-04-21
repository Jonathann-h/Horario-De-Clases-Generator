import React from 'react';
import ClassItem from './ClassItem';
import { useDrop } from 'react-dnd';

const DayColumn = ({ day, classes, onRemoveClass, onMoveClass }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CLASS',
    drop: (item) => {
      if (item.day !== day) {
        onMoveClass(item.day, day, item.classId);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div 
      ref={drop}
      className={`day-column ${isOver ? 'day-column--hover' : ''}`}
    >
      <h3>{day}</h3>
      <div className="classes-container">
        {classes.map(cls => (
          <ClassItem 
            key={cls.id}
            classData={cls}
            day={day}
            onRemove={() => onRemoveClass(day, cls.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DayColumn;