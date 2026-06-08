import { createContext, useContext,useState } from 'react';

// 1. Creación del contexto vacío
export const UsuarioContext = createContext(null);

// 2. Componente Proveedor
export const UsuarioProvider = ({ children }) => {
  
  // Cargamos el estado usando el servicio simulado
  const [usuario, setUsuario] = useState( null);
  const guardarSesion= (usuario) => setUsuario(usuario);
  const cerrarSesion= () => setUsuario(null);


  return (
    <UsuarioContext.Provider value={{ usuario, guardarSesion, cerrarSesion }}>
      {children}
    </UsuarioContext.Provider>
  );
};