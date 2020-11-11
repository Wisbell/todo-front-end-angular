import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-create-modal',
  templateUrl: './todo-create-modal.component.html',
  styleUrls: ['./todo-create-modal.component.scss']
})
export class TodoCreateModalComponent implements OnInit {
  todoText: string;

  constructor(public bsModalRef: BsModalRef, private todoService: TodoService) { }

  todoForm: FormGroup = new FormGroup({
    todoText: new FormControl('')
  }); 

  ngOnInit(): void {
  }

  saveTodo() {
    const val = this.todoForm.value;
    this.todoService.createTodo(val.todoText);
    this.bsModalRef.hide();
  }

}
