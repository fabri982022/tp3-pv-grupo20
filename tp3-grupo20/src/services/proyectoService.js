const proyectoService = (() => {
  // Variable privada: arreglo de proyectos
  let proyectos = [
    { id: 1, título: "Landing Page", categoría: "Web", estado: "Completado", visibilidad: "Disponible" },
    { id: 2, título: "App Móvil", categoría: "Móvil", estado: "En Progreso" , visibilidad: "Disponible" },
    { id: 3, título: "API REST", categoría: "Backend", estado: "En Progreso", visibilidad: "Disponible" },
    { id: 4, título: "Dashboard", categoría: "Web", estado: "Pendiente", visibilidad: "Disponible" },
    { id: 5, título: "Base de Datos", categoría: "Backend", estado: "Completado", visibilidad: "Disponible"}
  ];

  // Funciones privadas 
  const obtenerNuevoId = () => Math.max(...proyectos.map(p => p.id), 0) + 1;

  // Objeto con funciones públicas a exportar
  return {
    // Retorna una copia del arreglo (no la referencia original)
    obtenerProyectos: () => [...proyectos],

    // Agrega un nuevo proyecto al arreglo
    agregarProyecto: (proyecto) => {
      proyectos.push({
        id: obtenerNuevoId(),
        ...proyecto
      });
    },

    // Actualiza un proyecto por id
    actualizarProyecto: (id, datos) => {
      proyectos = proyectos.map(p => 
        p.id === id ? { ...p, ...datos } : p
      );
    },

    // "Elimina" (Oculta) un proyecto segun visibilidad
    eliminarProyecto: (id) => {
    proyectos = proyectos.map(p =>
    p.id === id
      ? { ...p, visibilidad: "No disponible" }
      : p
  );
},
    // Busca proyectos por título (búsqueda case-insensitive)
    buscarProyecto: (texto) => 
      proyectos.filter(p => 
        p.título.toLowerCase().includes(texto.toLowerCase())
      )
  };
})();

// Exportar para usarlo en otros módulos
export default proyectoService;