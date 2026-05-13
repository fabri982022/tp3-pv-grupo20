const ProyectoCard = ({ proyecto, eliminarProyecto }) => {
  return (
    <article className="proyecto">
      <h3 className ="proyectos-disponibles">{proyecto.título}</h3>

      <p>
        <strong>Categoría: </strong> {proyecto.categoría}
      </p>

      <p>
        <strong>Estado: </strong> {proyecto.estado}
      </p>

      <button className="boton" onClick={() => eliminarProyecto(proyecto.id)}>
        Eliminar Proyecto
      </button>
    </article>
  )
}

export default ProyectoCard