# EventPass

## Integrantes

- Gary Manuel Mautino Paucar 
- José Mauricio Terrazos Espinal  
- Jefferson Molleapaza Cosi
- joel Pacheco Quispe Orlando
-  Carpio caceres Joseph Joao
**Dominio:** EventPass (Eventos / Inscripciones / aforo)
**Uso de IA:** Se utilizó IA como apoyo para revisar, adaptar y probar partes del código del proyecto.

EventPass tiene dos aplicaciones: el portal del estudiante en React y el panel administrativo en Angular. La API usa `json-server`; la regla de aforo cuenta las inscripciones con estado `confirmada`.

## Iniciar la API

```powershell
cd api-mock
npm ci
npm run api
```

La API queda disponible en `http://localhost:3000`, con recursos `/eventos` e `/inscripciones`.

## Iniciar el portal del estudiante (React)

En otra terminal, desde la raíz del proyecto:

```powershell
cd react-estudiante
npm ci
npm run dev
```

Abre la dirección que muestra Vite (normalmente `http://localhost:5173`). El portal permite consultar eventos e inscribirse con una cuenta de estudiante de `api-mock/db.json`; por ejemplo, `ana.torres@utp.edu.pe` con contraseña `est123`.

En este avance, React usa sus datos locales y las inscripciones nuevas se mantienen en memoria mientras la aplicación está abierta. Todavía no se sincronizan con la API ni con el panel Angular.

## Iniciar Angular

En otra terminal:

```powershell
cd angular-admin
npm ci
npm start
```

Abre `http://localhost:4200`.

## Pruebas del núcleo JavaScript

```powershell
cd core-js
node --test
```

La colección de solicitudes para Postman está en `api-mock/eventpass-collection.json`.
