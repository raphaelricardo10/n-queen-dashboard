export interface ApiMessage<T> {
  data: T;
  error_message?: string;
  status: "in_progress" | "successful" | "error";
}
