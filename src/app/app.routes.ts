import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'users',
    loadComponent: () => import('./users/user-list.component').then(m => m.UserListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'toastr-demo',
    loadComponent: () => import('./demo/toastr-demo.component').then(m => m.ToastrDemoComponent),
    canActivate: [authGuard]
  },
  {
    path: 'alert-demo',
    loadComponent: () => import('./demo/alert-demo.component').then(m => m.AlertDemoComponent),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'users'
  }
];
