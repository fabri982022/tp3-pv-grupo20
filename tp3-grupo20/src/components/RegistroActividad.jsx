import { Alert } from '@mui/material';

const RegistroActividad = ({ mensaje }) => {
  return (
    <Alert severity="info">
      {mensaje}
    </Alert>
  );
};

export default RegistroActividad;