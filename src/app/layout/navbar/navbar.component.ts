// TODO: Change anchors to router-links
// TODO: Move login/logout to right side of navbar

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  // TODO: Make logout link call this function
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
