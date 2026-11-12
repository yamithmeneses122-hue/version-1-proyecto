// Cuentas ficticias para desarrollo. Reemplazarlas al conectar el sistema real.
const roles = [
  {
    id: "administrador",
    nombre: "Administrador",
    correo: "administrador@gmail.com",
    contraseña: "administrador2026#",
    rol: "administrador",
    activo: true,
  },
  {
    id: "interprete",
    nombre: "Interprete",
    correo: "interprete@gmail.com",
    contraseña: "interprete2026#",
    rol: "interprete",
    activo: true,
  },
  {
    id: "operador",
    nombre: "Operador",
    correo: "operador@gmail.com",
    contraseña: "operador2026#",
    rol: "operador",
    activo: true,
  },
];

export function autenticarUsuario(correo, contraseña) {
  const cuenta = roles.find(
    (usuario) => usuario.correo.toLowerCase() === correo.trim().toLowerCase(),
  );

  if (!cuenta || !cuenta.activo || cuenta.contraseña !== contraseña) {
    return null;
  }

  return {
    id: cuenta.id,
    nombre: cuenta.nombre,
    correo: cuenta.correo,
    rol: cuenta.rol,
  };
}


export default roles;

