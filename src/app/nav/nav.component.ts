import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FakeAuthService } from '../services/fake-auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  private authService = inject(FakeAuthService);
  private router = inject(Router);
  
  sideNavOpen = false; // สถานะของ sidenav
  
  // ข้อมูลผู้ใช้
  get currentUser() {
    return this.authService.currentUser;
  }
  
  toggleSideNav(): void {
    this.sideNavOpen = !this.sideNavOpen;
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
