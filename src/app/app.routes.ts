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
    path: 'icons-demo',
    loadComponent: () => import('./demo/icons-demo.component').then(m => m.IconsDemoComponent),
    canActivate: [authGuard]
  },
  {
    path: 'modal-demo',
    loadComponent: () => import('./demo/modal-demo.component').then(m => m.ModalDemoComponent),
    canActivate: [authGuard]
  },
  {
    path: 'grid-demo',
    loadComponent: () => import('./demo/grid-demo.component').then(m => m.GridDemoComponent),
    canActivate: [authGuard]
  },
  {
    path: 'drag-drop-demo',
    loadComponent: () => import('./demo/drag-drop-demo.component').then(m => m.DragDropDemoComponent),
    canActivate: [authGuard]
  },
  {
    path: 'badges-demo',
    loadComponent: () => import('./badges-demo/badges-demo.component').then(m => m.BadgesDemoComponent),
    canActivate: [authGuard]
  },
  {
    path: 'breadcrumbs-demo',
    loadComponent: () => import('./breadcrumbs-demo/breadcrumbs-demo.component').then(m => m.BreadcrumbsDemoComponent),
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
