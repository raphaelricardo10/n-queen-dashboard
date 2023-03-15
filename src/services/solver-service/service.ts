import { api } from "./api";
import { type SolverResult } from "./response";
import { type ApiMessage } from "../../api";

export const SolverService = {
  getResults: async (): Promise<ApiMessage<SolverResult[]>> => {
    try {
      const response = await api.get("/solver-results");
      return response.data();
    } catch (error: any) {
      return {
        data: [],
        status: "error",
        error_message: error.message,
      };
    }
  },
};
