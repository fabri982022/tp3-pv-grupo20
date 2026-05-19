import { useState } from 'react'
import ProyectoCard from './ProyectoCard'
import DetalleProyecto from './DetalleProyecto'
import proyectoService from '../services/proyectoService'

// Estado de proyectos
const ListaProyectos = () => {
  const [proyectos, setProyectos] = useState(
    proyectoService.obtenerProyectos()
  )

const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null)


// Estado para busqueda
  const [busqueda, setBusqueda] = useState('')
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

      <h2 className="titulo-buscador">Buscador de Proyectos</h2>

        <div className="buscador-group">
          <input
            type="text"
            placeholder="Buscar proyecto..."
            value={busqueda}
            onChange={manejarBusqueda}
          />
        </div>  

      <h2 className="titulo-buscador">Agregar Proyecto</h2>
      
        <div className="buscador-group">
          <input
            type="text"
            name="título"
            placeholder="Título"
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
            <option value="">
              Seleccione un estado
            </option>

            <option value="Pendiente">
              Pendiente
            </option>

            <option value="En Progreso">
              En Progreso
            </option>

            <option value="Completado">
              Completado
            </option>
          </select>

          <button onClick={agregarProyecto}>
            Agregar Proyecto
          </button>
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