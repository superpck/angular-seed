import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from '../shared/services/toastr.service';

@Component({
  selector: 'app-toastr-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toastr-demo p-6 mx-auto my-8">
      <!-- Breadcrumb Navigation -->
      <nav class="pk-breadcrumbs pk-breadcrumbs-background mb-6" aria-label="Toastr demo breadcrumb navigation">
        <ol class="pk-breadcrumb-list">
          <li class="pk-breadcrumb-item">
            <button type="button" class="pk-breadcrumb-link" (click)="navigateToHome()">
              <span class="pk-breadcrumb-icon">🏠</span>
              Home
            </button>
          </li>
          <li class="pk-breadcrumb-item">
            <span class="pk-breadcrumb-text">
              <span class="pk-breadcrumb-icon">🧪</span>
              Demos
            </span>
          </li>
          <li class="pk-breadcrumb-item">
            <span class="pk-breadcrumb-text pk-breadcrumb-active" aria-current="page">
              <span class="pk-breadcrumb-icon">📢</span>
              Toastr Demo
            </span>
          </li>
        </ol>
      </nav>

      <h2 class="text-2xl font-bold mb-6">Toast Notification Demo</h2>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          class="pk-button pk-button-success"
          (click)="showSuccess()">
          Success Toast
        </button>
        
        <button 
          class="pk-button pk-button-error"
          (click)="showError()">
          Error Toast
        </button>
        
        <button 
          class="pk-button pk-button-warning"
          (click)="showWarning()">
          Warning Toast
        </button>
        
        <button 
          class="pk-button pk-button-info"
          (click)="showInfo()">
          Info Toast
        </button>
      </div>
      
      <div class="mt-8">
        <button 
          class="pk-button pk-button-primary"
          (click)="showMultiple()">
          Show Multiple Toasts
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toastr-demo {
      background-color: #f8f9fa;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class ToastrDemoComponent {
  private toastr = inject(ToastrService);
  private router = inject(Router);
  
  showSuccess(): void {
    this.toastr.success('การดำเนินการเสร็จสมบูรณ์!', 'สำเร็จ');
  }
  
  showError(): void {
    this.toastr.error('เกิดข้อผิดพลาด กรุณาลองอีกครั้ง', 'ข้อผิดพลาด');
  }
  
  showWarning(): void {
    this.toastr.warning('โปรดตรวจสอบข้อมูลของคุณก่อนดำเนินการต่อ', 'คำเตือน');
  }
  
  showInfo(): void {
    this.toastr.info('ระบบกำลังประมวลผลข้อมูลของคุณ', 'ข้อมูล');
  }
  
  showMultiple(): void {
    this.toastr.info('แสดงตัวอย่างการแจ้งเตือนหลายรายการ', 'การทดสอบ');
    
    setTimeout(() => {
      this.toastr.success('การดำเนินการเสร็จสมบูรณ์!', 'สำเร็จ');
    }, 1000);
    
    setTimeout(() => {
      this.toastr.warning('โปรดตรวจสอบข้อมูลของคุณ', 'คำเตือน');
    }, 2000);
    
    setTimeout(() => {
      this.toastr.error('พบข้อผิดพลาดในการประมวลผล', 'ข้อผิดพลาด');
    }, 3000);
  }
  
  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
