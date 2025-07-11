import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakeAuthService } from '../services/fake-auth.service';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto p-6">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold mb-4">Welcome, {{ username }}</h1>
        <p class="mb-6">You have successfully logged in to the Angular Seed application.</p>
        
        <div class="bg-gray-100 p-4 rounded-lg mb-6">
          <h2 class="text-xl font-semibold mb-2">User Information</h2>
          <p><span class="font-medium">Name:</span> {{ fullName }}</p>
          <p><span class="font-medium">Email:</span> {{ email }}</p>
          <p><span class="font-medium">Role:</span> {{ role }}</p>
        </div>
        
        <div class="flex space-x-4 mb-6">
          <a 
            routerLink="/users" 
            class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            User Management
          </a>
          
          <button 
            (click)="logout()" 
            class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f9fafb;
    }
  `]
})
export class HomeComponent implements OnInit {
  private authService = inject(FakeAuthService);
  private router = inject(Router);

  username = '';
  fullName = '';
  email = '';
  role = '';

  ngOnInit(): void {
    // ดึงข้อมูลผู้ใช้ที่ login อยู่
    const user = this.authService.currentUser;
    if (user) {
      this.username = user.username;
      this.fullName = user.name;
      this.email = user.email;
      this.role = user.role;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
