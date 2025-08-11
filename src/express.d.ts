import {
  SuccessResponseOption,
  ErrorResponseOption,
} from "./lib/middlewares/response.middleware";

declare global {
  namespace Express {
    interface Response {
      success<T>(options: SuccessResponseOption<T>): Response;
      error(options: ErrorResponseOption): Response;
    }
  }
}
