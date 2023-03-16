import { renderHook, RenderHookResult, waitFor } from "@testing-library/react";
import { SolverApiHook, useSolverApi } from "./hook";
import { SolverResult, SolverService } from "../../services/solver-service";
import { act } from "react-dom/test-utils";

describe("solver api hook", () => {
  const mockResult: SolverResult[] = [
    { number_of_solutions: 2, chessboard_size: 4, execution_time: 0.1 },
  ];
  let hook: RenderHookResult<SolverApiHook, {}>;
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(SolverService, "getResults").mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          setTimeout(
            () =>
              resolve({
                data: mockResult,
                status: "successful",
              }),
            5000
          );
        })
    );
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    hook = renderHook(useSolverApi);
  });

  afterEach(() => {
    hook.unmount();
  });

  it("should be initialized with in_progress state", async () => {
    expect(hook.result.current.solverResults.status).toBe("in_progress");
  });

  it("should return the api data", async () => {
    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(hook.result.current.solverResults.status).toBe("successful");
    });
  });
});
