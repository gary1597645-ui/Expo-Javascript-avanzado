import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.body.classList.toggle('bg-dark', theme === 'dark');
        document.body.classList.toggle('text-white', theme === 'dark');
        document.body.classList.toggle('bg-light', theme === 'light');
        document.body.classList.toggle('text-dark', theme === 'light');
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};