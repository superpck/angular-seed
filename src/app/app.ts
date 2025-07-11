import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ToastrComponent } from './shared/toastr/toastr.component';
import { AlertComponent } from './shared/alert/alert.component';
import { ModalModule } from './shared/modal/modal.module';
import { ModalService } from './shared/services/modal.service';
import { ToastrService } from './shared/services/toastr.service';

// Define type for modal data
interface CardData {
  id: number;
  title: string;
  description: string;
  type: string;
  image: string;
}

interface ModalData {
  card?: CardData;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, CommonModule, ToastrComponent, AlertComponent, ModalModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-seed';
  protected isLoginPage = false;
  private router = inject(Router);
  protected modalService = inject(ModalService);
  private toastr = inject(ToastrService);
  
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
  
  /**
   * รับข้อมูล card จาก modal data
   */
  getCardData(): CardData | undefined {
    const data = this.modalService.modal().config?.data as ModalData;
    return data?.card;
  }
  
  /**
   * ปิด Modal พร้อมส่งข้อมูลกลับ
   */
  closeModalWithData(): void {
    this.modalService.close({ 
      action: 'close_with_data', 
      data: { timestamp: new Date() } 
    });
    this.toastr.info('Modal ถูกปิดพร้อมส่งข้อมูลกลับ', 'Modal ถูกปิด');
  }
}
