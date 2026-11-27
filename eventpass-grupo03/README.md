# EventPass

## Integrantes

- Gary Manuel Mautino Paucar 
- José Mauricio Terrazos Espinal  
- Jefferson Molleapaza Cosi
- joel Pacheco Quispe Orlando
-  Carpio caceres Joseph Joao
**Dominio:** EventPass (Eventos / Inscripciones / aforo)
**Uso de IA:** Se utilizó IA como apoyo para revisar, adaptar y probar partes del código del proyecto.

EventPass tiene cuatro frontends que consumen la misma API: portal de estudiante en React, panel administrativo en Angular, kiosko en Vue y portal público SSR en Next.js. La API usa `json-server`; para el aforo cuentan las inscripciones `confirmada` y `aprobada`.

## Iniciar la API

```powershell
cd api-mock
npm ci
npm run api
```

La API queda disponible en `http://localhost:3000`, con recursos `/eventos` e `/inscripciones`. Los horarios de evento son opcionales y se usan en la grilla de Vue; si faltan, se muestra disponibilidad durante todo el día.

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

## Uso de las librerías HTTP (avance 3)

| Herramienta | Uso en EventPass |
|---|---|
| Fetch | Cargar el catálogo y el detalle público de eventos. |
| Axios | Crear y cancelar inscripciones; el interceptor convierte fallos HTTP en mensajes. |
| Alova | Consultar el resumen del estudiante, con caché GET de cinco minutos y actualización manual. |

## Iniciar React-Estudiante
```powershell
cd react-estudiante
npm ci
npm run sync-core
npm run dev
```

## 5. Iniciar Kiosko de Disponibilidad (`vue-kiosko`)

En otra terminal:

```powershell
cd vue-kiosko
npm ci
npm run sync-core
npm run dev
```

## Iniciar next-publico
```powershell
cd next-publico
npm ci
npm run sync-core
npm run dev
```

## Comparación de frameworks (avance 4)

| Framework | Curva de aprendizaje observada | Manejo del estado | Enrutamiento | Renderizado |
|---|---|---|---|---|
| Angular | Más configuración inicial y uso de TypeScript. | Servicios, observables y formularios reactivos. | Angular Router con rutas para eventos e inscripciones. | SSR configurado; los datos se consultan con HttpClient. |
| React | Requirió organizar hooks, Context y componentes. | `useState`, Context y el hook `useInscripciones`. | React Router con rutas protegidas y detalle dinámico. | SPA ejecutada en el cliente. |
| Vue | La Composition API permitió agrupar datos y cálculos reactivos. | `ref` y `computed` en el kiosko. | Una vista principal sin router. | Aplicación Vite renderizada en el cliente. |
| Next.js | Requirió distinguir componentes de servidor y rutas dinámicas. | Datos solicitados en el servidor con `fetch`. | App Router: catálogo, evento y consulta por código. | SSR dinámico con `cache: 'no-store'`. |

La colección de solicitudes para Postman está en `api-mock/eventpass-collection.json`.
