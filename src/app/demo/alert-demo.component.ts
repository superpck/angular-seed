import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../shared/services/alert.service';
import { ToastrService } from '../shared/services/toastr.service';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="demo-container p-6 max-w-3xl mx-auto my-8">
      <h2 class="text-2xl font-bold mb-6">Alert & Toastr Demo</h2>
      
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-4">Alert Demos</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            (click)="showSuccessAlert()">
            Success Alert
          </button>
          
          <button 
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            (click)="showErrorAlert()">
            Error Alert
          </button>
          
          <button 
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            (click)="showWarningAlert()">
            Warning Alert
          </button>
          
          <button 
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            (click)="showInfoAlert()">
            Info Alert
          </button>
        </div>
        
        <div class="mt-4">
          <button 
            class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
            (click)="showConfirmAlert()">
            Confirm Dialog
          </button>
        </div>
      </div>
      
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-4">Toastr Demos</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            (click)="showSuccessToast()">
            Success Toast
          </button>
          
          <button 
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            (click)="showErrorToast()">
            Error Toast
          </button>
          
          <button 
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            (click)="showWarningToast()">
            Warning Toast
          </button>
          
          <button 
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            (click)="showInfoToast()">
            Info Toast
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      background-color: #f8f9fa;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class AlertDemoComponent {
  private alertService = inject(AlertService);
  private toastrService = inject(ToastrService);
  
  // Alert Demo Methods
  showSuccessAlert(): void {
    this.alertService.success('การดำเนินการเสร็จสมบูรณ์!');
  }
  
  showErrorAlert(): void {
    this.alertService.error('เกิดข้อผิดพลาดในการดำเนินการ กรุณาลองอีกครั้ง');
  }
  
  showWarningAlert(): void {
    this.alertService.warning('โปรดตรวจสอบข้อมูลก่อนดำเนินการต่อ');
  }
  
  showInfoAlert(): void {
    this.alertService.info('ระบบกำลังอัปเดตข้อมูล กรุณารอสักครู่');
  }
  
  showConfirmAlert(): void {
    this.alertService.confirm(
      'คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้? การกระทำนี้ไม่สามารถเรียกคืนได้',
      () => {
        this.toastrService.success('ลบข้อมูลเรียบร้อยแล้ว', 'สำเร็จ');
      },
      () => {
        this.toastrService.info('ยกเลิกการลบข้อมูล', 'ยกเลิก');
      }
    );
  }
  
  // Toastr Demo Methods
  showSuccessToast(): void {
    this.toastrService.success('การดำเนินการเสร็จสมบูรณ์!', 'สำเร็จ');
  }
  
  showErrorToast(): void {
    this.toastrService.error('เกิดข้อผิดพลาด กรุณาลองอีกครั้ง', 'ข้อผิดพลาด');
  }
  
  showWarningToast(): void {
    this.toastrService.warning('โปรดตรวจสอบข้อมูลของคุณก่อนดำเนินการต่อ', 'คำเตือน');
  }
  
  showInfoToast(): void {
    this.toastrService.info('ระบบกำลังประมวลผลข้อมูลของคุณ', 'ข้อมูล');
  }
}
