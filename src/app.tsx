import { useSolverApi } from "./hooks/use-solver-api";
import { SolverResultsDataGrid } from "./components/solver-results-datagrid";

function App(): JSX.Element {
  const solverApiHook = useSolverApi();
  return <SolverResultsDataGrid rows={solverApiHook.data} />;
}

export default App;
