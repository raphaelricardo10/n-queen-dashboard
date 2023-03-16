import { api } from "./api";
import { type SolverResult } from "./response";
import { type ApiMessage } from "../../protocols";

export const SolverService = {
  getResults: async (): Promise<ApiMessage<SolverResult[]>> => {
    try {
      const response = await api.get("/solver-results");
      return {
        status: "successful",
        data:
          typeof response.data === "function" ? response.data() : response.data,
      };
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
