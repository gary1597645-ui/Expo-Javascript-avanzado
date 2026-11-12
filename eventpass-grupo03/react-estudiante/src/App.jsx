import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Importación de páginas (crea estos archivos básicos en src/pages)
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import EventoDetalle from './pages/EventoDetalle';
import MisInscripciones from './pages/MisInscripciones';
import NuevaInscripcion from './pages/NuevaInscripcion';
import Login from './pages/Login';
import NoEncontrado from './pages/NoEncontrado';
import Navbar from './components/Navbar';

// Componente para proteger rutas
const RutaProtegida = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/catalogo/:id" element={<EventoDetalle />} />
      <Route path="/login" element={<Login />} />

      {/* Rutas Protegidas */}
      <Route path="/mis-inscripciones" element={
        <RutaProtegida><MisInscripciones /></RutaProtegida>
      } />
      <Route path="/nueva-inscripcion" element={
        <RutaProtegida><NuevaInscripcion /></RutaProtegida>
      } />

      <Route path="*" element={<NoEncontrado />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Navbar />
          <div className="container mt-4">
            <AppRoutes />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;