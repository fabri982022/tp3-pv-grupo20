import { NavLink, Link } from 'react-router-dom'
import { Box, AppBar, Toolbar, Typography } from '@mui/material'
import logoUnju from '../assets/logo-fi-unju-institucional.png'

export default function Nav() {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1a3a5a', mb: 2 }}>
      <Toolbar>

        <Box 
          component={Link} 
          to="/" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none', 
            color: 'white',
            gap: 2,
            flexGrow: 1, 
            '&:hover': { opacity: 0.9 }
          }}
        >
          <img 
            src={logoUnju}
            alt="Logo UNJu" 
            style={{ height: '48px', width: 'auto', display: 'block' }} 
          />

          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Plataforma de Gestión de Proyectos Educativos
          </Typography>
        </Box>

        <Box component="nav" sx={{ display: 'flex', gap: 3 }}>
          <NavLink 
            to="/" 
            style={({ isActive }) => ({
              color: isActive ? '#1976d2' : 'white',
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
              color: isActive ? '#1976d2' : 'white',
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
              color: isActive ? '#1976d2' : 'white',
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