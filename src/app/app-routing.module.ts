import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { TodoComponent } from './pages/todo/todo.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'todo/list', component: TodoComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
