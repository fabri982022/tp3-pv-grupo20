const ProyectoCard = ({ proyecto, onEliminar }) => {
  return (
    <article className="card-proyecto">
      <h2>{proyecto.título}</h2>

      <p>
        <strong>Categoría:</strong> {proyecto.categoría}
      </p>

      <p>
        <strong>Estado:</strong> {proyecto.estado}
      </p>

      <button onClick={() => onEliminar(proyecto.id)}>
        Eliminar
      </button>
    </article>
  )
}

export default ProyectoCard