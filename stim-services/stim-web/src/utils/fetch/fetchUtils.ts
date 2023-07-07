import Cookies from "js-cookie";
import useClientMessageStore from "../useClientMessageStore";
import {
  FetchWithMessageOptions,
  FetchAPIOptions,
  FetchUtilOptions,
} from "./types";

export async function fetchUtil(
  handlerOptions: FetchUtilOptions,
  fetchOptions?: FetchAPIOptions
) {
  let headers = fetchOptions?.headers ?? {};

  if (handlerOptions.withAuth) {
    headers = { ...headers, Cookie: Cookies.get("session") as string };
  }

  const res = await fetch(handlerOptions.route, {
    ...fetchOptions,
    headers: headers,
  });

  const data = await res.json();
  return data;
}

export async function fetchWithMessageHandling(
  handlerOptions: FetchWithMessageOptions,
  fetchOptions?: FetchAPIOptions
) {
  const data = await fetchUtil(handlerOptions, fetchOptions);

  if (data.error) {
    if (typeof window !== "undefined") {
      if (!handlerOptions.noErrorMessage) {
        useClientMessageStore.setState({
          clientMessage: {
            type: "ERROR",
            message: handlerOptions.errorMessage
              ? handlerOptions.errorMessage
              : data.error,
          },
        });
      }
      console.error(data.error);
    }
  } else {
    if (!handlerOptions.noSuccessMessage) {
      useClientMessageStore.setState({
        clientMessage: {
          type: "SUCCESS",
          message: handlerOptions.successMessage && data.message,
        },
      });
    }
  }

  return data;
}
