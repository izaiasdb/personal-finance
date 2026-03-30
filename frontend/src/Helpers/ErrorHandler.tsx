import axios from "axios";
import { toast } from "react-toastify";

type ErrorResponse = 
  | { errors?: Array<{ description?: string }> | Record<string, string[]> }
  | string
  | undefined;

const handleArrayErrors = (errors: Array<{ description?: string }>) => {
  for (const val of errors) {
    if (val.description) {
      toast.warning(val.description);
    }
  }
};

const handleObjectErrors = (errors: Record<string, string[]>) => {
  for (const e in errors) {
    toast.warning(errors[e][0]);
  }
};

const handleObjectErrorData = (errorData: { errors?: Array<{ description?: string }> | Record<string, string[]> }) => {
  if (Array.isArray(errorData.errors)) {
    handleArrayErrors(errorData.errors);
  } else if (typeof errorData.errors === "object" && errorData.errors !== null) {
    handleObjectErrors(errorData.errors);
  }
};

export const handleError = (error: unknown) => {
  if (!axios.isAxiosError(error)) {
    return;
  }

  const err = error.response;
  const errorData = err?.data as ErrorResponse;

  if (typeof errorData === "object" && errorData !== null) {
    handleObjectErrorData(errorData);
  } else if (typeof errorData === "string") {
    toast.warning(errorData);
  } else if (err?.status == 401) {
    toast.warning("Please login");
    globalThis.history.pushState({}, "LoginPage", "/login");
  } else if (err) {
    toast.warning(err?.data);
  }
};
