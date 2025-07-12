import { Component, inject, HostListener } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FakeAuthService } from '../services/fake-auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Output() sideNavCollapsedChange = new EventEmitter<boolean>();
  onProfileDropdownMouseLeave() {
    // ซ่อน dropdown เฉพาะเมื่อ mouse ออกและ dropdown ไม่ถูกเปิดด้วยคลิก
    if (this.showProfileDropdown) {
      setTimeout(() => {
        // ถ้า mouse ไม่กลับเข้ามาใน dropdown ภายใน 200ms ให้ซ่อน
        this.showProfileDropdown = false;
      }, 200);
    }
  }
  showProfileDropdown = false;
  private authService = inject(FakeAuthService);
  private router = inject(Router);
  
  sideNavOpen = false; // สถานะของ sidenav
  sideNavCollapsed = false; // สถานะของ sidenav เมื่อย่อ
  
  // กำหนดค่าเริ่มต้นตามขนาดหน้าจอ
  constructor() {
    // Initialize menu state based on screen size
    this.checkScreenSize();
  }
  
  // ฟังก์ชันสำหรับการ resize หน้าจอ
  @HostListener('window:resize')
  checkScreenSize(): void {
    if (window.innerWidth >= 1024) {
      // บนหน้าจอขนาดใหญ่ให้แสดงเมนูเสมอ
      this.sideNavOpen = true;
    } else {
      // บนมือถือให้ซ่อนเมนู
      this.sideNavOpen = false;
    }
  }
  
  // ข้อมูลผู้ใช้
  get currentUser() {
    return this.authService.currentUser;
  }
  
  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      route: '/home'
    },
    {
      label: 'User Management',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      route: '/users'
    },
    {
      label: 'Components',
      icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      expanded: false,
      children: [
        {
          label: 'Toastr',
          icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
          route: '/toastr-demo'
        },
        {
          label: 'Alert',
          icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
          route: '/alert-demo'
        },
        {
          label: 'Icons',
          icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
          route: '/icons-demo'
        },
        {
          label: 'Modal',
          icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
          route: '/modal-demo'
        },
        {
          label: 'Grid',
          icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
          route: '/grid-demo'
        },
        {
          label: 'Drag & Drop',
          icon: 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4',
          route: '/drag-drop-demo'
        },
        {
          label: 'Badges',
          icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
          route: '/badges-demo'
        },
        {
          label: 'Breadcrumbs',
          icon: 'M9 5l7 7-7 7',
          route: '/breadcrumbs-demo'
        }
      ]
    },
    {
      label: 'Reports',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      route: '#'
    },
    {
      label: 'Settings',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      route: '#'
    }
  ];
  
  toggleSideNav(): void {
    this.sideNavOpen = !this.sideNavOpen;
  }
  
  toggleSideNavCollapse(): void {
    this.sideNavCollapsed = !this.sideNavCollapsed;
    this.sideNavCollapsedChange.emit(this.sideNavCollapsed);
  }
  
  toggleSubmenu(item: MenuItem, event?: Event): void {
    if (event) {
      event.stopPropagation(); // ป้องกันการทำงานของการนำทาง
    }
    // Close any other open submenus (optional - uncomment if you want only one submenu open at a time)
    // this.menuItems.forEach(menuItem => {
    //   if (menuItem !== item && menuItem.children) {
    //     menuItem.expanded = false;
    //   }
    // });
    
    item.expanded = !item.expanded;
  }
  
  // แก้ไขสำหรับมือถือ - ปิดเมนูหลังจากเลือกรายการ
  navigateOnMobile(route: string): void {
    if (route && route !== '#') {
      if (window.innerWidth < 1024) { // lg breakpoint
        // Small delay to ensure the click event is completed before closing the menu
        setTimeout(() => {
          this.sideNavOpen = false;
        }, 100);
      }
      this.router.navigate([route]);
    }
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
