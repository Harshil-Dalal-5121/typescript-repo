import React from "react";

interface InputTextFieldProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = (props: InputTextFieldProps) => {
  return (
    <div>
      <input
        type="text"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
};

export default InputText;
