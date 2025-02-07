import { useEffect, useState } from "react";
import useMatrixContext from "../../hooks/useMatrixContext";
import { MatrixValuesType } from "../../types";
import AddIcon from "../icons/AddIcon";
import DeleteIcon from "../icons/DeleteIcon";
import LabeledInput from "./LabeledInput";

import s from "./Matrix.module.css";

const MatrixForm: React.FC = () => {
  const { setMatrixValues, removeRow, addRow } = useMatrixContext();
  const [formValues, setFormValues] = useState<MatrixValuesType>({
    m: 0,
    n: 0,
    x: 0,
  });
  const isDisabled = formValues.m === 0 || formValues.n === 0 || formValues.x === 0;
  const [xMax, setXMax] = useState<number>(0);

  useEffect(() => {
    const newXMax = formValues.m * formValues.n;
    setXMax(newXMax);
    if (formValues.x > newXMax) {
      setFormValues((prev) => ({ ...prev, x: newXMax }));
    }
  }, [formValues.m, formValues.n, formValues.x]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    setFormValues((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMatrixValues(formValues);
  };

  return (
    <div>
      <form className={s.mxform} onSubmit={handleSubmit}>
        <LabeledInput
          label="M"
          subtext="(0-100)"
          name="m"
          value={formValues.m}
          min={0}
          max={100}
          onChange={handleChange}
          maxLength={3}
          maxValue={100}
        />
        <LabeledInput
          label="N"
          subtext="(0-100)"
          name="n"
          value={formValues.n}
          min={0}
          max={100}
          onChange={handleChange}
          maxLength={3}
          maxValue={100}
        />
        <LabeledInput
          label="X"
          subtext={`(0 - ${xMax})`}
          name="x"
          value={formValues.x}
          min={0}
          max={xMax}
          disabled={xMax === 0}
          onChange={handleChange}
          maxLength={String(xMax).length}
          maxValue={xMax}
        />
        <button type="submit" disabled={isDisabled}>
          Submit
        </button>
      </form>
      <div className={s["btn-block"]}>
        <button disabled={isDisabled} className={s.btn} onClick={removeRow}>
          <span>Remove</span> <DeleteIcon />
        </button>
        <button disabled={isDisabled} className={s.btn} onClick={addRow}>
          <span>Add</span> <AddIcon />
        </button>
      </div>
    </div>
  );
};

export default MatrixForm;
