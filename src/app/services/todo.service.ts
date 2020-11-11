import { Injectable } from '@angular/core';
import { TodoModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly todos: TodoModel[];

  constructor() { 
    this.todos = [
      {
        id: "1",
        userId: "1",
        text: "Todo One",
        completed: false
      },
      {
        id: "2",
        userId: "1",
        text: "Todo Two",
        completed: true
      },
      {
        id: "3",
        userId: "1",
        text: "Todo Three",
        completed: false
      },
    
    ];
  }

  // TODO: Admin only
  getAllTodos(): TodoModel[] {
    return this.todos;
  }

  getAllTodosByUserId(userId: string): TodoModel[] {
    return this.todos.filter(todo => todo.userId === userId.toString());  
  }

  getTodo(id: string): TodoModel {
    return this.todos.find(todo => todo.id === id);
  }

  createTodo() {

  }

  updateTodo() {

  }

  deleteTodo() {

  }
}
