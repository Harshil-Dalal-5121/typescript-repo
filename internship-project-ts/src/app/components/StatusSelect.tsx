import React, { useState, ChangeEvent } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface Status {
  id: number;
  name: string;
  version: number;
}

interface StatusSelectProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  property: string;
  status: Status[];
  defaultValue: string;
  value: string;
}
const StatusSelect: React.FC<StatusSelectProps> = ({
  data,
  setData,
  property,
  status,
  defaultValue,
}) => {
  const [radioValue, setRadioValue] = useState<string>("");
  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRadioValue(value);
    const selectedObject = status.find((s) => s.name === value);
    setData({
      ...data,
      [property]: {
        id: selectedObject?.id,
        name: selectedObject?.name,
        version: 0,
      },
    });
  };
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        name="project-status"
        defaultValue={defaultValue}
        value={defaultValue || radioValue}
        onChange={handleStatusChange}
      >
        {status.map((s, i) => {
          return (
            <FormControlLabel
              key={i}
              value={s?.name || ""}
              control={<Radio />}
              label={s.name}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
export default StatusSelect;
