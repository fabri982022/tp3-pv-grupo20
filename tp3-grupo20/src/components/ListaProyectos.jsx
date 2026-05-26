import { useState, useEffect } from 'react'
import ProyectoCard from './ProyectoCard'
import DetalleProyecto from './DetalleProyecto'
import proyectoService from '../services/proyectoService'
import FormularioProyecto from './FormularioProyecto'


const ListaProyectos = () => {

  const [proyectos, setProyectos] = useState(
    proyectoService.obtenerProyectos()
  )

 const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null)

// Estado para busqueda
  const [busqueda, setBusqueda] = useState('')

 
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


// Agregar nuevo proyecto
  const agregarProyecto = (nuevoProyecto) => {
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
      disponible: true,
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

  }

  const proyectosDisponibles = proyectos.filter(
  proyecto => proyecto.disponible
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
        <FormularioProyecto
          onAgregarProyecto={agregarProyecto}
        />
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