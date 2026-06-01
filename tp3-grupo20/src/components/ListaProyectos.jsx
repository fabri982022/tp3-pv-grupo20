import { useState, useEffect, useRef } from 'react'
import { Container, Grid } from '@mui/material'
import ProyectoCard from './ProyectoCard'
import proyectoService from '../services/proyectoService'
import FormularioProyecto from './FormularioProyecto'
import RegistroActividad from './RegistroActividad'


const ListaProyectos = () => {

  // Variables de estado
  const [proyectos, setProyectos] = useState(
    proyectoService.obtenerProyectos()
  )

  const [busqueda, setBusqueda] = useState('')

  const [ultimaActualizacion, setUltimaActualizacion] = useState(null)

  // Referencia para controlar el renderizado inicial
  const primerRenderizado = useRef(0) // Valor inicial de useRef. Contador de ejecuciones

  useEffect(() => {
    // Condicional para la primera carga
    if (primerRenderizado.current < 2){ // Por el doble renderizado de React 18 'StrictMode'
      primerRenderizado.current += 1 
      return
    }

    // Caputura de la fecha y hora
    const fechaHora = new Date()

    // Formato especifico de fecha y hora
    const dia = String(fechaHora.getDate()).padStart(2, '0')
    const mes = String(fechaHora.getMonth() + 1).padStart(2, '0') 
    const anio = fechaHora.getFullYear()
    const horas = String(fechaHora.getHours()).padStart(2, '0')
    const minutos = String(fechaHora.getMinutes()).padStart(2, '0')

    const mensajeConFormato = `Última actualización de la lista: ${dia}/${mes}/${anio} a las ${horas}:${minutos} hs.`

    // Guardado del mensaje en el estado de actualizacion
    setUltimaActualizacion(mensajeConFormato)

  },[proyectos])  // DEPENDENCIA: escucha el estado de 'proyectos'
 
// Eliminar proyecto
  const eliminarProyecto = (id) => {
    proyectoService.eliminarProyecto(id)

    setProyectos(proyectoService.obtenerProyectos())
  }

// Buscador optimizado para asilamiento de estado
  const manejarBusqueda = (e) => {
    const texto = e.target.value

    setBusqueda(texto)     
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
  }

  // Aislamiento de la busqueda. Variable calculada en tiempo real
  const proyectosDisponibles = proyectos.filter(proyecto => {
    const estaDisponible = proyecto.disponible === true
    const coincideConBusqueda = proyecto.título.toLowerCase().includes(busqueda.toLowerCase())
    
    return estaDisponible && coincideConBusqueda
  })

  return (
  <Container maxWidth="xl">
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

      <h2 className="titulo-formulario">Agregar Proyecto</h2>

      <div className="formulario-card">
        <FormularioProyecto
          onAgregarProyecto={agregarProyecto}
        />
      </div>

      <p className="total-proyectos">Total de proyectos: {proyectosDisponibles.length}</p>

    <Grid container spacing={3}>
      {proyectosDisponibles.length > 0 ? (
        proyectosDisponibles.map((proyecto) => (
          <Grid item xs={12} sm={6} md={4} key={proyecto.id}>
            <ProyectoCard
              proyecto={proyecto}
              eliminarProyecto={eliminarProyecto}
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <p>No se encontraron proyectos.</p>
        </Grid>
      )}
    </Grid>

    {ultimaActualizacion && (<RegistroActividad mensaje={ultimaActualizacion}/>)}

        </main>
      </Container>
    )
}

export default ListaProyectos