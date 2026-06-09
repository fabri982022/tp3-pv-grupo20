import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProyectoCard = ({ proyecto, eliminarProyecto, seleccionarProyecto }) => {

  const navigate = useNavigate();
  const { título, categoría, estado, id } = proyecto;

  const confirmarEliminacion = () => {
    const confirmado = window.confirm(
      `¿Estás seguro de que deseas eliminar el proyecto "${título}"? Esta acción no se puede deshacer.`
    );

    if (confirmado) {
      eliminarProyecto(id);
    }
  };

  const handleVerDetalle = () => {
    navigate(`/proyectos/${id}`);
  };

  return (
    <Card className="card-proyecto" sx={{height: "100%",display: "flex",flexDirection: "column",justifyContent: "space-between"}}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {título}
        </Typography>

        <Typography variant="body1">
          <strong>Categoría:</strong> {categoría}
        </Typography>

        <Typography variant="body1" component="div">
          <strong>Estado:</strong>
          <Chip label={estado} size="small" color={
              estado === "Completado"
                ? "success"
                : estado === "En Progreso"
                ? "warning"
                : "error"
            }
          sx={{ ml: 1 }}/>
        </Typography>
      </CardContent>

      <CardActions>
        <Button variant="contained" onClick={handleVerDetalle}>
          Ver detalle
        </Button>

        <Button variant="contained"color="error"onClick={confirmarEliminacion}>
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProyectoCard;