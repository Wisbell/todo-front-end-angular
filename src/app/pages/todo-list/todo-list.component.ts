// TODO: Show only complete todos button
// TODO: Show only incomplete todos button
// TODO: Clear all completed todos button

import { Component, OnInit } from '@angular/core';
import { TodoModel } from 'src/app/models/todo.model';
import { UserTokenModel } from 'src/app/models/user-token.model';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TodoCreateModalComponent } from 'src/app/pages/todo-create-modal/todo-create-modal.component';
import { TodoEditModalComponent } from '../todo-edit-modal/todo-edit-modal.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todos: TodoModel[];
  bsModalRef: BsModalRef;

  constructor(private todoService: TodoService, private authService: AuthService, private modalService: BsModalService) { }

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
    document.getElementById(`todo-id-${todoId}`).classList.toggle('table-success');

    const todoToToggle = this.todoService.getTodo(todoId);

    if (todoToToggle.completed)
      todoToToggle.completed = false;
    else
      todoToToggle.completed = true;
  }

  // editTodo(id: string) {

  // }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
    this.todos = this.getAllUserTodos();
  }

  openCreateTodoModal() {
    this.bsModalRef = this.modalService.show(TodoCreateModalComponent);

    const onHideSub = this.bsModalRef.onHide.subscribe(() => {
      this.todos = this.getAllUserTodos();
      onHideSub.unsubscribe();
    });
  }

  openEditTodoModal(todo: TodoModel) {
    const initialState = {
      todo
    };

    this.bsModalRef = this.modalService.show(TodoEditModalComponent, { initialState });

    const onHideSub = this.bsModalRef.onHide.subscribe(() => {
      this.todos = this.getAllUserTodos();
      onHideSub.unsubscribe();
    });
  }

}
