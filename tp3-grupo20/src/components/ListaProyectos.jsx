import { useState } from 'react'
import ProyectoCard from './ProyectoCard'
import proyectoService from '../services/proyectoService'

// Estado de proyectos
const ListaProyectos = () => {
  const [proyectos, setProyectos] = useState(
    proyectoService.obtenerProyectos()
  )
// Estado para busqueda
  const [busqueda, setBusqueda] = useState('')
// Estado para nuevo proyecto
  const [nuevoProyecto, setNuevoProyecto] = useState({
    título: '',
    categoría: '',
    estado: ''
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
    if (
      nuevoProyecto.título.trim() === '' ||
      nuevoProyecto.categoría.trim() === '' ||
      nuevoProyecto.estado.trim() === ''
    ) {
      return
    }

    proyectoService.agregarProyecto({
        título: formatearTexto(nuevoProyecto.título),

        categoría: formatearTexto(
         nuevoProyecto.categoría
        ),

     estado: nuevoProyecto.estado
})

    setProyectos(proyectoService.obtenerProyectos())

    setNuevoProyecto({
      título: '',
      categoría: '',
      estado: ''
    })
  }

  return (
    <main className="contenedor-proyectos">
      <section className="buscador">
        <p>Total de proyectos: {proyectos.length}</p>

        <h1>Listado de Proyectos</h1>

        <input
          type="text"
          placeholder="Buscar proyecto..."
          value={busqueda}
          onChange={manejarBusqueda}
        />
      </section>

      <section className="agregar-proyecto">
        <h2>Agregar Proyecto</h2>

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
      </section>

      <section className="lista-proyectos">
        {proyectos.length > 0 ? (
          proyectos.map((proyecto) => (
            <ProyectoCard
              key={proyecto.id}
              proyecto={proyecto}
              eliminarProyecto={eliminarProyecto}
            />
          ))
        ) : (
          <p>No se encontraron proyectos.</p>
        )}
      </section>
    </main>
  )
}

export default ListaProyectos