import * as React from "react";
import { Grid, Card, Container, CircularProgress } from "@mui/material";
import PaginationComponent from "../components/Pagination";
import styles from "./Card.module.css";
import DialogBox from "../components/Dialog";
import { LIMIT } from "../utils/constants";

interface Item {
  id: string;
  version: string;
  name: string;
  // add other properties here
}
interface CardListProps {
  data: Item[];
  setData: React.Dispatch<React.SetStateAction<Item[]>>;
  page: number;
  card: (
    item: any,
    handleClickOpen: any,
    setData: React.Dispatch<React.SetStateAction<any>>,
    i: number
  ) => JSX.Element;
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
}
export default function CardList({
  data,
  setData,
  page,
  card,
  api,
  limit,
  setPage,
  loading,
  total,
  setTotal,
}: CardListProps) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const [open, setOpen] = React.useState(false);
  const [deleteData, setDeleteData] = React.useState({
    id: "",
    version: "",
    name: "",
    setData: (data: any) => {},
  });
  const handleDeleteData = async () => {
    const { name, id, version, setData } = deleteData;
    const response = await api.delete({ id, version, name });
    if (response) {
      const response = await api.find({
        search: "",
        offset: (page - 1) * LIMIT,
      });
      setData(response?.data);
      setTotal(response?.total);
      if (response?.total % 6 === 0) {
        page === 1 ? setPage(1) : setPage(page - 1);
      }
    }
    setOpen(false);
  };
  const handleClickOpen = (
    id: string,
    version: string,
    name: string,
    setData: (data: any) => void
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
  const handleDelete = () => {
    handleDeleteData();
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      {!loading ? (
        <div className={styles?.container}>
          {data ? (
            <Grid container spacing={2}>
              {data?.map((item: any, i: number) => {
                return (
                  <Grid item xs={12} sm={4} key={i}>
                    <Card variant="outlined" className="card" key={i}>
                      {card(item, handleClickOpen, setData, i)}
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <div className={styles?.container}>
              <p style={{ fontSize: 24 }}>No Records!</p>
            </div>
          )}
        </div>
      ) : (
        <Container className={styles["loading-container"]}>
          <CircularProgress />
        </Container>
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
        onClick={handleDelete}
      />
    </>
  );
}
