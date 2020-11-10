import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = `${environment.apiRootUrl}/auth/login`;

  constructor(private httpClient: HttpClient) { }

  async login(username:string, password:string): Promise<void> {  
    const response: AuthModel = await this.httpClient.post<AuthModel>(this.authUrl, { username, password}).toPromise();
    localStorage.setItem('access_token', response.access_token);
  }

  // TODO: Logout and redirect to about page
  logout() {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    // Check if token exists, ie not empty or null
    if ( localStorage.getItem('access_token') !==  null) 
      return true;
    // Check if token is not expired
    return false;
  }
}
