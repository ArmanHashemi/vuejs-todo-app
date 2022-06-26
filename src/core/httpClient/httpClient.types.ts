import { AxiosInstance, CancelToken } from "axios";

export interface IViewResponse<T = any> {
  data: T;
  status: number;
  message: string;
  headers: any;
}

export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

export interface IRequestConfig {
  url?: string;
  method?: Method;
  baseURL?: string;
  headers?: any;
  params?: any;
  data?: any;
  withCredentials?: boolean;
  cancelToken?: CancelToken;
}

export interface IHttpClient {
  create(config?: IRequestConfig): AxiosInstance;

  setConfig(config?: IRequestConfig): void;

  get<T = any, R = IViewResponse<T>>(
    url: string,
    config?: IRequestConfig
  ): Promise<R>;

  delete<T = any, R = IViewResponse<T>>(
    url: string,
    config?: IRequestConfig
  ): Promise<R>;

  head<T = any, R = IViewResponse<T>>(
    url: string,
    config?: IRequestConfig
  ): Promise<R>;

  options<T = any, R = IViewResponse<T>>(
    url: string,
    config?: IRequestConfig
  ): Promise<R>;

  post<T = any, R = IViewResponse<T>>(
    url: string,
    data?: any,
    config?: IRequestConfig
  ): Promise<R>;

  put<T = any, R = IViewResponse<T>>(
    url: string,
    data?: any,
    config?: IRequestConfig
  ): Promise<R>;

  patch<T = any, R = IViewResponse<T>>(
    url: string,
    data?: any,
    config?: IRequestConfig
  ): Promise<R>;
}

export const HTTP_CLIENT_TYPE = Symbol("HttpClient");

export const HTTP_UPDATE_HEADER_EVENT = "HTTP_UPDATE_HEADER_EVENT";

export const IS_OPEN_API = "is-open-api";
export const IS_GUEST = "is-guest";

export const HTTP_ERRORS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
  PRECONDITION_FAILED: 412,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
};
