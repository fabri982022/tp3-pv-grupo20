import React, { useState } from 'react';

import {
  TextField,
  MenuItem,
  Button,
  Paper,
  Typography
} from '@mui/material';

const FormularioProyecto = ({ onAgregarProyecto }) => {

  // Estado para nuevo proyecto
  const [nuevoProyecto, setNuevoProyecto] = useState({
    título: '',
    categoría: '',
    estado: '',
    descripcion: '', 
    linkPdf: '',
    linkDrive: '',
    linkGithub: '',
    nombreIntegrante: '',
    rolIntegrante: ''
  });

  // Actualizar datos del nuevo proyecto
  const manejarInput = (e) => {
    setNuevoProyecto({
      ...nuevoProyecto,
      [e.target.name]: e.target.value
    });
  };

  // Manejador del envío (Submit)
  const manejarEnvio = () => {
    
    onAgregarProyecto(nuevoProyecto);
    
    
      setNuevoProyecto({
        título: '',
        categoría: '',
        estado: '',
        descripcion: '',
        linkPdf: '',
        linkDrive: '',
        linkGithub: '',
        nombreIntegrante: '',
        rolIntegrante: ''
      });
  };

  return (
    <div className="formulario-card">
      {/* Datos principales del proyecto */}
      <Paper className="form-paper">
        <Typography variant="h6" gutterBottom>
          Información General
        </Typography>

        <div className="grid-tres-columnas">

      <TextField
        fullWidth
        label="Título del proyecto"
        name="título"
        value={nuevoProyecto.título}
        onChange={manejarInput}
      />

      <TextField
        fullWidth
        label="Categoría"
        name="categoría"
        value={nuevoProyecto.categoría}
        onChange={manejarInput}
      />

      <TextField
        select
        fullWidth
        label="Estado"
        name="estado"
        value={nuevoProyecto.estado}
        onChange={manejarInput}
        >
          <MenuItem value="">
            Seleccione un estado
          </MenuItem>
          <MenuItem value="Pendiente">
            Pendiente
          </MenuItem>

          <MenuItem value="En Progreso">
            En Progreso
          </MenuItem>

          <MenuItem value="Completado">
            Completado
          </MenuItem>
        </TextField>

      </div>
    </Paper>



    {/* Detalle del proyecto */}
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Detalle del Proyecto
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={5}
        label="Descripción"
        name="descripcion"
        value={nuevoProyecto.descripcion}
        onChange={manejarInput}
      />
    </Paper>


      {/* Recursos y enlaces */}
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Recursos Asociados
      </Typography>

      <div className="grid-tres-columnas">

        <TextField
          fullWidth
          label="Enlace al PDF"
          name="linkPdf"
          value={nuevoProyecto.linkPdf}
          onChange={manejarInput}
        />

        <TextField
          fullWidth
          label="Enlace a Google Drive"
          name="linkDrive"
          value={nuevoProyecto.linkDrive}
          onChange={manejarInput}
        />

        <TextField
          fullWidth
          label="Enlace a GitHub"
          name="linkGithub"
          value={nuevoProyecto.linkGithub}
          onChange={manejarInput}
        />

      </div>
    </Paper>
      {/* Datos del equipo */}
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Equipo de Trabajo
      </Typography>

      <div className="grid-dos-columnas">

        <TextField
          fullWidth
          label="Nombre del Integrante"
          name="nombreIntegrante"
          value={nuevoProyecto.nombreIntegrante}
          onChange={manejarInput}
        />

        <TextField
          fullWidth
          label="Rol"
          name="rolIntegrante"
          value={nuevoProyecto.rolIntegrante}
          onChange={manejarInput}
        />

      </div>
    </Paper>


      {/* Botón de envío */}
      <div className="form-acciones">
        <Button
          variant="contained"
          size="large"
          onClick={manejarEnvio}
        >
          Guardar y Publicar Proyecto
        </Button>
      </div>
    </div>
  );
};
export default FormularioProyecto;
