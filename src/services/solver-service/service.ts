import axios from "axios";
import { type SolverResult } from "./api";
import { type ApiMessage } from "../../api";

export const SolverService = {
  getResults: async (): Promise<ApiMessage<SolverResult[]>> => {
    try {
      const response = await axios.get("/solver_results");
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
