import Typography from "@mui/material/Typography";
import { List } from "../../components/ListComponent";
import { useTranslation } from "../../services/translate";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "../../components/Navbar";
import { useDebounce } from "../../services/custom-hooks/useDebounce";
import api from "./api";
import { projectCard } from "./../../utils/card";
import CardList from "../../components/Card";
import { Grid } from "@mui/material";
import DataTable from "../../components/DataTable";
import { LIMIT, TABLE_FIELDS } from "../../utils/constants";
import { ProjectTableContent } from "../../utils/table";
const View = {
  table: "table",
  card: "card",
};
const ProjectCard = (props: any) => {
  return <CardList card={projectCard} {...props} />;
};
const ProjectTable = (props: any) => {
  return (
    <DataTable
      fields={TABLE_FIELDS}
      tableContent={ProjectTableContent}
      {...props}
    />
  );
};
const ViewComponent: any = {
  table: ProjectTable,
  card: ProjectCard,
};
export function Projects() {
  const [view, setView] = useState(View.table);
  const [projects, setProjects] = useState<any>("");
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
  const handleFetch = useCallback(
    async ({ offset, search }: { offset: number; search: string }) => {
      const response = await api.find({ offset, search });
      setProjects(response?.data);
      setTotal(response?.total);
    },
    []
  );
  const debouncedChangeSearch = useDebounce(handleChangeSearch);
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
              {t("Projects")}
            </Typography>
          </legend>
        </Grid>
        <Grid item xs={12}>
          <NavBar
            title="Project"
            View={View}
            path="/projects/new"
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
            data={projects}
            loading={loading}
            total={total}
            setTotal={setTotal}
            api={api}
            page={page}
            limit={LIMIT}
            setData={setProjects}
            setPage={setPage}
          />
        </Grid>
      </Grid>
    </>
  );
}
export default Projects;
