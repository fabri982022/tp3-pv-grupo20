# Gestión de Proyectos Educativos - React

## Descripción

Migración de la plataforma de "Gestión de Proyectos Educativos" desde HTML/CSS a React. Este proyecto representa la evolución de una aplicación web tradicional hacia una aplicación moderna utilizando React con Vite como herramienta de construcción.

## Objetivos

- Introducción al desarrollo de aplicaciones web con React
- Comprensión de conceptos clave: componentes, estado y hooks
- Implementación de una estructura modular y reutilizable
- Gestión de estado con `useState`
- Desarrollo de servicios puros sin dependencias de React

## Características

✨ **Funcionalidades principales:**

- ✅ Agregar nuevos proyectos
- ✅ Visualizar lista de proyectos
- ✅ Eliminar proyectos de la lista
- ✅ Buscar proyectos en tiempo real
- ✅ Interfaz responsive y moderna

## Requisitos Técnicos

### Stack Tecnológico

- **React 18+** - Librería de interfaz de usuario
- **Vite** - Herramienta de construcción y desarrollo
- **JavaScript (ES6+)** - Lenguaje de programación
- **CSS3** - Estilos
- **Node.js** - Entorno de ejecución

## Estructura del Proyecto

```
src/
├── components/
│   ├── Header.jsx          # Componente del encabezado
│   ├── Nav.jsx             # Componente de navegación
│   ├── ListaProyectos.jsx  # Componente principal de lista de proyectos
│   └── Footer.jsx          # Componente del pie de página
├── services/
│   └── proyectoService.js  # Lógica de negocio y gestión de proyectos
├── css/
│   └── [archivos de estilos]
├── App.jsx                 # Componente raíz
└── main.jsx               # Punto de entrada
```

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/pv_tp3_grupo20.git
cd pv_tp3_grupo20
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Uso

### Agregar un Proyecto

- Completar el formulario con los datos del proyecto (título, categoría, estado)
- Hacer clic en el botón "Agregar Proyecto"
- El proyecto se añade inmediatamente a la lista

### Eliminar un Proyecto

- Hacer clic en el botón "Eliminar" en la tarjeta del proyecto
- El proyecto se elimina de la lista instantáneamente

### Buscar un Proyecto

- Utilizar el campo de búsqueda
- La lista se filtra en tiempo real mientras se escribe
- El filtrado es sensible al texto ingresado

## Arquitectura

### Servicio de Proyectos (`proyectoService.js`)

Implementa un patrón IIFE (Immediately Invoked Function Expression) que expone una API pública con las siguientes funciones:

- `obtenerProyectos()` - Retorna una copia del arreglo de proyectos
- `agregarProyecto(proyecto)` - Añade un nuevo proyecto
- `eliminarProyecto(id)` - Elimina un proyecto por ID
- `buscarProyecto(texto)` - Busca proyectos por título

### Componentes React

**Layout Components:**
- `Header` - Encabezado estático del sitio
- `Nav` - Barra de navegación (sin enrutamiento en esta etapa)
- `Footer` - Pie de página

**Feature Components:**
- `ListaProyectos` - Gestiona el estado de proyectos e integra el servicio
- Tarjetas de proyectos renderizadas dinámicamente

## Hooks Utilizados

- **useState** - Para gestionar el estado de proyectos y búsqueda

## Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run preview  # Visualiza la construcción de producción localmente
```

## Información del Repositorio

- **Repositorio:** `pv_tp3_grupo20`
- **Plataforma:** GitHub
- **Rama principal:** main

## Integrantes del Grupo

| Nombre | LU | Usuario GitHub |
|--------|----|----|
| Bazan, Fabricio Agustín | 5291 | [fabri982022](https://github.com/fabri982022) |
| Carlos, Gisella Yanina | 5541 | [gisela1234](https://github.com/gisela1234) |
| Tapia, Carlos Matias | 6492 | [cmatiastapia](https://github.com/cmatiastapia) |
| Poma, Aldana Sabrina | 6126 | [pomasabrina](https://github.com/pomasabrina) |

## Notas Importantes

- La navegación permanecerá inactiva en esta etapa (sin enrutamiento)
- Los enlaces del Nav apuntan a `#` o `/`
- El contenido principal se centra en la lista de proyectos
- El proyecto utiliza componentes funcionales con hooks

## Licencia

Este proyecto es parte de la asignatura de Programación Visual (2026) - Grupo 20.
