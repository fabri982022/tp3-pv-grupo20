import { Container, Box, Typography, Card, CardContent, TextField, Button } from '@mui/material'
import { useState } from 'react'

export default function PerfilUsuario() {
  const [usuario, setUsuario] = useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    carrera: 'Ingeniería en Sistemas',
    año: '2026',
    descripcion: 'Estudiante apasionado por la programación y el desarrollo web'
  })

  const [editar, setEditar] = useState(false)
  const [formulario, setFormulario] = useState(usuario)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormulario({
      ...formulario,
      [name]: value
    })
  }

  const handleGuardar = () => {
    setUsuario(formulario)
    setEditar(false)
  }

  const handleCancelar = () => {
    setFormulario(usuario)
    setEditar(false)
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Mi Perfil
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Nombre"
              name="nombre"
              value={editar ? formulario.nombre : usuario.nombre}
              onChange={handleChange}
              disabled={!editar}
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={editar ? formulario.email : usuario.email}
              onChange={handleChange}
              disabled={!editar}
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Carrera"
              name="carrera"
              value={editar ? formulario.carrera : usuario.carrera}
              onChange={handleChange}
              disabled={!editar}
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Año de Estudios"
              name="año"
              value={editar ? formulario.año : usuario.año}
              onChange={handleChange}
              disabled={!editar}
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Descripción"
              name="descripcion"
              value={editar ? formulario.descripcion : usuario.descripcion}
              onChange={handleChange}
              disabled={!editar}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            {!editar ? (
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => setEditar(true)}
                fullWidth
              >
                Editar Perfil
              </Button>
            ) : (
              <>
                <Button 
                  variant="contained" 
                  color="success"
                  onClick={handleGuardar}
                  fullWidth
                >
                  Guardar Cambios
                </Button>
                <Button 
                  variant="outlined" 
                  color="error"
                  onClick={handleCancelar}
                  fullWidth
                >
                  Cancelar
                </Button>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}
