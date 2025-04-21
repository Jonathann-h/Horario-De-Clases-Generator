import React from 'react';
import { jsPDF } from 'jspdf';
//import './schedule.css';

const PDFGenerator = ({ schedule }) => {
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Título
    doc.setFontSize(20);
    doc.text('Horario Académico', 105, 20, { align: 'center' });
    
    // Fecha de generación
    doc.setFontSize(12);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });
    
    // Configuración de columnas
    const columnWidth = 25;
    const startX = 15;
    const startY = 40;
    let y = startY;
    
    // Encabezados de días
    const days = Object.keys(schedule);
    days.forEach((day, index) => {
      doc.setFillColor(64, 169, 255);
      doc.rect(startX + (index * columnWidth), y, columnWidth, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.text(day, startX + (index * columnWidth) + columnWidth/2, y + 7, { align: 'center' });
    });
    
    y += 10;
    doc.setTextColor(0, 0, 0);
    
    // Contenido de las clases
    let maxClasses = 0;
    days.forEach(day => {
      if (schedule[day].length > maxClasses) maxClasses = schedule[day].length;
    });
    
    for (let i = 0; i < maxClasses; i++) {
      days.forEach((day, col) => {
        const classItem = schedule[day][i];
        if (classItem) {
          doc.setFontSize(10);
          doc.text(`${classItem.startTime}-${classItem.endTime}`, startX + (col * columnWidth) + 2, y + 5);
          doc.text(classItem.name, startX + (col * columnWidth) + 2, y + 10, { maxWidth: columnWidth - 4 });
          
          if (classItem.classroom) {
            doc.setFontSize(8);
            doc.text(`Aula: ${classItem.classroom}`, startX + (col * columnWidth) + 2, y + 15);
          }
        }
      });
      y += 20;
      if (y > 180) { // Nueva página si se acaba el espacio
        doc.addPage('a4', 'landscape');
        y = startY;
      }
    }
    
    doc.save('mi_horario.pdf');
  };

  return (
    <button onClick={generatePDF} className="pdf-button">
      Descargar PDF con jsPDF
    </button>
  );
};

export default PDFGenerator;