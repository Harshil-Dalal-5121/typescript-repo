import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import NavBar from "../../components/Navbar";
import { List } from "../../components/ListComponent";
import CardList from "../../components/Card";
import DataTable from "../../components/DataTable";
import { useDebounce } from "../../services/custom-hooks/useDebounce";
import api from "./api";
import { taskCard } from "../../utils/card";
import { TaskTableContent } from "../../utils/table";
import { useTranslation } from "../../services/translate";
import { LIMIT, TASK_TABLE_FIELDS } from "../../utils/constants";
const View = {
  table: "table",
  card: "card",
};
const TaskCard = (props: any) => {
  return <CardList card={taskCard} {...props} />;
};
const TaskTable = (props: any) => {
  return (
    <DataTable
      fields={TASK_TABLE_FIELDS}
      tableContent={TaskTableContent}
      {...props}
    />
  );
};
const ViewComponent: any = {
  table: TaskTable,
  card: TaskCard,
};
export function Tasks() {
  const [view, setView] = useState<string>(View.table);
  const [tasks, setTasks] = useState<any>("");
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page") || 1)
  );
  const { t } = useTranslation();
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };
  const debouncedChangeSearch = useDebounce(handleChangeSearch);
  const handleFetch = useCallback(
    async ({ offset, search }: { offset: number; search: string }) => {
      const response = await api.find({ offset, search });
      setTasks(response?.data);
      setTotal(response?.total);
    },
    []
  );
  useEffect(() => {
    setLoading(true);
    handleFetch({
      search,
      offset: (page - 1) * LIMIT,
    }).finally(() => {
      setLoading(false);
    });
  }, [page, search, handleFetch]);
  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page, setSearchParams, total]);
  return (
    <>
      <Grid>
        <Grid item xs={12}>
          <legend>
            <Typography
              variant={"h3"}
              style={{ margin: "0 auto ", textAlign: "center" }}
            >
              {t("Tasks")}
            </Typography>
          </legend>
        </Grid>
        <Grid item xs={12}>
          <NavBar
            title="Task"
            path="/tasks/new"
            View={View}
            setView={setView}
            setPage={setPage}
            setSearch={setSearch}
            handleChange={debouncedChangeSearch}
          />
        </Grid>
        <Grid item xs={12}>
          <List
            ViewComponent={ViewComponent}
            view={view}
            data={tasks}
            loading={loading}
            total={total}
            page={page}
            limit={LIMIT}
            api={api}
            setTotal={setTotal}
            setData={setTasks}
            setPage={setPage}
          />
        </Grid>
      </Grid>
    </>
  );
}
export default Tasks;
