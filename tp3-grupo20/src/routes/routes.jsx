import { createBrowserRouter, Outlet } from 'react-router-dom';
import Dashboard from '../views/Dashboard';
import ListaProyectos from '../views/ListaProyectos';
import DetalleProyecto from '../views/DetalleProyecto'; 
import PerfilUsuario from '../views/PerfilUsuario';
import PaginaError from '../views/PaginaError';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

// Disposicion BASE
const Layout = () => {
  return (
    <>
      <Nav />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

// Variable con las rutas
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <PaginaError />, // Pagina de error
    children: [
      {
        index: true, // Carga por defecto
        element: <Dashboard />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "proyectos",
        element: <ListaProyectos />
      },
      {
        path: "proyectos/:id",
        element: <DetalleProyecto />
      },
      {
        path: "perfil",
        element: <PerfilUsuario />
      }
    ]
  }
]);
