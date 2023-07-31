import React, { useState } from "react";
import {
  CircularProgress,
  Table,
  TableContainer,
  TableHead,
} from "@mui/material";
import { Container } from "@mui/system";
import DialogBox from "./Dialog";
import PaginationComponent from "./Pagination";
import { StyledTableCell, StyledTableRow } from "./StyledTableComponents";
import styles from "./DataTable.module.css";
import { LIMIT } from "../utils/constants";
interface DataTableProps {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any>>;
  page: number;
  fields: any;
  api: {
    find: (params: { search: string; offset: number }) => Promise<any>;
    delete: (params: {
      id: number | string;
      name: string;
      version: string;
    }) => Promise<any>;
  };
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<any>>;
  tableContent: any;
}
const DataTable: React.FC<DataTableProps> = ({
  data,
  setData,
  page,
  fields,
  api,
  limit,
  setPage,
  setTotal,
  loading,
  total,
  tableContent,
}) => {
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({
    id: "",
    version: "",
    name: "",
    setData: "",
  });
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleDeleteData = async () => {
    const { name, id, version } = deleteData;
    const response = await api.delete({ id, version, name });
    if (response) {
      const response = await api.find({
        search: "",
        offset: (page - 1) * LIMIT,
      });
      setData(response?.data);
      setTotal(response?.total);
      if (response?.total % 6 === 0) {
        setPage(page === 1 ? 1 : page - 1);
      }
    }
    setOpen(false);
  };
  const handleClickOpen = (
    id: string,
    version: string,
    name: string,
    setData: any
  ) => {
    setDeleteData({
      ...deleteData,
      id: id,
      version: version,
      name: name,
      setData: setData,
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      {loading ? (
        <Container className={styles["loading-container"]}>
          <CircularProgress />
        </Container>
      ) : (
        <TableContainer className={styles["table-container"]}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">Id</StyledTableCell>
                {fields?.map((field: any, i: number) => (
                  <StyledTableCell
                    key={i}
                    align="center"
                    style={{ textTransform: "capitalize" }}
                  >
                    {field}
                  </StyledTableCell>
                ))}
                <StyledTableCell align="center" colSpan={2}>
                  Operations
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            {tableContent(data, setData, handleClickOpen)}
          </Table>
        </TableContainer>
      )}
      <PaginationComponent
        total={total || 0}
        limit={limit}
        page={page}
        handleChange={handleChange}
      />
      <DialogBox
        type="Delete"
        open={open}
        handleCancel={handleCancel}
        handleClose={handleClose}
        onClick={handleDeleteData}
      />
    </>
  );
};
export default DataTable;
