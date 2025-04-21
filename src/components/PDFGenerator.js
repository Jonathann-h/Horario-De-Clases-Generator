import React from 'react';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

const PDFGenerator = ({ schedule }) => {
  const scheduleRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => scheduleRef.current,
    pageStyle: `
      @page {
        size: A4 landscape;
        margin: 10mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
        .schedule-print {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
        }
        .day-column-print {
          border: 1px solid #000;
          padding: 5px;
        }
        .class-item-print {
          margin-bottom: 10px;
          padding: 5px;
          background: #f0f0f0;
          break-inside: avoid;
        }
      }
    `,
    documentTitle: 'Horario de Clases'
  });

  return (
    <div className="pdf-generator">
      <button onClick={handlePrint}>Generar PDF</button>
      
      {/* Contenido oculto para impresión */}
      <div style={{ display: 'none' }}>
        <div ref={scheduleRef} className="schedule-print">
          <h1 style={{ gridColumn: '1 / -1', textAlign: 'center' }}>Horario de Clases</h1>
          {Object.entries(schedule).map(([day, classes]) => (
            <div key={day} className="day-column-print">
              <h3>{day}</h3>
              {classes.map(cls => (
                <div key={cls.id} className="class-item-print">
                  <p><strong>{cls.startTime} - {cls.endTime}</strong></p>
                  <p><strong>{cls.name}</strong></p>
                  <p>Aula: {cls.classroom}</p>
                  <p>Sección: {cls.section}</p>
                  <p>Profesor: {cls.professor}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PDFGenerator;