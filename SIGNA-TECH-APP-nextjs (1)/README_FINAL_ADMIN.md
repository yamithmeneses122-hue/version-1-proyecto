# SIGNA-TECH-APP — Módulo Administrador integrado

## Instalación

1. Abrir una terminal dentro de `Signa_tech_primer_modulo`.
2. Ejecutar:

```bash
npm install
npm run dev
```

3. Abrir la URL que muestre Vite (normalmente `http://localhost:5173/`).

## Acceso de prueba del Administrador

- Correo: `administrador@gmail.com`
- Contraseña: `Administrador2026#`

## Acceso de prueba del Operador

- Correo: `operador@gmail.com`
- Contraseña: `Operador2026#`

## Rutas administrativas

- `/administrador` — Dashboard global
- `/gestion_usuarios` — Gestión de usuarios
- `/gestion_roles` — Roles y permisos
- `/admin/diccionario` — Diccionario LSC administrativo
- `/aprobacion_senas` — Aprobación de señas
- `/admin/configuracion` — Configuración administrativa

## Rutas del Operador

- `/operador`
- `/texto-voz`
- `/voz-a-texto`
- `/camara`
- `/diccionario`
- `/avatar`
- `/configuracion`

## Cambios incluidos

- Login redirige al módulo correspondiente según el rol.
- Las rutas del Administrador requieren una sesión con rol `administrador`.
- Las rutas del Operador requieren una sesión con rol `operador`.
- Se separaron las rutas administrativas del Diccionario y Configuración para evitar conflictos con las rutas del Operador.
- El cierre de sesión elimina la sesión almacenada.
- Se corrigió el JSX inválido de `HeaderHomeLayout.jsx`.
- Se conservaron los componentes y estilos existentes del módulo Administrador.

## Nota

El ZIP no incluye `node_modules` para evitar dependencias nativas específicas del sistema operativo. Después de descomprimir, `npm install` instala las dependencias correctas para el equipo donde se ejecute el proyecto.
