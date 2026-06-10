import { Container, Box, Typography, Card, CardContent, TextField, Button, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useUsuario } from '../hook/useUsuario'

const PerfilUsuario = () => {
  const { usuario, actualizarPerfil } = useUsuario()
  const [editar, setEditar] = useState(false)
  const [formulario, setFormulario] = useState({ ...usuario })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormulario({
      ...formulario,
      [name]: value
    })
  }

  const handleActivarEdicion = () => {
    setFormulario({ ...usuario })
    setEditar(true)
  }

  const handleGuardar = () => {
    actualizarPerfil(formulario) 
    setEditar(false)
  }

  const handleCancelar = () => {
    setFormulario({ ...usuario })
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
              label="Nombre y Apellido"
              name="nombre"
              value={editar ? formulario.nombre : usuario.nombre}
              onChange={handleChange}
              disabled={!editar}
              fullWidth
              variant="outlined"
              required
            />

            <TextField
              label="DNI"
              name="dni"
              value={editar ? formulario.dni : usuario.dni}
              onChange={handleChange}
              disabled={!editar}
              fullWidth
              variant="outlined"
              required
            />

            <TextField
              select
              label="Rol"
              name="rol"
              value={editar ? formulario.rol : usuario.rol}
              onChange={handleChange}
              disabled={!editar}
              fullWidth
              variant="outlined"
              required
            >
              <MenuItem value="Alumno">Alumno</MenuItem>
              <MenuItem value="Docente">Docente</MenuItem>
            </TextField>

            <TextField
              label="Institución"
              name="institucion"
              value={editar ? formulario.institucion : usuario.institucion}
              onChange={handleChange}
              disabled={!editar}
              fullWidth
              variant="outlined"
              required
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              {!editar ? (
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleActivarEdicion}
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
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default PerfilUsuario;