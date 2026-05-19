import React from 'react';
/*  Este es un 'Componente de Presentación'. No maneja estados propios (useState). 
  Recibe toda la información del exterior a través de una "Prop" llamada 'proyectoSeleccionado'.
*/
export default function DetalleProyecto({ proyecto }) {
/*Antes de dibujar nada, verificamos si 'proyectoSeleccionado' existe. 
 Si el padre no le mandó ningún proyecto todavía, mostramos un cartel amigable 
 para evitar que la aplicación tire un error de "pantalla en blanco".
 */
  if (!proyecto) {
    return (
      <div className="detalle-vacio">
        <p>Por favor, seleccione un proyecto en el explorador para ver su detalle.</p>
      </div>
    );
  }

/*(DESESTRUCTURACIÓN): extraemos las propiedades del objeto  'proyectoSeleccionado'. 
 Así creamos variables sueltas (título, categoría, recursos, equipo)  y evitamos 
 escribir "proyectoSeleccionado.título" a cada rato.
*/
  const { título, categoría, estado, descripcion, recursos, equipo } = proyecto;

/* RETORNO DEL JSX: Aquí se dibuja toda la interfaz del detalle del proyecto.
 Se divide en secciones claramente marcadas (Descripción, Recursos, Equipo) 
 para organizar la información de forma legible y visualmente atractiva.*/
return ( 
    <article className="detalle-proyecto-container">
     { /* Cabecera del Detalle */}
      <header className="detalle-header">
        <h1>{título}</h1>
        <p className="detalle-meta">
          <strong>Categoría:</strong> {categoría} | <strong>Estado:</strong> {estado}
        </p>
      </header>

{/* Sección 1: Descripción Extendida (los dos párrafos) */}
      <section className="detalle-descripcion">
        <h2>Descripción del Proyecto</h2>
    {/*usamos el método '.split('\n\n')'.Esto corta el texto largo del servicio cada vez que 
    encuentra un doble salto de línea  y genera un párrafo independiente por cada bloque de texto de forma dinámica.*/}
        {descripcion.split('\n\n').map((parrafo, index) => (
          <p key={index} className="parrafo-descripcion">{parrafo}</p>
        ))}
      </section>

{/* Sección 2: Recursos (PDF, Drive, GitHub) */}
      <section className="detalle-recursos">
        <h2>Recursos Disponibles</h2>
        <ul>
          {/*Accedemos al objeto desestructurado 'recursos' e inyectamos las rutas 
            directamente en el atributo 'href' de las etiquetas de enlace 'a'*/}
          <li>
            <a href={recursos.pdf} target="_blank" rel="noopener noreferrer">📄 Ver Documento PDF</a>
          </li>
          <li>
            <a href={recursos.drive} target="_blank" rel="noopener noreferrer">📁 Carpeta de Google Drive</a>
          </li>
          <li>
            <a href={recursos.github} target="_blank" rel="noopener noreferrer">💻 Repositorio de GitHub</a>
          </li>
        </ul>
      </section>

      {/* Sección 3: Integrantes del Equipo (Nombres y Roles) */}
      <section className="detalle-equipo">
        <h2>Equipo de Trabajo</h2>
        <div className="equipo-grid">
          {/* (BUCLE .MAP):
            Como el equipo es un arreglo de objetos, usamos '.map()' para recorrerlo.
           Por cada integrante, React dibuja automáticamente un bloque con su nombre y su rol.
          */}
          {equipo.map((integrante, index) => (
            <div key={index} className="miembro-equipo-card">
              <h3>{integrante.nombre}</h3>
              <p><strong>Rol:</strong> {integrante.rol}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );

}