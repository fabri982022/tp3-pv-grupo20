import { useState, useEffect } from 'react'
import ProyectoCard from './ProyectoCard'
import DetalleProyecto from './DetalleProyecto'
import proyectoService from '../services/proyectoService'

// Estado de proyectos
const ListaProyectos = () => {
  const [proyectos, setProyectos] = useState(
    proyectoService.obtenerProyectos()
  )

const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null)

// Estado para la última actualización de la lista
const [ultimaActualizacion, setUltimaActualizacion] = useState(new Date())


// Estado para busqueda
  const [busqueda, setBusqueda] = useState('')

// Función para formatear la fecha y hora
const obtenerMensajeActualizacion = (fecha) => {
  const dia = String(fecha.getDate()).padStart(2, '0')
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const anio = fecha.getFullYear()
  const horas = String(fecha.getHours()).padStart(2, '0')
  const minutos = String(fecha.getMinutes()).padStart(2, '0')
  
  return `Última actualización de la lista: ${dia}/${mes}/${anio} a las ${horas}:${minutos} hs.`
}

// Estado para nuevo proyecto
  const [nuevoProyecto, setNuevoProyecto] = useState({
    título: '',
    categoría: '',
    estado: '',
    descripcion: '', // Nuevas variables temporales
    linkPdf: '',
    linkDrive: '',
    linkGithub: '',
    nombreIntegrante: '',
    rolIntegrante: ''
  })
// Eliminar proyecto
  const eliminarProyecto = (id) => {
    proyectoService.eliminarProyecto(id)

    setProyectos(proyectoService.obtenerProyectos())
    setUltimaActualizacion(new Date())
  }
// Buscar proyectos en tiempo real
  const manejarBusqueda = (e) => {
    const texto = e.target.value

    setBusqueda(texto)

    if (texto.trim() === '') {
      setProyectos(proyectoService.obtenerProyectos())
    } else {
      setProyectos(proyectoService.buscarProyecto(texto))
    }
    
    setUltimaActualizacion(new Date())
  }

  // Formatear texto ingresado
  const formatearTexto = (texto) => {
  return texto
    .toLowerCase()
    .split(' ')
    .map(
      (palabra) =>
        palabra.charAt(0).toUpperCase() +
        palabra.slice(1)
    )
    .join(' ')
  }

// Actualizar datos del nuevo proyecto
  const manejarInput = (e) => {
    setNuevoProyecto({
      ...nuevoProyecto,
      [e.target.name]: e.target.value
    })
  }

// Agregar nuevo proyecto
  const agregarProyecto = () => {
    // Desestructuracion
    const {
      título,
      categoría,
      estado,
      descripcion,
      linkPdf,
      linkDrive,
      linkGithub,
      nombreIntegrante,
      rolIntegrante
    } = nuevoProyecto;

    // Validacion de campos obligatorios
    if (
      título.trim() === '' ||
      categoría.trim() === '' ||
      estado.trim() === '' ||
      descripcion.trim() === ''
    ) {
      alert("Por favor, completa los campos obligatorios (Título, Categoría, Estado y Descripción).");
      return;
    }

    proyectoService.agregarProyecto({
      título: formatearTexto(título),         
      categoría: formatearTexto(categoría),   
      estado: estado,                         
      visibilidad: "Disponible",
      descripcion: descripcion.trim(),    // Agregamos la descripción larga

      // Creamos el objeto de recursos
      recursos: {
        pdf: linkPdf.trim() || "https://unju.edu.ar/no-disponible.pdf",
        drive: linkDrive.trim() || "https://drive.google.com/no-disponible",
        github: linkGithub.trim() || "https://github.com/no-disponible"
      },

      // Creamos el arreglo de objetos para el equipo
      equipo: [{ 
        nombre: nombreIntegrante.trim() || "Integrante Anónimo", 
        rol: rolIntegrante.trim() || "Colaborador" 
      }]
    })

    setProyectos(proyectoService.obtenerProyectos())
    setUltimaActualizacion(new Date())

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
    })
  }

  const proyectosDisponibles = proyectos.filter(
    proyecto => proyecto.visibilidad === "Disponible"
  )
  return (
    <main>
      <h1 className="proyectos-disponibles">Listado de Proyectos</h1>
      
      <p className="mensaje-actualizacion">{obtenerMensajeActualizacion(ultimaActualizacion)}</p>

      <h2 className="titulo-buscador">Buscador de Proyectos</h2>

        <div className="buscador-group">
          <input
            type="text"
            placeholder="Buscar proyecto..."
            value={busqueda}
            onChange={manejarBusqueda}
          />
        </div>  

      <h2 className="titulo-formulario">Agregar Proyecto</h2>

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
          <button className="btn-agregar-principal" onClick={agregarProyecto}>
            Guardar y Publicar Proyecto
          </button>
        </div>
      </div>

      <p className="total-proyectos">Total de proyectos: {proyectosDisponibles.length}</p>

      <section className="proyectos-container">
        {proyectosDisponibles.length > 0 ? (
          proyectosDisponibles.map((proyecto) => (
            <ProyectoCard
              key={proyecto.id}
              proyecto={proyecto}
              eliminarProyecto={eliminarProyecto}
              seleccionarProyecto={setProyectoSeleccionado}
            />
          ))
        ) : (
          <p>No se encontraron proyectos.</p>
        )}
      </section>

      {proyectoSeleccionado && (<DetalleProyecto proyecto={proyectoSeleccionado}/>)}

    </main>
  )
}

export default ListaProyectos