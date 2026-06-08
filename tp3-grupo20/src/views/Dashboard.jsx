import React, { useState } from 'react';
import { Container, Box, Typography, Button, Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
//agrego
import { useUsuario } from '../hook/useUsuario';
import usuarioService from '../services/usuarioService';

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
                Sign In
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    );
  }

  // Esta logeado
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', my: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          Bienvenido a la Plataforma de Gestión de Proyectos
        </Typography>
        
        {/* Personalizacion del subtítulo con el nombre guardado */}
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
          
          {/*Hola, <strong>{localStorage.getItem('user')}</strong>. Administra y colabora en proyectos educativos de forma efectiva.
           */}   
          Hola, {usuario?.nombre} ({usuario?.rol})
        
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            component={Link}
            to="/proyectos"
          >
            Ver Proyectos
          </Button>
          
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            component={Link}
            to="/perfil"
          >
            Mi Perfil
          </Button>

        </Box>

        <Box sx={{ mt: 6, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="body1">
            Desde aquí puedes gestionar tus proyectos, visualizar detalles, 
            editar tu perfil y mantener un registro de todas las actividades.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}