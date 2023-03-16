import Box from "@mui/material/Box";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { type SolverResult } from "../../services/solver-service";

interface ModelDataGridColumn<T extends object>
  extends Omit<GridColDef, "field"> {
  field: keyof T;
}

type SolverResultsDataGridColumn = ModelDataGridColumn<SolverResult>;

const columns: SolverResultsDataGridColumn[] = [
  {
    field: "chessboard_size",
    headerName: "N",
    width: 100,
  },
  {
    field: "execution_time",
    headerName: "Execution time",
    width: 150,
  },
  {
    field: "number_of_solutions",
    headerName: "Number of solutions",
    width: 150,
  },
];

export interface SolverResultsDataGridProperties {
  rows: SolverResult[];
}

export function SolverResultsDataGrid({
  rows,
}: SolverResultsDataGridProperties): JSX.Element {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        getRowId={(row) => row.chessboard_size}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 50, 100, 150]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
