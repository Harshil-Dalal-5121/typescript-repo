import React from "react";
import { Grid, Pagination } from "@mui/material";

import styles from "./Pagination.module.css";

interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationComponent = ({
  total,
  limit,
  page,
  handleChange,
}: PaginationProps) => {
  return (
    <>
      <div>
        <Grid container spacing={2} className={styles["pagination-grid"]}>
          <Grid item xs={12} sm={4} className={styles.pagination}>
            Total Items: {total}
          </Grid>
          <Grid item xs={12} sm={4} className={styles.pagination}>
            <Pagination
              variant="outlined"
              count={Math.ceil(total / limit)}
              page={page}
              boundaryCount={0}
              siblingCount={0}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4} className={styles.pagination}>
            Page: {page}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default PaginationComponent;
