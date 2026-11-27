import Link from 'next/link';

export const metadata = {
  title: 'EventPass Público | Catálogo de Eventos UTP',
  description: 'Consulta pública de eventos universitarios y estado de inscripciones sin iniciar sesión.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-light">
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand fw-bold" href="/eventos">
              EventPass Público (SSR)
            </Link>
            <div className="navbar-nav">
              <Link className="nav-link" href="/eventos">Catálogo</Link>
              <Link className="nav-link" href="/inscripcion/INS-0001">Consultar INS-0001</Link>
            </div>
          </div>
        </nav>
        <main className="container pb-5">{children}</main>
      </body>
    </html>
  );
}