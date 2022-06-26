import { IViewObject } from "@/core/entities/viewObject";
import {todoModel} from "@/home/entities/todo"
export interface IHomeService {
  getTodos(): Promise<IViewObject<todoModel[]>>;
  addTodo(todo: todoModel): Promise<IViewObject<todoModel>>;
  filterTodos(isDone: boolean): Promise<IViewObject<todoModel[]>>;
  deleteTodo(id: number): Promise<IViewObject<string>>;
  editTodo(id: number,todo: todoModel): Promise<IViewObject<todoModel>>;
}

export const HOME_SERVICE_TYPE = Symbol("@/home/homeService");
