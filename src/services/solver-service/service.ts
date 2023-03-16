import { api } from "./api";
import { type SolverResult } from "./response";
import { type ApiMessage } from "../../protocols";

export const SolverService = {
  getResults: async (): Promise<ApiMessage<SolverResult[]>> => {
    try {
      const response = await api.get("/solver-results");

      if (typeof response.data === "function") {
        return response.data();
      }

      return response.data;
    } catch (error: any) {
      console.error(error);
      return {
        data: [],
        status: "error",
        error_message: error.message,
      };
    }
  },
};
