import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip
} from '@mui/material';

const ProyectoCard = ({ proyecto, eliminarProyecto, seleccionarProyecto }) => {

  const { título, categoría, estado, id } = proyecto;

  const confirmarEliminacion = () => {
    const confirmado = window.confirm(
      `¿Estás seguro de que deseas eliminar el proyecto "${título}"? Esta acción no se puede deshacer.`
    );

    if (confirmado) {
      eliminarProyecto(id);
    }
  };

  return (
    <Card className="card-proyecto">

      <CardContent>

        <Typography variant="h5" gutterBottom>
          {título}
        </Typography>

        <Typography variant="body1">
          <strong>Categoría:</strong> {categoría}
        </Typography>

        <Typography variant="body1">
          <strong>Estado:</strong>
        </Typography>

        <Chip
          label={estado}
          size="small"
        />

      </CardContent>

      <CardActions>

        <Button
          variant="outlined"
          onClick={() => seleccionarProyecto(proyecto)}
        >
          Ver detalle
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={confirmarEliminacion}
        >
          Eliminar
        </Button>

      </CardActions>

    </Card>
  );
};

export default ProyectoCard;