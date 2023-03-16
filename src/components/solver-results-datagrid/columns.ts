import { type GridColDef } from "@mui/x-data-grid";
import { type SolverResult } from "../../services/solver-service";

interface ModelDataGridColumn<T extends object>
  extends Omit<GridColDef, "field"> {
  field: keyof T;
}

interface SolverDataGridRow extends Omit<SolverResult, "execution_time"> {
  execution_time: string;
}

type SolverResultsDataGridColumn = ModelDataGridColumn<SolverDataGridRow>;

export function formatSeconds(seconds: number): string {
  if (seconds < 1) {
    return `${seconds * 1000} ms`;
  }

  if (seconds >= 60) {
    return `${seconds / 60} min`;
  }

  return `${seconds} s`;
}

export const columns: SolverResultsDataGridColumn[] = [
  {
    field: "chessboard_size",
    headerName: "N",
    width: 100,
  },
  {
    field: "execution_time",
    headerName: "Execution time",
    width: 250,
    valueFormatter: (parameters) => formatSeconds(parameters.value),
  },
  {
    field: "number_of_solutions",
    headerName: "Number of solutions",
    width: 150,
  },
];
