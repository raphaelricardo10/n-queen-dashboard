import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./columns";
import { type SolverResult } from "../../services/solver-service";

export interface SolverResultsDataGridProperties {
  rows: SolverResult[];
}

export function SolverResultsDataGrid({
  rows,
}: SolverResultsDataGridProperties): JSX.Element {
  return (
    <Box sx={{ width: "100%" }}>
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
        pageSizeOptions={[5, 10, 50, 100]}
        autoHeight
        disableRowSelectionOnClick
      />
    </Box>
  );
}
