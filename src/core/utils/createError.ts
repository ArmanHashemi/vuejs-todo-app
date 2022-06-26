import { IViewObject, ViewObject } from "../entities/viewObject";

export const CODES = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404
};

export const createError = (
  code: number,
  message: string
): IViewObject<any> => {
  return new ViewObject({
    data: null,
    loading: false,
    code: code,
    error: { code, message },
  });
};
