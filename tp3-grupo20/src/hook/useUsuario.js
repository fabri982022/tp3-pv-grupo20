import { UsuarioContext } from '../context/UsuarioContext';
import { useContext } from 'react';

// Hook personalizado para acceder/consumir el contexto de usuario
export const useUsuario = () => useContext(UsuarioContext);