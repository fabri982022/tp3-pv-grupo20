const ProyectoCard = ({ proyecto, eliminarProyecto }) => {
  return (
    <article className="card-proyecto">
      <h2>{proyecto.título}</h2>

      <p>
        <strong>Categoría:</strong> {proyecto.categoría}
      </p>

      <p>
        <strong>Estado:</strong> {proyecto.estado}
      </p>

      <button onClick={() => eliminarProyecto(proyecto.id)}>
        Eliminar
      </button>
    </article>
  )
}

export default ProyectoCard