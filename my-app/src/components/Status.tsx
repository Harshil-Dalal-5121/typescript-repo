import React from "react";
import Heading from "./Heading";

interface StatusProps {
  status: string;
}

const Status = ({ status }: StatusProps) => {
  let messege;
  status === "loading"
    ? (messege = "Loading ...")
    : status === "success"
    ? (messege = "Data Fetched Successfully")
    : (messege = "Error Fetching Data");
  return (
    <div>
      <Heading style={{ color: "blue" }}>{messege}</Heading>
    </div>
  );
};

export default Status;
