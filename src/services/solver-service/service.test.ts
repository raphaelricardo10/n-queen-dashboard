import MockAdapter from "axios-mock-adapter";

import { api } from "./api";
import { SolverService } from "./service";
import { SolverApiMock } from "./mock";

describe("solver service", () => {
  const mock = new MockAdapter(api);
  beforeAll(() => {
    SolverApiMock.injectMockHandlers(mock);
  });

  afterAll(() => {
    mock.restore();
  });

  it("should return the mock data", async () => {
    const response = await SolverService.getResults();
    expect(response.status).toBe("successful");
    expect(response.data).toEqual(SolverApiMock.data);
  });
});
