# SIGNA-TECH-APP (Next.js)

Frontend migrado de Vite + React Router a **Next.js (App Router)**, conservando la estructura `Features/`.

## Ejecutar
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # producción
```

## Estructura
- `src/app/` → rutas (reemplaza `Routes/rutas.jsx`, `Aplicacion.jsx` y `main.jsx`). Los grupos `(publico)`, `(administrador)`, etc. no afectan la URL.
- `src/Features/` → módulos Public, Authentication, Administrador, Interprete y Operador (sin cambios de carpetas).
- `src/componentes/compartidos/` → incluye `NavLink.jsx`, equivalente al NavLink de react-router.
- `public/` → imágenes (se sirven en `/images/...`).

Las URLs son las mismas de antes (`/inicio_admin`, `/texto-voz`, `/interprete/validar`, ...). Una ruta inexistente redirige a `/`.
