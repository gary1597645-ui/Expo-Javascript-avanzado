import { createContext, useState } from 'react';
import db from '../data/db.json';
import { esCorreoUTP } from '../core/validadores.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (correo, password) => {
        const correoNormalizado = correo.trim();
        if (!esCorreoUTP(correoNormalizado)) {
            return { ok: false, error: 'Ingresa un correo institucional (@utp.edu.pe).' };
        }

        const encontrado = db.usuarios.find(
            (usuario) => usuario.correo.toLowerCase() === correoNormalizado.toLowerCase()
                && usuario.password === password
        );

        if (!encontrado) return { ok: false, error: 'Correo o contraseña incorrectos.' };
        if (encontrado.rol !== 'estudiante') {
            return { ok: false, error: 'Este portal es para estudiantes.' };
        }

        const { id, nombre, rol } = encontrado;
        setUser({ id, nombre, correo: encontrado.correo, rol });
        return { ok: true };
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};