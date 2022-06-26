import { todoModel } from '@/home/entities/todo'
export default  function makeModule() {
  return {
    namespaced: true,
    state: {
      version: 1,
      todos: Array<todoModel>()
    },
    getters: {

    },
    actions: {

    },
    mutations: {
      ADD_TODO(state: any, todos: todoModel[]){
        state.todos = todos
      }
    },
  };
}
