import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { UsuarioProvider } from './context/UsuarioContext';

function App() {
  return (
    <UsuarioProvider>
      <RouterProvider router={router} />
    </UsuarioProvider>
  );
}

export default App;