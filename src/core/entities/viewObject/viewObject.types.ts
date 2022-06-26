export interface IViewError {
  code: number;
  message: string;
  request?: any;
}

export interface IViewObject<T> {
  data: T ;
  code: number,
  loading: boolean;
  error?: IViewError;
}
