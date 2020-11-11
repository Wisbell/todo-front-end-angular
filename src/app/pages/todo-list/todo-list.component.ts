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
    const userTokenData: UserTokenModel = this.authService.getUserTokenData();
    this.todos = this.todoService.getAllTodosByUserId(userTokenData.sub);
    console.log('todos', this.todos);
  }

}
