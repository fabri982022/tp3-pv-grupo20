import { createContext, useState, useEffect } from 'react';

// Creamos el contexto de forma interna
const UsuarioContext = createContext(null);

// Exportamos el Proveedor
export const UsuarioProvider = ({ children }) => {
  
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario_global');
    if (usuarioGuardado) {
      return JSON.parse(usuarioGuardado);
    }
    return {
      nombre: 'Juan Pérez',
      dni: '12345678',
      rol: 'Alumno',
      institucion: 'Universidad Nacional de Jujuy'
    };
  });

  const actualizarPerfil = (datosModificados) => {
    setUsuario(datosModificados);
  };

  const guardarSesion = (usuario) => setUsuario(usuario);
  const cerrarSesion = () => {
    localStorage.removeItem('usuario_global');
    setUsuario(null);
  };

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario_global', JSON.stringify(usuario));
    }
  }, [usuario]);

  return (
    <UsuarioContext.Provider value={{ usuario, actualizarPerfil, guardarSesion, cerrarSesion }}>
      {children}
    </UsuarioContext.Provider>
  );
};

// Exportamos el contexto original abajo de todo para que el hook 'useUsuario.js' lo pueda leer sin errores
export { UsuarioContext };