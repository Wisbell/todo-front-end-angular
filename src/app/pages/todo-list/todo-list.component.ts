// TODO: Color todos in table green if completed
// TODO: Remove completed if marked incomplete but was marked completed
// TODO: Show only complete todos
// TODO: Show only incomplete todos
// TODO: Clear incomplete todos

import { Component, OnInit } from '@angular/core';
import { TodoModel } from 'src/app/models/todo.model';
import { UserTokenModel } from 'src/app/models/user-token.model';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todos: TodoModel[];

  constructor(private todoService: TodoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.todos = this.getAllUserTodos();
    console.log('todos', this.todos);
  }

  getUserId(): string {
    const userTokenData: UserTokenModel = this.authService.getUserTokenData();
    return userTokenData.sub;
  }

  getAllUserTodos() {
    return this.todoService.getAllTodosByUserId(this.getUserId());
  }

  toggleComplete(todoId: string) {
    // TODO: Toggle table row success class
    // TODO: Http Patch/Put to backend updating complete status

  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
    this.todos = this.getAllUserTodos();
  }

}
