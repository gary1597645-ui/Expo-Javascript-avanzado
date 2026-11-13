import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { InscripcionesProvider } from './context/InscripcionesContext';

import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import EventoDetalle from './pages/EventoDetalle';
import MisInscripciones from './pages/MisInscripciones';
import NuevaInscripcion from './pages/NuevaInscripcion';
import Login from './pages/Login';
import NoEncontrado from './pages/NoEncontrado';
import Navbar from './components/Navbar';

const RutaProtegida = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/catalogo/:id" element={<EventoDetalle />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/mis-inscripciones"
        element={<RutaProtegida><MisInscripciones /></RutaProtegida>}
      />
      <Route
        path="/nueva-inscripcion"
        element={<RutaProtegida><NuevaInscripcion /></RutaProtegida>}
      />
      <Route path="*" element={<NoEncontrado />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <InscripcionesProvider>
          <BrowserRouter>
            <Navbar />
            <main className="container mt-4">
              <AppRoutes />
            </main>
          </BrowserRouter>
        </InscripcionesProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;