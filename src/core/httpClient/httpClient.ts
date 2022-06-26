import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { injectable } from 'inversify'
import apis from '../constants/apis'

import {
  IHttpClient,
  IRequestConfig,
  IViewResponse
} from './httpClient.types'

@injectable()
export class HttpClient implements IHttpClient {
  api: AxiosInstance;

  constructor () {
    this.api = axios.create({
      baseURL: apis.BASE_URL,
      withCredentials: false,
      headers: {}
    })
  }

  create (config?: IRequestConfig): AxiosInstance {
    return axios.create(config)
  }

  setConfig (
    { headers }: AxiosRequestConfig | undefined = { headers: {} }
  ): void {
    this.api.defaults.headers = { ...this.api.defaults.headers, ...headers }
    try {
      if (!this.api.defaults.headers.authorization) {
        delete this.api.defaults.headers.authorization
      }
    } catch (error) {
      console.log('err', error)
    }
  }

  get<T, R = IViewResponse<T>> (
    url: string,
    config?: IRequestConfig
  ): Promise<R> {
    return this.api.get(url, config)
  }

  delete<T, R = IViewResponse<T>> (
    url: string,
    config?: IRequestConfig
  ): Promise<R> {
    return this.api.delete(url, config)
  }

  head<T, R = IViewResponse<T>> (
    url: string,
    config?: IRequestConfig
  ): Promise<R> {
    return this.api.head(url, config)
  }

  options<T, R = IViewResponse<T>> (
    url: string,
    config?: IRequestConfig
  ): Promise<R> {
    return this.api.options(url, config)
  }

  post<T, R = IViewResponse<T>> (
    url: string,
    data?: any,
    config?: IRequestConfig
  ): Promise<R> {
    return this.api.post(url, data, config)
  }

  put<T, R = IViewResponse<T>> (
    url: string,
    data?: any,
    config?: IRequestConfig
  ): Promise<R> {
    return this.api.put(url, data, config)
  }

  patch<T, R = IViewResponse<T>> (
    url: string,
    data?: any,
    config?: IRequestConfig
  ): Promise<R> {
    return this.api.patch(url, data, config)
  }
}
