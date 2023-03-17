import Plot from "react-plotly.js";
import { type SolverResult } from "../../services/solver-service";

export interface ExecutionTimePlotProperties {
  results: SolverResult[];
}

export function ExecutionTimePlot({
  results,
}: ExecutionTimePlotProperties): JSX.Element {
  return (
    <Plot
      layout={{
        title: "Execution time vs Chessboard Size (N)",
        width: 1200,
        height: 400,
        xaxis: {
          title: "N",
        },
        yaxis: {
          title: "Execution time (s)",
        },
      }}
      data={[
        {
          x: results.map((result) => result.chessboard_size),
          y: results.map((result) => result.execution_time),
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "red" },
        },
      ]}
    />
  );
}
