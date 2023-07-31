import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Toolbar } from "./ListComponent";
import { Button, Grid, TextField } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import styles from "./Navbar.module.css";
interface NavBarProps {
  title: string;
  View: {
    table: string;
    card: string;
  };
  setView: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  path: string;
}
const NavBar: React.FC<NavBarProps> = ({
  title,
  View,
  setView,
  setPage,
  setSearch,
  handleChange,
  path,
}) => {
  const navigate = useNavigate();
  const [_search, _setSearch] = useState("");
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    _setSearch(e.target.value);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(_search);
    }
  };
  const handleSearchClick = () => {
    setSearch(_search);
  };
  return (
    <Grid container className={styles["grid-container"]}>
      <Grid item md={4} xs={12} className={styles["grid-item-new"]}>
        <Button
          variant="contained"
          color="info"
          startIcon={<Add />}
          onClick={() => navigate(`${path}`)}
          className="grid-btn m1"
        >
          Create {title}
        </Button>
      </Grid>
      <Grid item md={4} xs={12} className={styles["grid-item-view"]}>
        <Toolbar setView={setView} View={View} setPage={setPage} />
      </Grid>
      <Grid item md={4} xs={12} className={styles["grid-item-search"]}>
        <div className={styles["grid-container-search"]}>
          <TextField
            className={styles["m1"]}
            id="search"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
              handleChangeSearch(e);
            }}
            name="search"
            label={`Search ${title}`}
            variant="outlined"
            onKeyPress={handleKeyPress}
          />
          <Search
            onClick={handleSearchClick}
            className={styles["btn-search"]}
            color="success"
          />
        </div>
      </Grid>
    </Grid>
  );
};
export default NavBar;
