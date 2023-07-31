import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";

import PaginationComponent from "../../../components/Pagination";
import api from "../../tasks/api";
import styles from "./ProjectTaskTable.module.css";
import { getDate } from "../../../utils/helperFunctions";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/StyledTableComponents";

const LIMIT = 3;
interface Task {
  name: string;
  taskDate: Date;
  assignedTo: {
    fullName: string;
  };
  progressSelect: number;
}
interface ProjectTaskTableProps {
  id: number;
}
const ProjectTaskTable: React.FC<ProjectTaskTableProps> = ({ id }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const getTasks = useCallback(
    async ({
      id,
      offset,
      limit,
    }: {
      id: number;
      offset: number;
      limit: number;
    }) => {
      const response = await api.fetchTasks({ id, offset, limit });
      setTasks(response?.data?.data);
      setTotal(response?.data?.total);
    },
    []
  );
  useEffect(() => {
    setLoading(true);
    getTasks({ id, offset: (page - 1) * LIMIT, limit: LIMIT }).finally(() => {
      setLoading(false);
    });
  }, [getTasks, id, page]);
  return (
    <>
      {loading ? (
        <Container className={styles["loading-container"]}>
          <CircularProgress className={styles["loading"]} />
        </Container>
      ) : (
        <>
          <Box>
            <TableContainer
              sx={{
                ...styles["table-container"],
                height: "23vh",
                overflow: "auto",
              }}
              component={Paper}
            >
              <Table
                sx={styles["table-container"]}
                aria-label="customized table"
              >
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Project</StyledTableCell>
                    <StyledTableCell>Start Date</StyledTableCell>
                    <StyledTableCell>Assigned To</StyledTableCell>
                    <StyledTableCell>Progress</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                {tasks.length > 0 ? (
                  <TableBody>
                    {tasks?.map((task, i) => {
                      return (
                        <StyledTableRow key={i}>
                          <StyledTableCell>{task?.name}</StyledTableCell>
                          <StyledTableCell>
                            {" "}
                            {!task?.taskDate ? "-" : getDate(task?.taskDate)}
                          </StyledTableCell>
                          <StyledTableCell>
                            {task?.assignedTo?.fullName}
                          </StyledTableCell>
                          <StyledTableCell>
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
                                  task?.progressSelect <= 30
                                    ? "progress-bar progress-bar-striped progress-bar-animated bg-danger"
                                    : task?.progressSelect > 30 &&
                                      task?.progressSelect <= 50
                                    ? "progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                    : task?.progressSelect > 50 &&
                                      task?.progressSelect <= 80
                                    ? "progress-bar progress-bar-striped progress-bar-animated bg-info"
                                    : "progress-bar progress-bar-striped progress-bar-animated bg-success"
                                }
                                style={{
                                  width: `${task?.progressSelect || "0"}% `,
                                }}
                              ></div>
                              {task?.progressSelect || "0"}%
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                ) : (
                  <TableFooter>
                    <TableRow>
                      <TableCell>No Records</TableCell>
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            </TableContainer>
            <PaginationComponent
              total={total}
              limit={LIMIT}
              page={page}
              handleChange={handleChange}
            />
          </Box>
        </>
      )}
    </>
  );
};
export default ProjectTaskTable;
