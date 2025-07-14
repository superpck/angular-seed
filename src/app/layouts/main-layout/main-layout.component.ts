import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavComponent } from '../../nav/nav.component';
import { FooterComponent } from '../../footer/footer.component';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  sideNavCollapsed = false;
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    // ตรวจสอบว่าได้ login แล้วหรือไม่
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }

    // ตรวจสอบการเปลี่ยนเส้นทาง
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Logic if needed after navigation
    });
  }

  // รับการเปลี่ยนแปลงสถานะของ side nav จาก NavComponent
  onSideNavCollapsedChange(collapsed: boolean): void {
    this.sideNavCollapsed = collapsed;
  }
}
