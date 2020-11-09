import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  }); 

  login(): void {
    console.log('Name:' + this.loginForm.get('username').value);
  } 

}
