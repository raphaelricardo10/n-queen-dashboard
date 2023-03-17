import { useSolverApi } from "./hooks/use-solver-api";
import { NotificationSnackbar } from "./components/notification-snackbar";
import { SolverResultsDataGrid } from "./components/solver-results-datagrid";
import { ExecutionTimePlot } from "./components/execution-time-plot/execution-time-plot";

function App(): JSX.Element {
  const solverApiHook = useSolverApi();
  return (
    <>
      <NotificationSnackbar />
      <SolverResultsDataGrid rows={solverApiHook.data} />
      <ExecutionTimePlot results={solverApiHook.data} />
    </>
  );
}

export default App;
