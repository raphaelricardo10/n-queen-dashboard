import {
  renderHook,
  type RenderHookResult,
  waitFor,
} from "@testing-library/react";
import { type SolverApiHook, useSolverApi } from "./hook";
import {
  type SolverResult,
  SolverService,
} from "../../services/solver-service";
import { act } from "react-dom/test-utils";

describe("solver api hook", () => {
  const mockResult: SolverResult[] = [
    { number_of_solutions: 2, chessboard_size: 4, execution_time: 0.1 },
  ];
  let hook: RenderHookResult<SolverApiHook, undefined>;
  beforeEach(async () => {
    jest.useFakeTimers();
    jest.spyOn(SolverService, "getResults").mockImplementation(
      async () =>
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              data: mockResult,
              status: "successful",
            });
          }, 5000);
        })
    );
    hook = renderHook(useSolverApi);
    await waitFor(() => {
      expect(hook.result.current).toBeDefined();
    });
  });

  afterEach(() => {
    hook.unmount();
    jest.useRealTimers();
    jest.resetAllMocks();
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
