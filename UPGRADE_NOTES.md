# Upgrade Notes

Fecha: 2026-05-08

## Actualizado En Esta Etapa

- `react`: 18.3.1 -> 19.2.6
- `react-dom`: 18.3.1 -> 19.2.6
- `@mui/material`: 5.15.20 -> 7.3.11
- `@mui/icons-material`: 5.15.17 -> 7.3.11
- `@mui/system`: 5.15.20 -> 7.3.11
- `@mui/x-data-grid`: 7.3.2 -> 9.1.0
- `react-leaflet`: 4.2.1 -> 5.0.0
- `react-dropzone`: 14.2.3 -> 15.0.0
- `react-intersection-observer`: 9.16.0 -> 10.0.3

Se mantienen exactas las versiones en `package.json` para evitar actualizaciones accidentales durante esta etapa de estabilización.

## Reemplazos Aplicados

- Se eliminó `mui-datatables`.
- Se migraron las tablas principales a `@mui/x-data-grid` mediante el componente compartido `ProjectDataGrid`.
- Se eliminó `react-sweetalert2`.
- Se eliminó `react-modal`.
- Se eliminó `react-tooltip`.
- Se migraron los modales propios a `Dialog` de MUI para conservar compatibilidad con React 19.

## Cambios Funcionales Relevantes

- La tabla de proyectos registrados usa `ProjectDataGrid` y conserva exportación XLSX.
- El panel responsable muestra `Proyectos Registrados` en la tabla principal correspondiente.
- Los modales de creación, cierre de sesión y edición usan MUI Dialog.
- El flujo de guardado del dialog admin refresca la tabla después de guardar, sin hacer un doble envío desde el contenedor padre.
- Se ajustó la carga inicial de proyectos admin para cumplir con las reglas de React 19 y evitar `setState` síncrono dentro de efectos.
- Se agregó `normalizeArrayResponse` para tolerar respuestas de API tipo array directo, `{ results: [...] }`, `{ data: [...] }` u otros envoltorios equivalentes sin cambiar endpoints.
- Las tablas administrativas muestran ahora todos los campos disponibles que ya se exportaban o estaban mapeados, no solo el subconjunto visible inicial.
- La columna `Acciones` queda al final, pero se mantiene fija a la derecha con pinning interno de DataGrid durante el scroll horizontal y vertical.
- Se recuperó el estilo visual anterior del contenedor y botones de acciones: cápsula con borde vino, sombra y botones dorados.
- Las tablas de proyectos y cédulas ordenan los registros de más nuevo a más viejo antes de renderizar, usando `fecha_registro`, `fecha_creacion`, `created_at` o equivalentes cuando estén presentes en la respuesta.

## Decisión Sobre MUI 9

Se probó la línea más reciente `@mui/material@9.0.1`, pero no se dejó instalada porque introduce `@mui/material-pigment-css` / `@pigment-css/react` y el árbol resultante reportó vulnerabilidades críticas transitivas por `happy-dom`.

La opción aplicada fue `@mui/material@7.3.11` con `@mui/x-data-grid@9.1.0`, porque DataGrid 9 declara compatibilidad con MUI `^7.3.0 || ^9.0.0` y React 19. Esto permite avanzar a React 19 sin incorporar el riesgo transitorio de MUI 9.

## Verificación

- `npm run build`: correcto con Next.js 16.2.6, React 19.2.6, MUI 7.3.11 y DataGrid 9.1.0.
- `npm run lint`: correcto, con advertencias heredadas por uso de `<img>`.
- `npm audit`: queda 1 vulnerabilidad alta en `xlsx`; npm no ofrece fix para ese paquete.
- Servidor dev: `http://localhost:3001` activo y respondiendo.
- Navegador: `/panel-responsable` muestra `Proyectos Registrados` y no muestra `Proyectos de Inversión Registrados Admin` en la vista inicial verificada.

## Pendiente Recomendado

1. Reemplazar `xlsx`, porque no tiene fix npm disponible:
   - Preferencia: `exceljs` para generar archivos `.xlsx`.
   - Alternativa: `write-excel-file` si se quiere una API pequeña para exportación simple.
2. Revisar visualmente tablas con datos reales de API:
   - Anchos de columnas.
   - Filtros y paginación.
   - Exportación XLSX.
   - Acciones de editar y ficha.
3. Migrar gradualmente imágenes a `next/image` para resolver los avisos de lint.
4. Hacer QA manual de flujos autenticados, especialmente los paneles que dependen de cookies y respuestas reales del bucket/API.
