import { Slider } from "@mui/material";
import React from "react";
interface ProgressBarProps {
  name: string;
  value: number;
  step: number;
  onChange: (e: React.ChangeEvent<unknown>) => void;
}

const ProgressBar = ({ name, value, step, onChange }: ProgressBarProps) => {
  return (
    <>
      <Slider
        value={value || 0}
        name={`${name}`}
        onChange={(e) => onChange}
        defaultValue={0}
        valueLabelDisplay="auto"
        step={step}
        color="primary"
        min={0}
        max={100}
      />
    </>
  );
};
export default ProgressBar;
