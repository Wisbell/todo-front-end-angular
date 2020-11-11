import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { AuthModel } from '../models/auth.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserTokenModel } from '../models/user-token.model';

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
    const token = this.getAccessToken();

    if (token && !this.jwtHelper.isTokenExpired(token)) 
      return true;

    return false;
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  getUserTokenData(): UserTokenModel {
    const token: string = this.getAccessToken();

    if (this.isLoggedIn() && token) {
      return this.jwtHelper.decodeToken(token);
    } else {
      this.logout();
    }
  }
}
