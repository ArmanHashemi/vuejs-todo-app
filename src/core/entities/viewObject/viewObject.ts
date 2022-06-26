import { IViewError, IViewObject } from "./viewObject.types";

export class ViewObject<T> implements IViewObject<T> {
  readonly data: T;
  readonly code: number;
  readonly loading: boolean;
  readonly error?: IViewError;

  constructor(payload: IViewObject<T>) {
    this.data = payload.data;
    this.code = payload.code;
    this.loading = payload.loading;
    this.error = payload.error;
  }
}
