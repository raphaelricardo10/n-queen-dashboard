import { SolverService } from "./service";
import { mockSolverResults } from "./mock";

describe("solver service", () => {
  it("should return the mock data", async () => {
    const response = await SolverService.getResults();
    expect(response.status).toBe("successful");
    expect(response.data).toEqual(mockSolverResults);
  });
});
