import { IHomeService } from '@/home/services/homeService.types'
import { injectable } from 'inversify'
import { IViewObject, ViewObject } from '@/core/entities/viewObject'
import { todoModel } from '@/home/entities/todo'
import { HTTP_CLIENT_TYPE, HTTP_ERRORS, IHttpClient } from '@/core/httpClient'
import { lazyInject } from "@/core/di/inversify.config";
import { createError } from '@/core/utils/createError'
import apis from '@/core/constants/apis'
import replaceAPIParams from "@/core/utils/replaceAPIParams";

@injectable()
export class HomeService implements IHomeService {

  @lazyInject(HTTP_CLIENT_TYPE)
  readonly httpClient: IHttpClient;

  async getTodos (): Promise<IViewObject<todoModel[]>> {
    try {
      const response = await this.httpClient.get<todoModel[]>(apis.TODO_LIST)

      return new ViewObject({
        data: response.data,
        code: response.status,
        loading: false
      });
    }
    catch (error){
      if (error.status && error.status >= HTTP_ERRORS.BAD_REQUEST) {
        throw createError(error.status, error.data.message);
      }
      throw createError(0, error.toString());

    }
  }
  async addTodo (todo: todoModel): Promise<IViewObject<todoModel>> {
    try {
      const response = await this.httpClient.post<todoModel>(apis.TODO_LIST,todo)

      return new ViewObject({
        data: response.data,
        code: response.status,
        loading: false
      });
    }
    catch (error){
      if (error.status && error.status >= HTTP_ERRORS.BAD_REQUEST) {
        throw createError(error.status, error.data.message);
      }
      throw createError(0, error.toString());

    }
  }

  async filterTodos(isDone: boolean): Promise<IViewObject<todoModel[]>> {
    try {
      const response = await this.httpClient.get<todoModel[]>(apis.TODO_LIST+`?isDone=${isDone}`)

      return new ViewObject({
        data: response.data,
        code: response.status,
        loading: false
      });
    }
    catch (error){
      if (error.status && error.status >= HTTP_ERRORS.BAD_REQUEST) {
        throw createError(error.status, error.data.message);
      }
      throw createError(0, error.toString());

    }
  }

  async deleteTodo(id: number): Promise<IViewObject<string>> {
    try {
      // Create wrapper for replace path parameters in endpoint urls
      const response = await this.httpClient.delete(replaceAPIParams(apis.SINGLE_TODO, { id }))

      return new ViewObject({
        data: response.data,
        code: response.status,
        loading: false
      });
    }
    catch (error){
      if (error.status && error.status >= HTTP_ERRORS.BAD_REQUEST) {
        throw createError(error.status, error.data.message);
      }
      throw createError(0, error.toString());

    }
  }

  async editTodo(id: number, todo: todoModel): Promise<IViewObject<todoModel>> {
    try {
      // Create wrapper for replace path parameters in endpoint urls
      const response = await this.httpClient.put<todoModel>(replaceAPIParams(apis.SINGLE_TODO, { id }),todo)

      return new ViewObject({
        data: response.data,
        code: response.status,
        loading: false
      });
    }
    catch (error){
      if (error.status && error.status >= HTTP_ERRORS.BAD_REQUEST) {
        throw createError(error.status, error.data.message);
      }
      throw createError(0, error.toString());

    }
  }

}
