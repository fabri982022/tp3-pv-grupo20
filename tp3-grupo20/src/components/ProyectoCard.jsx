const ProyectoCard = ({ proyecto, eliminarProyecto, seleccionarProyecto}) => {
  // Desestructuración del objeto proyecto
  const { título, categoría, estado, id } = proyecto;

  // Manejador de eliminar con confirmación
  const confirmarEliminacion = () => {
    const confirmado = window.confirm(
      `¿Estás seguro de que deseas eliminar el proyecto "${título}"? Esta acción no se puede deshacer.`
    );
    
    if (confirmado) {
      eliminarProyecto(id);
    }
  };

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
        <button className="btn btn-detalle"  title="Ver más información del proyecto" onClick={() => seleccionarProyecto(proyecto)}>
          Ver detalle
        </button>
        <button className="btn btn-eliminar" onClick={confirmarEliminacion} title="Eliminar este proyecto">
          Eliminar
        </button>
      </div>
    </article>
  )
}
export default ProyectoCard