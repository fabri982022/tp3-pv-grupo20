const proyectoService = (() => {
  // Variable privada: arreglo de proyectos
  let proyectos = JSON.parse(localStorage.getItem('proyectos')) || [
    { id: 1, título: "Landing Page", categoría: "Web", estado: "Completado", disponible: true, descripcion: "Desarrollo de una página de aterrizaje (landing page) para promocionar un nuevo producto o servicio. El proyecto incluye la creación de un diseño atractivo y responsivo, optimización para motores de búsqueda (SEO) y la implementación de formularios de contacto para captar leads.\n\nLa landing page se construyó utilizando HTML5, CSS3 y JavaScript, con un enfoque en la experiencia del usuario (UX) para maximizar las conversiones. Se realizaron pruebas A/B para evaluar diferentes versiones del diseño y se implementaron mejoras basadas en los resultados obtenidos.",
      recursos: {
      pdf: "https://unju.edu.ar/landing-page.pdf",
      drive: "https://drive.google.com/unju-landing-page",
      github: "https://github.com/fi-unju/landing-page"}, 
      equipo: [
      { nombre: "Juan Pérez", rol: "Desarrollador Frontend" },
      { nombre: "Ana López", rol: "Diseñadora Gráfica" } ]  
    },
    
    { id: 2, título: "App Móvil", categoría: "Móvil", estado: "En Progreso" , disponible: true ,
      descripcion: "Este proyecto tiene como objetivo desarrollar una aplicación móvil interactiva orientada a optimizar la organización del tiempo. La propuesta busca complementar los métodos tradicionales incorporando recursos dinámicos y alertas en tiempo real.\n\nAdemás, la plataforma está diseñada para facilitar el seguimiento de metas personales, permitiendo a los usuarios monitorear su rendimiento diario y adaptar sus rutinas según sus necesidades específicas.",
      recursos: {
      pdf: "https://unju.edu.ar/informe1.pdf",
      drive: "https://drive.google.com/unju-proyecto1",
      github: "https://github.com/fi-unju/app-tareas"
      },equipo: [{ nombre: "María González", rol: "Líder de Proyecto" },{ nombre: "Fabricio Agustín Bazán", 
      rol: "Desarrollador Mobile" } ]
    },
    { id: 3, título: "API REST", categoría: "Backend", estado: "En Progreso", disponible: true,
      descripcion: "Desarrollo de una interfaz de programación de aplicaciones robusta y escalable bajo la arquitectura REST. Este proyecto busca centralizar los servicios de autenticación y lógica de negocio para abastecer de datos de forma eficiente a las plataformas web y móviles de la institución.\n\nLa API implementa medidas avanzadas de seguridad informática, cifrado de datos sensibles y optimización de consultas a la base de datos, garantizando una alta disponibilidad ante solicitudes masivas concurrentes.",
      recursos: {
      pdf: "https://unju.edu.ar/documentacion-api.pdf",
      drive: "https://drive.google.com/unju-api-rest",
      github: "https://github.com/fi-unju/api-rest-backend" }, 
      equipo: [
      { nombre: "Carlos Matías Tapia", rol: "Desarrollador Backend" },
      { nombre: "Juan Zambrano", rol: "Especialista en Seguridad" }]
    },
    { id: 4, título: "Dashboard", categoría: "Web", estado: "Pendiente", disponible: true,
      descripcion: "Panel de control administrativo interactivo orientado a la visualización de métricas académicas y estadísticas operativas en tiempo real. La interfaz ofrece gráficos dinámicos que facilitan la toma de decisiones estratégicas por parte del personal directivo.\n\nEl sistema contará con un diseño responsivo adaptable a cualquier dispositivo móvil y un módulo de reportes personalizables que permitirá exportar los datos analizados en formatos estándar como PDF y planillas de cálculo Excel.",
     recursos: {
      pdf: "https://unju.edu.ar/manual-dashboard.pdf",
      drive: "https://drive.google.com/unju-dashboard-ui",
      github: "https://github.com/fi-unju/dashboard-admin"},
      equipo: [
      { nombre: "Gisela Yanina Carlos", rol: "Diseñadora UX/UI" },
      { nombre: "Aldana Sabrina Poma", rol: "Desarrolladora Frontend" } ]
     },
    { id: 5, título: "Base de Datos", categoría: "Backend", estado: "Completado", disponible: true,
      descripcion: "Diseño e implementación de un sistema de gestión de bases de datos relacionales estructurado para soportar el almacenamiento masivo de información de la plataforma educativa. Incluye la creación de diagramas de entidad-relación y scripts de migración seguros.\n\nSe aplicaron técnicas avanzadas de normalización para evitar la redundancia de datos y se programaron procedimientos almacenados que automatizan las tareas críticas de respaldo, garantizando la integridad de los registros académicos.",
     recursos: {
      pdf: "https://unju.edu.ar/diccionario-datos.pdf",
      drive: "https://drive.google.com/unju-base-datos",
      github: "https://github.com/fi-unju/db-educativa"},
     equipo: [
      { nombre: "Fabricio Agustín Bazán", rol: "Administrador de BD (DBA)" },
      { nombre: "María Perez", rol: "Analista Funcional" } ]
    }
  ];

  // Funciones privadas 
  const obtenerNuevoId = () => Math.max(...proyectos.map(p => p.id), 0) + 1;

  // Objeto con funciones públicas a exportar
  return {
    // Retorna una copia del arreglo (no la referencia original)
    obtenerProyectos: () => [...proyectos],

    // Agrega un nuevo proyecto al arreglo 
    // Se guarda el cambio en localStorage para que persista al recargar la pagina.
    agregarProyecto: (proyecto) => {
      proyectos.push({
        id: obtenerNuevoId(),
        ...proyecto
      });
      localStorage.setItem('proyectos', JSON.stringify(proyectos))
    },

    // Actualiza un proyecto por id
    actualizarProyecto: (id, datos) => {
      proyectos = proyectos.map(p => 
        p.id === id ? { ...p, ...datos } : p
      );
    },



// "Elimina" (Oculta) un proyecto cambiando su bandera "disponible" a false.
// Solo se muestraran los proyectos con disponible: true.
// Se guarda el cambio en localStorage para lograr que persista al recargar la pagina.
    eliminarProyecto: (id) => {
  proyectos = proyectos.map(p =>
    p.id === id
      ? { ...p, disponible: false }
      : p
  );
  localStorage.setItem('proyectos', JSON.stringify(proyectos))
},
    // Busca proyectos por título (búsqueda case-insensitive)
    buscarProyecto: (texto) => 
      proyectos.filter(p => 
        p.título.toLowerCase().includes(texto.toLowerCase())
      ),

    // Obtiene un proyecto específico por su ID
    obtenerProyectoPorId: (id) => 
      proyectos.find(p => p.id === parseInt(id))
  };
})();

// Exportar para usarlo en otros módulos
export default proyectoService;