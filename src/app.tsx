import { useSolverApi } from "./hooks/use-solver-api";
import { SolverResultsDataGrid } from "./components/solver-results-datagrid/datagrid";

function App(): JSX.Element {
  const hook = useSolverApi();
  return <SolverResultsDataGrid rows={hook.solverResults.data} />;
}

export default App;
