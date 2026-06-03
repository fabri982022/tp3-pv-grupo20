import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper } from '@mui/material';

const PaginaError = () => {
  // Captura el error técnico exacto
  const error = useRouteError();
  console.error(error);

  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '80vh',
          textAlign: 'center'
        }}
      >
        <Paper 
          elevation={4} 
          sx={{ 
            p: 5, 
            borderRadius: 3, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            backgroundColor: '#fdfdfd'
          }}
        >
            {/* Advertencia */}
            <Typography variant="h1" component="div" sx={{ mb: 2, fontSize: '5rem' }}>
                ⚠️
            </Typography>
          
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2, color: '#1a3a5a' }}>
                ¡Ups! Algo salió mal
            </Typography>
          
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                Lo sentimos, ha ocurrido un error inesperado en la plataforma.
            </Typography>
          
            {/* Muestra el mensaje técnico (ej: "Not Found") */}
            <Typography variant="body2" color="error" sx={{ fontStyle: 'italic', mb: 4 }}>
                Detalle: {error.statusText || error.message}
            </Typography>

            <Button 
                component={Link} 
                to="/" 
                variant="contained" 
                sx={{ 
                backgroundColor: '#1a3a5a', 
                '&:hover': { backgroundColor: '#11273f' },
                px: 4,
                py: 1.5,
                fontWeight: 'bold'
                }}
            >
                Volver al Inicio
            </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default PaginaError;