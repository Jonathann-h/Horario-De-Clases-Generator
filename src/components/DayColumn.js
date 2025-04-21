import React from 'react';
import { useDrop } from 'react-dnd';
import ClassItem from './ClassItem';

const DayColumn = ({ day, classes, onRemoveClass, onMoveClass }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'CLASS',
    drop: (item) => {
      if (item.day !== day) {
        onMoveClass(item.day, day, item.classId);
      }
    },
    canDrop: (item) => item.day !== day,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div 
      ref={drop}
      className={`day-column ${isOver && canDrop ? 'day-column--can-drop' : ''} ${isOver && !canDrop ? 'day-column--cannot-drop' : ''}`}
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