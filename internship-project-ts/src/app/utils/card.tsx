import { Delete, Edit } from "@mui/icons-material";
import {
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
interface Data {
  id: number;
  name: string;
  code: string;
  clientPartner: {
    fullName: string;
  };
  projectStatus: {
    name: string;
  };
  version: number;
  progressSelect: number;
  priority: {
    name: string;
  };
}
const projectCard = (
  project: Data,
  handleClickOpen: (
    id: number,
    version: number,
    name: string,
    setData: any
  ) => void,
  setData: any
) => {
  return (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          #{project?.id}
        </Typography>
        <Typography variant="h5" component="div">
          {project?.name || "-"}
        </Typography>
        <Typography color="text.secondary">{project?.code || "-"}</Typography>
        <Typography>
          Parent- <b>{project?.clientPartner?.fullName || "-"}</b>
        </Typography>
        <Typography>Progess - {project?.projectStatus?.name}</Typography>
      </CardContent>
      <CardActions>
        <Link to={`${project?.id}`}>
          <IconButton color="success">
            <Edit />
          </IconButton>
        </Link>
        <IconButton
          onClick={() =>
            handleClickOpen(project.id, project.version, project.name, setData)
          }
          color="error"
        >
          <Delete />
        </IconButton>
      </CardActions>
    </>
  );
};

const taskCard = (
  task: Data,
  handleClickOpen: (
    id: number,
    version: number,
    name: string,
    setData: any
  ) => void,
  setData: any
) => {
  return (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          #{task?.id}
        </Typography>
        <Typography variant="h5" component="div">
          {task?.name || "-"}
        </Typography>
        <Container sx={{ mb: 1.5, width: "30%" }} color="text.secondary">
          <div
            className="progress"
            role="progressbar"
            aria-label="Animated striped example"
            aria-valuenow={task?.progressSelect}
            aria-valuemin={task?.progressSelect}
            aria-valuemax={task?.progressSelect}
          >
            <div
              className={
                task.progressSelect <= 30
                  ? "progress-bar progress-bar-striped progress-bar-animated bg-danger"
                  : task.progressSelect > 30 && task.progressSelect <= 50
                  ? "progress-bar progress-bar-striped progress-bar-animated bg-warning"
                  : task.progressSelect > 50 && task.progressSelect <= 80
                  ? "progress-bar progress-bar-striped progress-bar-animated bg-info"
                  : "progress-bar progress-bar-striped progress-bar-animated bg-success"
              }
              style={{ width: `${task?.progressSelect || "0"}% ` }}
            ></div>
            {task?.progressSelect || "0"}%
          </div>
        </Container>
        <Typography>
          Priority- <b>{task?.priority?.name || "-"}</b>
        </Typography>
        <Typography variant="body2">{task?.projectStatus?.name}</Typography>
      </CardContent>
      <CardActions>
        <Link to={`${task.id}`}>
          <IconButton color="success">
            <Edit />
          </IconButton>
        </Link>
        <IconButton
          onClick={() =>
            handleClickOpen(task.id, task.version, task.name, setData)
          }
          color="error"
        >
          <Delete />
        </IconButton>
      </CardActions>
    </>
  );
};

export { projectCard, taskCard };
