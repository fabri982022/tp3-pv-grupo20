import React, { useState } from 'react';
import { Container, Box, Typography, Button, Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
//agrego
import { useUsuario } from '../hook/useUsuario';
import usuarioService from '../services/usuarioService';
import '../css/dashboard.css';
import proyectoService from '../services/proyectoService';
export default function Dashboard() {
  
  const { usuario, guardarSesion, cerrarSesion } = useUsuario();
  const [dniInput, setDniInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true); //Empezamos a cargar
    

    usuarioService.login(dniInput, passwordInput)
      .then((datosUsuario) => {
        guardarSesion(datosUsuario); // Inyecta los datos reales en el contexto
      })
      .catch((error) => {
        setErrorMsg(error.message); // Muestra el error si ponen cualquier clave
      })

      .finally(() => {
        setLoading(false); // 🔥 ¡NUEVO! Apagamos el loading al terminar la promesa
      });

  };
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Typography variant="h5" sx={{ color: '#0e71eb', fontWeight: 'bold' }}>
          Iniciando sesión, por favor espere...
        </Typography>
      </Box>
    );
  }

  
  if (!usuario){
 
    return (
      <Grid container sx={{ minHeight: '80vh' }}>
        
        {/* Mitad izquierda: Informacion */}
        <Grid  
          xs={12} 
          md={6} 
          sx={{ 
            backgroundColor: '#f5f7fa', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            p: 4
          }}
        >
          <Typography variant="h1" sx={{ fontSize: '6rem', mb: 2 }}>
            💻
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a3a5a', textAlign: 'center' }}>
            Plataforma de Gestión
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
            Panel Universitario del Grupo 20
          </Typography>
        </Grid>

        {/* Mitad derecha: Formulario */}
        <Grid 
          xs={12} 
          md={6} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            p: 4 
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: '#111' }}>
              Iniciar sesion
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Ingresá tus datos
            </Typography>

            <form onSubmit={handleLoginSubmit}>
              <TextField 
                label="Usuario" 
                fullWidth 
                sx={{ mb: 2 }} 
                //value={usuario}
                value={dniInput}
                //onChange={(e) => setUsuario(e.target.value)}
                onChange={(e) => setDniInput(e.target.value)}
                variant="outlined"
                required
              />
              <TextField 
                label="Contraseña" 
                type="password" 
                fullWidth 
                sx={{ mb: 3 }} 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                variant="outlined"
                required
              />
              {errorMsg && <Typography variant="body2" color="error" sx={{ mb: 2 }}>{errorMsg}</Typography>}
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                sx={{ 
                  backgroundColor: '#0e71eb', 
                  '&:hover': { backgroundColor: '#0c5dc2' },
                  py: 1.5, 
                  borderRadius: 2,
                  fontWeight: 'bold',
                  textTransform: 'none'
                }}
              >
                Iniciar Sesion
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    );
  }
const proyectos = proyectoService.obtenerProyectos()
  .filter(p => p.disponible);

const totalProyectos = proyectos.length;

const proyectosActivos = proyectos.filter(
  p => p.estado === "En Progreso"
).length;

const proyectosCompletados = proyectos.filter(
  p => p.estado === "Completado"
).length;

const proyectosPendientes = proyectos.filter(
  p => p.estado === "Pendiente"
).length;
  // Esta logeado
  return (
  <Container maxWidth="lg" className="dashboard-container">

    <Box className="dashboard-bienvenida">
      <Typography variant="h4" className="dashboard-titulo">
        👋 Bienvenido {usuario?.nombre} 
      </Typography>

      <Typography variant="h6">
        {usuario?.rol} • {usuario?.institucion}
      </Typography>

      <Typography className="dashboard-subtitulo">
        Gestiona y supervisa tus proyectos educativos desde esta plataforma.
      </Typography>
    </Box>

    <Typography variant="h4" className="dashboard-seccion">
      📊 Resumen General
    </Typography>

    <Grid  container spacing={3} className="dashboard-estadisticas">
      <Grid item xs={12} sm={6} md={3}>
        <Box className="dashboard-card">
          <Typography variant="h3" className="dashboard-numero">
            {totalProyectos}
          </Typography>

          <Typography>
            Total Proyectos
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Box className="dashboard-card">
          <Typography variant="h3" className="dashboard-numero">
            {proyectosActivos}
          </Typography>

          <Typography>
            Activos
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Box className="dashboard-card">
          <Typography variant="h3" className="dashboard-numero">
            {proyectosPendientes}
          </Typography>

          <Typography>
            Pendientes
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Box className="dashboard-card">
          <Typography variant="h3" className="dashboard-numero">
            {proyectosCompletados}
          </Typography>

          <Typography>
            Completados
          </Typography>
        </Box>
      </Grid>

    </Grid>

    <Box className="dashboard-info">
      <Typography variant="h5" gutterBottom>
        Información de la Plataforma
      </Typography>

      <Typography>
        Desde aquí podrás gestionar proyectos educativos,
        realizar seguimiento de actividades, consultar información
        académica y colaborar con otros integrantes de la comunidad universitaria.
      </Typography>
    </Box>

  </Container>
);
}