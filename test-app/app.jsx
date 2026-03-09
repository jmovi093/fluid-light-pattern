import React from 'react';
import ReactDOM from 'react-dom/client';
import { FluidLightPattern } from '@/index.ts';  
function App() {
  return (
    <>
      <button 
        className="reload-btn" 
        onClick={() => location.reload()}
      >
        🔄 Recargar
      </button>
      
      <header className="header">
        <FluidLightPattern 
          showDebug={true}
          config={{
            patternColor: '#0d00ff',
            baseRadius: 190,
            currentOpacity: 0.9,
          }}
        />
        
        <div className="header-content">
          <h1>Test del Componente Real</h1>
          <p>Recarga varias veces para verificar el blob inicial</p>
        </div>
      </header>

      <section className="section">
        <div>
          <h2>Sección 1</h2>
          <p>Scroll y vuelve arriba para probar</p>
        </div>
      </section>

      <section className="section">
        <div>
          <h2>Sección 2</h2>
          <p>Más contenido para hacer scroll</p>
        </div>
      </section>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);