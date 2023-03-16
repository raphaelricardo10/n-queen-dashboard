import type MockAdapter from "axios-mock-adapter";

import { type ApiMessage } from "../../protocols";
import { type SolverResult } from "./response";

const mockSolverResults: SolverResult[] = [
  {
    chessboard_size: 4,
    number_of_solutions: 2,
    execution_time: 0.000_824_852_999_357_972_3,
  },
  {
    chessboard_size: 5,
    number_of_solutions: 7,
    execution_time: 0.000_428_355_997_428_298,
  },
  {
    chessboard_size: 6,
    number_of_solutions: 4,
    execution_time: 0.058_790_438_000_869_47,
  },
  {
    chessboard_size: 7,
    number_of_solutions: 7,
    execution_time: 0.000_780_787_006_078_753_6,
  },
  {
    chessboard_size: 8,
    number_of_solutions: 7,
    execution_time: 1.316_782_966_001_483_1,
  },
  {
    chessboard_size: 9,
    number_of_solutions: 7,
    execution_time: 0.362_454_362_999_415,
  },
  {
    chessboard_size: 10,
    number_of_solutions: 7,
    execution_time: 7.675_112_846_998_672_5,
  },
  {
    chessboard_size: 11,
    number_of_solutions: 7,
    execution_time: 1.740_750_429_002_218_9,
  },
  {
    chessboard_size: 12,
    number_of_solutions: 7,
    execution_time: 145.001_744_166_998_83,
  },
  {
    chessboard_size: 13,
    number_of_solutions: 7,
    execution_time: 33.513_991_798_005_01,
  },
];

function injectMockHandlers(mock: MockAdapter): void {
  mock.onGet("/solver-results").reply(
    200,
    (): ApiMessage<SolverResult[]> => ({
      data: mockSolverResults,
      status: "successful",
    })
  );
}

export const SolverApiMock = {
  injectMockHandlers,
  data: mockSolverResults,
};
