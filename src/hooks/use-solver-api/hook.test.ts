import { renderHook } from "@testing-library/react";
import { useSolverApi } from "./hook";

describe("solver api hook", () => {
  it("should be initialized with in_progress state", () => {
    const { result } = renderHook(useSolverApi);
    expect(result.current.solverResults.status).toBe("in_progress");
  });

  it("should be completed with successful state", () => {
    const { result } = renderHook(useSolverApi);
    setTimeout(() => {
      expect(result.current.solverResults.status === "successful");
    }, 2000);
  });
});
