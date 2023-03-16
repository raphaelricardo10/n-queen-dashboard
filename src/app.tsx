import { useSolverApi } from "./hooks/use-solver-api";
import { NotificationSnackbar } from "./components/notification-snackbar";
import { SolverResultsDataGrid } from "./components/solver-results-datagrid";

function App(): JSX.Element {
  const solverApiHook = useSolverApi();
  return (
    <>
      <NotificationSnackbar />
      <SolverResultsDataGrid rows={solverApiHook.data} />
    </>
  );
}

export default App;
