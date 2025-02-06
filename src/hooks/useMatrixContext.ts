import { useContext } from "react";
import { MatrixContext } from "../context/MatrixContext";

function useMatrixContext() {
  return useContext(MatrixContext);
}

export default useMatrixContext;
