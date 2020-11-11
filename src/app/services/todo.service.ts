import { Injectable } from '@angular/core';
import { TodoModel } from '../models/todo.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly todos: TodoModel[];

  constructor(private authService: AuthService) { 
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

  createTodo(todoText: string) {
    const newTodo = new TodoModel;
    newTodo.id = this.generateMaxId();
    newTodo.userId = this.authService.getUserTokenData().sub.toString();
    newTodo.text = todoText;
    newTodo.completed = false;

    this.todos.push(newTodo);
    return newTodo;
  }

  updateTodo(updatedTodo: TodoModel) {
    let todoToUpdate = this.getTodo(updatedTodo.id);
    todoToUpdate = updatedTodo;
    return updatedTodo;
  }

  deleteTodo(id: string) {
    const deleteIndex: number = this.todos.findIndex(todo => todo.id === id);
    this.todos.splice(deleteIndex, 1);
  }

  /**
   * Utility Functions
   */

  getMaxId(): number {
    return Math.max(...this.todos.map(todo => parseInt(todo.id)));
  }

  generateMaxId(): string {
    const maxId: number = this.getMaxId();
    return (maxId + 1).toString();
  }
}
