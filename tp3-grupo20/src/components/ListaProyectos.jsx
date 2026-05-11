import { useState } from 'react'
import ProyectoCard from './ProyectoCard'
import proyectoService from '../services/proyectoService'

const ListaProyectos = () => {
  const [proyectos, setProyectos] = useState(
    proyectoService.obtenerProyectos()
  )

  const [busqueda, setBusqueda] = useState('')

  const eliminarProyecto = (id) => {
    proyectoService.eliminarProyecto(id)

    setProyectos(proyectoService.obtenerProyectos())
  }

  const manejarBusqueda = (e) => {
    const texto = e.target.value

    setBusqueda(texto)

    if (texto.trim() === '') {
      setProyectos(proyectoService.obtenerProyectos())
    } else {
      setProyectos(proyectoService.buscarProyecto(texto))
    }
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

      <section className="lista-proyectos">
        {proyectos.length > 0 ? (
          proyectos.map((proyecto) => (
            <ProyectoCard
              key={proyecto.id}
              proyecto={proyecto}
              onEliminar={eliminarProyecto}
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