import React, { useEffect, useState } from "react";
import useMatrixContext from "../../hooks/useMatrixContext";
import { MatrixValuesType } from "../../types";
import s from "./Matrix.module.css";

const MatrixForm: React.FC = () => {
  const { setMatrixValues, removeRow, addRow } = useMatrixContext();
  const [formValues, setFormValues] = useState<MatrixValuesType>({
    m: 0,
    n: 0,
    x: 0,
  });
  const isDisabled = formValues.m === 0 || formValues.n === 0;

  const [xMax, setXMax] = useState<number>(0);

  // Перерахунок максимально допустимого значення для X на основі M та N
  useEffect(() => {
    const newXMax = formValues.m * formValues.n;
    setXMax(newXMax);
    // Якщо поточне значення X перевищує новий максимум – оновити його
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
        <label>
          <b>M </b>
          <sub>(0-100)</sub>:
          <input
            type="text"
            name="m"
            aria-colspan={3}
            value={formValues.m}
            min={0}
            max={100}
            onChange={handleChange}
            onInput={(e) => {
              let value = e.currentTarget.value;

              // Дозволяємо вводити тільки цифри
              value = value.replace(/\D/g, "");

              // Обрізаємо довжину до 3 символів
              if (value.length > 3) {
                value = value.slice(0, 3);
              }
              if (value !== "" && Number(value) > 100) {
                value = "100";
              }

              e.currentTarget.value = value;
            }}
            onBlur={(e) => {
              let value = e.currentTarget.value;
              if (value === "") {
                value = "0";
              }
              if (Number(value) > 100) {
                value = "100";
              }

              e.currentTarget.value = value;
            }}
            required
          />
        </label>

        <label>
          <b>N </b>
          <sub>(0-100)</sub>:
          <input
            type="text"
            name="n"
            value={formValues.n}
            onChange={handleChange}
            onInput={(e) => {
              let value = e.currentTarget.value;

              value = value.replace(/\D/g, "");

              if (value.length > 3) {
                value = value.slice(0, 3);
              }
              if (value !== "" && Number(value) > 100) {
                value = "100";
              }

              e.currentTarget.value = value;
            }}
            onBlur={(e) => {
              let value = e.currentTarget.value;
              if (value === "") {
                value = "0";
              }
              if (Number(value) > 100) {
                value = "100";
              }

              e.currentTarget.value = value;
            }}
            required
          />
        </label>

        <label>
          <b>X </b> <sub>(0 - {xMax})</sub>:
          <input
            type="text"
            name="x"
            value={formValues.x}
            min={0}
            max={xMax}
            onChange={handleChange}
            onInput={(e) => {
              let value = e.currentTarget.value;

              value = value.replace(/\D/g, "");

              if (value.length > xMax) {
                value = value.slice(0, xMax);
              }

              e.currentTarget.value = value;
            }}
            onBlur={(e) => {
              let value = e.currentTarget.value;
              if (value === "") {
                value = "0";
              }

              e.currentTarget.value = value;
            }}
            required
          />
        </label>

        <button type="submit" disabled={isDisabled}>
          Submit
        </button>
      </form>
      <button onClick={removeRow}>Remove Rows</button>
      <button onClick={addRow}>Add Rows</button>
    </div>
  );
};

export default MatrixForm;
