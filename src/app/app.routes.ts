import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./users/user-list.component').then(m => m.UserListComponent)
      },
      {
        path: 'toastr-demo',
        loadComponent: () => import('./demo/toastr-demo.component').then(m => m.ToastrDemoComponent)
      },
      {
        path: 'alert-demo',
        loadComponent: () => import('./demo/alert-demo.component').then(m => m.AlertDemoComponent)
      },
      {
        path: 'icons-demo',
        loadComponent: () => import('./demo/icons-demo.component').then(m => m.IconsDemoComponent)
      },
      {
        path: 'modal-demo',
        loadComponent: () => import('./demo/modal-demo.component').then(m => m.ModalDemoComponent)
      },
      {
        path: 'grid-demo',
        loadComponent: () => import('./demo/grid-demo.component').then(m => m.GridDemoComponent)
      },
      {
        path: 'drag-drop-demo',
        loadComponent: () => import('./demo/drag-drop-demo.component').then(m => m.DragDropDemoComponent)
      },
      {
        path: 'badges-demo',
        loadComponent: () => import('./badges-demo/badges-demo.component').then(m => m.BadgesDemoComponent)
      },
      {
        path: 'breadcrumbs-demo',
        loadComponent: () => import('./breadcrumbs-demo/breadcrumbs-demo.component').then(m => m.BreadcrumbsDemoComponent)
      },
      {
        path: 'tabs-demo',
        loadComponent: () => import('./demo/tabs-demo.component').then(m => m.TabsDemoComponent)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
