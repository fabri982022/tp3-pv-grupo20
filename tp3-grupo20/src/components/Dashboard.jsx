import { Container, Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', my: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          Bienvenido a la Plataforma de Gestión de Proyectos
        </Typography>
        
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
          Administra y colabora en proyectos educativos de forma efectiva
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
            variant="outlined" 
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
  )
}
