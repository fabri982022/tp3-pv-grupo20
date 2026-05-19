import {useState} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ListaProyectos from './components/ListaProyectos'
import DetalleProyecto from './components/DetalleProyecto'

function App() {
  
 /* Creamos un estado centralizado en el padre llamado 'proyectoSeleccionado'. 
  Arranca en 'null' porque al abrir la página todavía el usuario no hizo clic en ningún proyecto.*/
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  return (
    <>
      <Header />
      
      <ListaProyectos />

      <Footer />
    </>
  )
}
export default App
