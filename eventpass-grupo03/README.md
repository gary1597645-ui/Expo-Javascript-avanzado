# EventPass

## Integrantes

- Gary Manuel Mautino Paucar 
- José Mauricio Terrazos Espinal  
- Jefferson Molleapaza Cosi
- joel Pacheco Quispe Orlando
-  Carpio caceres Joseph Joao
**Dominio:** EventPass (Eventos / Inscripciones / aforo)
**Uso de IA:** Se utilizo IA como apoyo para revisar, adaptar y probar partes del codigo del proyecto.

Panel administrativo de ejemplo para gestionar eventos y consultar inscripciones. La API usa `json-server`; la regla de aforo cuenta las inscripciones con estado `confirmada`.

## Iniciar la API

```powershell
cd api-mock
npm ci
npm run api
```

La API queda disponible en `http://localhost:3000`, con recursos `/eventos` e `/inscripciones`.

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
