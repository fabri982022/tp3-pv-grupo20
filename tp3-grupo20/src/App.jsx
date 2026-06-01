import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Dashboard from './components/Dashboard'
import ListaProyectos from './components/ListaProyectos'
import DetalleProyecto from './components/DetalleProyecto'
import PerfilUsuario from './components/PerfilUsuario'

function App() {
  return (
    <Router>
      <Header />
      <Nav />
      
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/proyectos" element={<ListaProyectos />} />
          <Route path="/proyectos/:id" element={<DetalleProyecto />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  )
}

export default App
