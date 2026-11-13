import { useEffect, useState } from 'react';

const calcularTiempo = (fecha) => {
  const diferencia = new Date(`${fecha}T00:00:00`).getTime() - Date.now();
  if (diferencia <= 0) return null;

  return {
    dias: Math.floor(diferencia / 86400000),
    horas: Math.floor((diferencia / 3600000) % 24),
    minutos: Math.floor((diferencia / 60000) % 60),
    segundos: Math.floor((diferencia / 1000) % 60),
  };
};

export default function ContadorRegresivo({ fecha, nombre }) {
  const [restante, setRestante] = useState(() => calcularTiempo(fecha));

  useEffect(() => {
    const intervalo = setInterval(() => setRestante(calcularTiempo(fecha)), 1000);
    return () => clearInterval(intervalo);
  }, [fecha]);

  if (!restante) return null;

  return (
    <div className="alert alert-primary">
      Próximo evento: <strong>{nombre}</strong>. Faltan{' '}
      <strong>{restante.dias}d {restante.horas}h {restante.minutos}m {restante.segundos}s</strong>
    </div>
  );
}
