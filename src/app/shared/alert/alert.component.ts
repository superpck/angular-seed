import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../services/alert.service';
import { AlertType } from '../models/alert.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class AlertComponent {
  private alertService = inject(AlertService);
  
  // เข้าถึง state ของ alert
  protected readonly alert = this.alertService.alert;
  
  // สำหรับตรวจสอบว่าเป็น confirm dialog หรือไม่
  isConfirmDialog(type: AlertType | undefined): boolean {
    return type === 'confirm';
  }
  
  // ดึงไอคอนตามประเภทของ alert
  getIcon(type: AlertType | undefined): string {
    if (!type) return '';
    
    switch (type) {
      case 'success':
        return `
          <div class="flex flex-col items-center">
            <div class="text-4xl mb-2">✅</div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        `;
      case 'error':
        return `
          <div class="flex flex-col items-center">
            <div class="text-4xl mb-2">❌</div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        `;
      case 'warning':
        return `
          <div class="flex flex-col items-center">
            <div class="text-4xl mb-2">⚠️</div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        `;
      case 'info':
        return `
          <div class="flex flex-col items-center">
            <div class="text-4xl mb-2">ℹ️</div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        `;
      case 'confirm':
        return `
          <div class="flex flex-col items-center">
            <div class="text-4xl mb-2">❓</div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        `;
      default:
        return '';
    }
  }
  
  // ดึงคลาสของ alert ตามประเภท
  getAlertClass(type: AlertType | undefined): string {
    if (!type) return '';
    
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-error';
      case 'warning':
        return 'alert-warning';
      case 'info':
        return 'alert-info';
      case 'confirm':
        return 'alert-confirm';
      default:
        return '';
    }
  }
  
  // เรียกเมื่อกดปุ่มปิด
  close(): void {
    this.alertService.close();
  }
  
  // เรียกเมื่อกดปุ่มยืนยัน
  confirm(): void {
    this.alertService.handleConfirm();
  }
  
  // เรียกเมื่อกดปุ่มยกเลิก
  cancel(): void {
    this.alertService.handleCancel();
  }
}
