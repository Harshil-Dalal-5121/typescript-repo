import React, { useState } from "react";
import { Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";
interface ToolbarProps {
  setView: React.Dispatch<React.SetStateAction<any>>;
  View: any;
  setPage: React.Dispatch<React.SetStateAction<any>>;
}
const Toolbar: React.FC<ToolbarProps> = ({ setView, View, setPage }) => {
  const [card, setCard] = useState(false);
  const handleViewChange = (type: string, bool: boolean) => {
    setPage(1);
    setView(View[type]);
    setCard(bool);
  };
  return (
    <>
      <Button
        variant={card ? "outlined" : "contained"}
        sx={{ marginRight: 2 }}
        onClick={() => handleViewChange("table", false)}
        endIcon={<ViewListIcon />}
        color="secondary"
      >
        Table
      </Button>
      <Button
        variant={card ? "contained" : "outlined"}
        color="warning"
        onClick={() => handleViewChange("card", true)}
        endIcon={<DashboardIcon />}
      >
        Card
      </Button>
    </>
  );
};
interface ListProps {
  ViewComponent: any;
  view: string;
  setData: (data: any) => void;
  data: any;
  loading: boolean;
  setTotal: (total: number) => void;
  page: number;
  limit: number;
  setPage: (page: number) => void;
  total: number;
  api: any;
}
const List: React.FC<ListProps> = ({
  ViewComponent,
  view,
  setData,
  data,
  loading,
  setTotal,
  page,
  limit,
  setPage,
  total,
  api,
}) => {
  const ListComponent = ViewComponent[view];
  return (
    <ListComponent
      data={data}
      loading={loading}
      total={total}
      setTotal={setTotal}
      page={page}
      api={api}
      setData={setData}
      limit={limit}
      setPage={setPage}
    />
  );
};
export { Toolbar, List };
