const ProyectoCard = ({ proyecto, eliminarProyecto }) => {
  // Desestructuración del objeto proyecto
  const { título, categoría, estado, id } = proyecto;

  return (
    <article className="card-proyecto">
      <h2>{título}</h2>

      <p>
        <strong>Categoría:</strong> {categoría}
      </p>

      <p>
        <strong>Estado:</strong> <span className={`estado estado-${estado.toLowerCase().replace(/\s+/g, '-')}`}>{estado}</span>
      </p>

      <div className="botones-tarjeta">
        <button className="btn btn-detalle">
          Ver detalle
        </button>
        <button className="btn btn-eliminar" onClick={() => eliminarProyecto(id)}>
          Eliminar
        </button>
      </div>
    </article>
  )
}

export default ProyectoCard