import { createContext, useState } from 'react';
import { esCorreoUTP } from '../core/validadores.js';

export const AuthContext = createContext();
const STORAGE_KEY = 'eventpass_user';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Recupera la sesión guardada para mantenerla al recargar la página.
        const guardado = localStorage.getItem(STORAGE_KEY);
        return guardado ? JSON.parse(guardado) : null;
    });

    const login = async (correo, password) => {
        const correoNormalizado = correo.trim();
        if (!esCorreoUTP(correoNormalizado)) {
            return { ok: false, error: 'Ingresa un correo institucional (@utp.edu.pe).' };
        }

        try {
            // Busca el usuario en la API usando su correo institucional.
            const res = await fetch(
                `http://localhost:3000/usuarios?correo=${encodeURIComponent(correoNormalizado)}`
            );
            if (!res.ok) {
                return { ok: false, error: 'Error al conectar con el servidor.' };
            }

            const usuarios = await res.json();
            const encontrado = usuarios.find(
                (u) => u.correo.toLowerCase() === correoNormalizado.toLowerCase() && u.password === password
            );

            if (!encontrado) return { ok: false, error: 'Correo o contraseña incorrectos.' };
            if (encontrado.rol !== 'estudiante') {
                return { ok: false, error: 'Este portal es para estudiantes.' };
            }

            const { id, nombre, rol } = encontrado;
            const sesion = { id, nombre, correo: encontrado.correo, rol };
            setUser(sesion);
            // Guarda solo los datos de sesión necesarios en el navegador.
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sesion));
            return { ok: true };
        } catch {
            return { ok: false, error: 'No hay conexión con el API (puerto 3000).' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};