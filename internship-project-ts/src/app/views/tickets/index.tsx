import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { List } from "../../components/ListComponent";
import { useTranslation } from "../../services/translate";
import { useDebounce } from "../../services/custom-hooks/useDebounce";
import api from "./api";
import { taskCard } from "../../utils/card";
import CardList from "../../components/Card";
import { Grid } from "@mui/material";
import { LIMIT, TICKET_TABLE_FIELDS } from "../../utils/constants";
import DataTable from "../../components/DataTable";
import { TicketTableContent } from "../../utils/table";
import NavBar from "../../components/Navbar";
const View = {
  table: "table",
  card: "card",
};
const TicketCard = (props: any) => {
  return <CardList card={taskCard} fetchApi={api.delete} {...props} />;
};
const TicketTable = (props: any) => {
  return (
    <DataTable
      fields={TICKET_TABLE_FIELDS}
      tableContent={TicketTableContent}
      {...props}
    />
  );
};
const ViewComponent: any = {
  table: TicketTable,
  card: TicketCard,
};
export default function Tickets() {
  const [view, setView] = useState(View.table);
  const [tickets, setTickets] = useState<any>("");
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
  const handleFetch = useCallback(async ({ offset, search }: any) => {
    const response = await api.find({ offset, search });
    setTickets(response?.data);
    setTotal(response?.total);
  }, []);
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
          {" "}
          <legend>
            <Typography
              variant={"h3"}
              style={{ margin: "0 auto ", textAlign: "center" }}
            >
              {t("Tickets")}
            </Typography>
          </legend>
        </Grid>
        <Grid item xs={12}>
          {" "}
          <NavBar
            title="Ticket"
            path="/tickets/new"
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
            data={tickets}
            setTotal={setTotal}
            api={api}
            loading={loading}
            total={total}
            page={page}
            limit={LIMIT}
            setData={setTickets}
            setPage={setPage}
          />
        </Grid>
      </Grid>
    </>
  );
}
