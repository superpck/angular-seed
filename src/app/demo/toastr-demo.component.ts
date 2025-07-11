import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../shared/services/toastr.service';

@Component({
  selector: 'app-toastr-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toastr-demo p-6 max-w-3xl mx-auto my-8">
      <h2 class="text-2xl font-bold mb-6">Toast Notification Demo</h2>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          (click)="showSuccess()">
          Success Toast
        </button>
        
        <button 
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          (click)="showError()">
          Error Toast
        </button>
        
        <button 
          class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          (click)="showWarning()">
          Warning Toast
        </button>
        
        <button 
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          (click)="showInfo()">
          Info Toast
        </button>
      </div>
      
      <div class="mt-8">
        <button 
          class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
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
}
