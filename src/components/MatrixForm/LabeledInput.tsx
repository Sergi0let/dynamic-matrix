import React from "react";

type LabeledInputProps = {
  label: string;
  subtext?: string;
  name: string;
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  maxLength: number;
  maxValue: number;
};

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  subtext,
  name,
  value,
  min,
  max,
  disabled,
  onChange,
  maxLength,
  maxValue,
}) => {
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    let val = e.currentTarget.value;
    val = val.replace(/\D/g, "");
    if (val.length > maxLength) {
      val = val.slice(0, maxLength);
    }
    if (val !== "" && Number(val) > maxValue) {
      val = String(maxValue);
    }
    e.currentTarget.value = val;
  };

  const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    let val = e.currentTarget.value;
    if (val === "") {
      val = "0";
    }
    if (Number(val) > maxValue) {
      val = String(maxValue);
    }
    e.currentTarget.value = val;
  };

  return (
    <label>
      <b>{label} </b>
      {subtext && <sub>{subtext}</sub>}:
      <input
        type="text"
        name={name}
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onChange={onChange}
        onInput={handleInput}
        onBlur={handleBlur}
        required
      />
    </label>
  );
};

export default LabeledInput;
