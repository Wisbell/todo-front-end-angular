import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  }); 

  async login(): Promise<void> {
    try {
      const val = this.loginForm.value;

      if (val.username && val.password) {
        await this.authService.login(val.username, val.password);
        this.router.navigateByUrl('/todo/list');

      }
    } catch (error) {
      // TODO: Show user error happened while logging in
      console.log('Error logging in...');
      console.error(error);
      return error;
    }
  } 

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
