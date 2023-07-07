export interface FetchUtilOptions {
  route: string;
  withAuth?: boolean;
}

export interface FetchWithMessageOptions extends FetchUtilOptions {
  successMessage?: string;
  errorMessage?: string;
  noSuccessMessage?: boolean;
  noErrorMessage?: boolean;
}

export type FetchAPIOptions = {
  headers?: { [key: string]: any };
  [key: string]: any;
};
