import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BreadcrumbItem {
  text: string;
  path?: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-breadcrumbs-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumbs-demo.component.html',
  styleUrls: ['./breadcrumbs-demo.component.scss']
})
export class BreadcrumbsDemoComponent {
  basicBreadcrumbs: BreadcrumbItem[] = [
    { text: 'Home', path: '/home' },
    { text: 'Products', path: '/products' },
    { text: 'Category', path: '/products/category' },
    { text: 'Product Details', isActive: true }
  ];

  iconBreadcrumbs: BreadcrumbItem[] = [
    { text: 'Dashboard', path: '/dashboard' },
    { text: 'Users', path: '/users' },
    { text: 'Profile Settings', isActive: true }
  ];

  longPathBreadcrumbs: BreadcrumbItem[] = [
    { text: 'Home', path: '/home' },
    { text: 'Administration', path: '/admin' },
    { text: 'User Management', path: '/admin/users' },
    { text: 'Roles & Permissions', path: '/admin/users/roles' },
    { text: 'Edit Role', isActive: true }
  ];

  navigateTo(route: string): void {
    console.log('Navigating to:', route);
    // In real application, use Router.navigate([path])
  }
}
