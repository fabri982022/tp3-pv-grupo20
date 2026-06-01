import { NavLink } from 'react-router-dom'
import { Box, AppBar, Toolbar, Typography } from '@mui/material'

export default function Nav() {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1976d2', mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Plataforma de Gestión de Proyectos Educativos
        </Typography>
        
        <Box component="nav" sx={{ display: 'flex', gap: 3 }}>
          <NavLink 
            to="/" 
            style={({ isActive }) => ({
              color: isActive ? '#ffeb3b' : 'white',
              textDecoration: 'none',
              fontWeight: isActive ? 'bold' : 'normal',
              fontSize: '1rem',
              transition: 'color 0.3s ease'
            })}
          >
            Inicio
          </NavLink>

          <NavLink 
            to="/proyectos"
            style={({ isActive }) => ({
              color: isActive ? '#ffeb3b' : 'white',
              textDecoration: 'none',
              fontWeight: isActive ? 'bold' : 'normal',
              fontSize: '1rem',
              transition: 'color 0.3s ease'
            })}
          >
            Proyectos
          </NavLink>

          <NavLink 
            to="/perfil"
            style={({ isActive }) => ({
              color: isActive ? '#ffeb3b' : 'white',
              textDecoration: 'none',
              fontWeight: isActive ? 'bold' : 'normal',
              fontSize: '1rem',
              transition: 'color 0.3s ease'
            })}
          >
            Mi Perfil
          </NavLink>
        </Box>
      </Toolbar>
    </AppBar>
  )
}