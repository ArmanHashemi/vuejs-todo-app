<template>
  <div class="wrap">
    <div>
      <h1>TODO</h1>
      <div class="content">

        <section>

         <!--    save todo by enter      -->
        <input  class="question" @keyup.enter="addTodo" v-model="inputText" placeholder="What need to be done?"/>


          <div class="todo-wrapper">
            <div class="todo-item"  @dblclick="contenteditable = true" @focusout="contenteditable = false"  v-for="(todo) in todos" :key="todo.id" :class="(todo.isDone)? 'is-done':'in-progress'">
              <div class="todo-title" @focusout="editTodo(todo.id)" @input="onInput" :contenteditable="contenteditable">{{todo.title}}</div>
              <div class="action-wrapper">
                <span class="done-item" @click="doneTodo(todo.id, todo.title)">&#10004;</span>
                <span class="delete-item" @click="deleteTodo(todo.id)">x</span>
              </div>
            </div>
          </div>

          <div class="drop-shadows"></div>
          <div class="drop-shadows-2"></div>

        </section>

        <div class="footer">
          <div>
            <b>{{itemsLeft}}</b>
            <span>items-left</span>
          </div>
          <div>
            <div class="filter-option">
              <span @click="$router.replace({ query: { filter: 'all' } })" :style="(currentRoute === 'all')?'font-weight: bold':''">All</span>
              <span @click="$router.replace({ query: { filter: 'active' } })" :style="(currentRoute === 'active')?'font-weight: bold':''">ACTIVE</span>
            </div>
          </div>
          <div>
            <button @click="deleteAllTodos">Clear completed</button>
          </div>
        </div>

      </div>
    </div>

  </div>

</template>

<script lang="ts">
import Vue from "vue";
import { HOME_SERVICE_TYPE, HomeService } from '@/home/services'
import { lazyInject } from "@/core/di/inversify.config";
import Component from "vue-class-component";
import {todoModel} from "@/home/entities/todo";


const HomeData = Vue.extend({
  data() {
    return {
      inputText: '',
      editText: '',
      contenteditable: false,
    };
  }
});
@Component<Home>({})
export default class Home extends HomeData {
  @lazyInject(HOME_SERVICE_TYPE)
  apiService!: HomeService;



  // this is a computed property read data from state (vuex)
  get todos(): todoModel[] {
    return this.$store.state.Home.todos.filter((todo: todoModel)=>{
      if (this.currentRoute === 'all'){
        return todo
      }else{
        return !todo.isDone
      }
    })
  }
  get itemsLeft(): number{
    const lefts = this.todos.filter(item=> !item.isDone)
    return lefts.length
  }
  get currentRoute(){
    return this.$route.query.filter
  }
  addTodo() {
    this.apiService.addTodo({ title: this.inputText, isDone: false}).then(response => {
      if (response.code === 201) {
        // fetch new data after create successfully
        this.inputText = ''
        this.contenteditable = false
        this.getTodosFromServer()
      }
    })
  }

  deleteTodo(id: number) {
    this.apiService.deleteTodo(id).then(response => {
      console.log(response.data)
      if (response.code === 200) {
        // fetch new data after delete successfully
        this.getTodosFromServer()
      }
    })
  }

  editTodo(id: number) {
    this.apiService.editTodo(id, { title: this.editText, isDone: false}).then(response => {
      console.log(response.data)
      if (response.code === 200) {
        // fetch new data after delete successfully
        this.editText = ''
        this.contenteditable = false
        this.getTodosFromServer()
      }
    })
  }

  doneTodo(id: number , title: string) {
    this.apiService.editTodo(id, {title: title, isDone: true}).then(response => {
      console.log(response.data)
      if (response.code === 200) {
        // fetch new data after delete successfully
        this.getTodosFromServer()
      }
    })
  }

  mounted() {
    this.getTodosFromServer()
  }

  onInput(e: any) {
    this.editText = e.target.innerText
  }

  getTodosFromServer() {
    // you can filter todos from server

    /*
      this.apiService.filterTodos(true).then(response=>{
      // when data received from server set it to global state
      this.$store.commit('Home/ADD_TODO',response.data)
   })
   */

    this.apiService.getTodos().then(response => {
      // when data received from server set it to global state
      this.$store.commit('Home/ADD_TODO', response.data)
    })
  }

   deleteAllTodos() {
    const promises:any = []
    this.todos.forEach((todo: todoModel)=>{
      // It's a bad thing, but I have to do it
     promises.push(this.apiService.deleteTodo(todo.id!))
    })

     Promise.all(promises).then(response=>{
       this.getTodosFromServer()
     })

  }
}

</script>

<style scoped>

</style>
