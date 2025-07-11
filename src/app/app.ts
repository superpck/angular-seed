import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ToastrComponent } from './shared/toastr/toastr.component';
import { AlertComponent } from './shared/alert/alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, CommonModule, ToastrComponent, AlertComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-seed';
  protected isLoginPage = false;
  private router = inject(Router);
  
  constructor() {
    // ตรวจสอบว่าปัจจุบันอยู่ที่หน้า login หรือไม่
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLoginPage = event.url === '/login';
    });
    
    // ตั้งค่าเริ่มต้น
    this.isLoginPage = this.router.url === '/login';
  }
}
