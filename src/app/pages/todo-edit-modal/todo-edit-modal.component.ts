import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-edit-modal',
  templateUrl: './todo-edit-modal.component.html',
  styleUrls: ['./todo-edit-modal.component.scss']
})
export class TodoEditModalComponent implements OnInit {
  todo: TodoModel;
  todoForm: FormGroup = new FormGroup({
    todoText: new FormControl('')
  }); 

  constructor(public bsModalRef: BsModalRef, private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoForm.setValue({'todoText': this.todo.text});
  }

  saveTodo() {
    const val = this.todoForm.value;
    this.todo.text = val.todoText;
    this.todoService.updateTodo(this.todo);
    this.bsModalRef.hide();
  }

}
