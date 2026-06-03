import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Button } from '@mui/material';
import proyectoService from '../services/proyectoService';

/*  Este es un 'Componente de Presentación' mejorado con React Router. 
  Obtiene el proyecto desde la URL usando useParams() y lo recupera del servicio.
*/
export default function DetalleProyecto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const proyecto = proyectoService.obtenerProyectoPorId(id);

  if (!proyecto) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box className="detalle-vacio" sx={{ textAlign: 'center', my: 8 }}>
          <p>Proyecto no encontrado.</p>
          <Button 
            variant="contained" 
            onClick={() => navigate('/proyectos')}
            sx={{ mt: 2 }}
          >
            Volver a Proyectos
          </Button>
        </Box>
      </Container>
    );
  }

  const { título, categoría, estado, descripcion, recursos, equipo } = proyecto;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <article className="detalle-proyecto-container">
        { /* Cabecera del Detalle */}
        <header className="detalle-header">
          <h1>{título}</h1>
          <p className="detalle-meta">
            <strong>Categoría:</strong> {categoría} | <strong>Estado:</strong> {estado}
          </p>
        </header>

        {/* Sección 1: Descripción Extendida */}
        <section className="detalle-descripcion">
          <h2>Descripción del Proyecto</h2>
          {descripcion.split('\n\n').map((parrafo, index) => (
            <p key={index} className="parrafo-descripcion">{parrafo}</p>
          ))}
        </section>

        {/* Sección 2: Recursos (PDF, Drive, GitHub) */}
        <section className="detalle-recursos">
          <h2>Recursos Disponibles</h2>
          <ul>
            <li>
              <a href={recursos.pdf} target="_blank" rel="noopener noreferrer">📄 Ver Documento PDF</a>
            </li>
            <li>
              <a href={recursos.drive} target="_blank" rel="noopener noreferrer">📁 Carpeta de Google Drive</a>
            </li>
            <li>
              <a href={recursos.github} target="_blank" rel="noopener noreferrer">💻 Repositorio de GitHub</a>
            </li>
          </ul>
        </section>

        {/* Sección 3: Integrantes del Equipo */}
        <section className="detalle-equipo">
          <h2>Equipo de Trabajo</h2>
          <div className="equipo-grid">
            {equipo.map((integrante, index) => (
              <div key={index} className="miembro-equipo-card">
                <h3>{integrante.nombre}</h3>
                <p><strong>Rol:</strong> {integrante.rol}</p>
              </div>
            ))}
          </div>
        </section>
      </article>

      {/* Botones */}
      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          onClick={() => navigate('/proyectos')}
        >
          Volver a Proyectos
        </Button>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
        >
          Ir al Inicio
        </Button>
      </Box>

    </Container>
  );
}