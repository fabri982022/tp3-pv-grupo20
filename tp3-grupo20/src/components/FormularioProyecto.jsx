import React, { useState } from 'react';

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
      <fieldset className="form-seccion">
        <legend>Información General</legend>
        <div className="grid-tres-columnas">
          <input
            type="text"
            name="título"
            placeholder="Título del proyecto"
            value={nuevoProyecto.título}
            onChange={manejarInput}
          />
          <input
            type="text"
            name="categoría"
            placeholder="Categoría"
            value={nuevoProyecto.categoría}
            onChange={manejarInput}
          />
          <select
            name="estado"
            value={nuevoProyecto.estado}
            onChange={manejarInput}
          >
            <option value="">Seleccione un estado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Completado">Completado</option>
          </select>
        </div>
      </fieldset>

      {/* Descripción Extendida */}
      <fieldset className="form-seccion">
        <legend>Detalle del Proyecto</legend>
        <textarea
          name="descripcion"
          placeholder="Descripción del proyecto (mínimo dos párrafos)..."
          value={nuevoProyecto.descripcion}
          onChange={manejarInput}
          required
        />
      </fieldset>

      {/* Recursos y enlaces */}
      <fieldset className="form-seccion">
        <legend>Recursos Asociados</legend>
        <div className="grid-tres-columnas">
          <input
            type="url"
            name="linkPdf"
            placeholder="Enlace al documento PDF"
            value={nuevoProyecto.linkPdf}
            onChange={manejarInput}
          />
          <input
            type="url"
            name="linkDrive"
            placeholder="Enlace a Google Drive"
            value={nuevoProyecto.linkDrive}
            onChange={manejarInput}
          />
          <input
            type="url"
            name="linkGithub"
            placeholder="Enlace a GitHub"
            value={nuevoProyecto.linkGithub}
            onChange={manejarInput}
          />
        </div>
      </fieldset>

      {/* Datos del equipo */}
      <fieldset className="form-seccion">
        <legend>Equipo de Trabajo</legend>
        <div className="grid-dos-columnas">
          <input
            type="text"
            name="nombreIntegrante"
            placeholder="Nombre del Integrante"
            value={nuevoProyecto.nombreIntegrante}
            onChange={manejarInput}
          />
          <input
            type="text"
            name="rolIntegrante"
            placeholder="Rol"
            value={nuevoProyecto.rolIntegrante}
            onChange={manejarInput}
          />
        </div>
      </fieldset>

      {/* Botón de envío */}
      <div className="form-acciones">
        <button className="btn-agregar-principal" onClick={manejarEnvio}>
          Guardar y Publicar Proyecto
        </button>
      </div>
    </div>
  );
};
export default FormularioProyecto;
