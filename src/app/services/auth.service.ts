import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { AuthModel } from '../models/auth.model';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = `${environment.apiRootUrl}/auth/login`;

  // constructor(private httpClient: HttpClient) { }
  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

  async login(username:string, password:string): Promise<void> {  
    const response: AuthModel = await this.httpClient.post<AuthModel>(this.authUrl, { username, password}).toPromise();
    localStorage.setItem('access_token', response.access_token);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');

    if (token && !this.jwtHelper.isTokenExpired(token)) 
      return true;

    return false;
  }
}
