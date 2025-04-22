import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import SchedulePage from './pages/SchedulePage';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <SchedulePage />
      </div>
    </ThemeProvider>
  );
}

export default App;
