import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../shared/services/toastr.service';
import { AlertService } from '../shared/services/alert.service';
import { ModalService } from '../shared/services/modal.service';
import { ModalModule } from '../shared/modal/modal.module';
import { ModalSize } from '../shared/models/modal.model';

// ประเภทการ์ด
interface DemoCard {
  id: number;
  title: string;
  description: string;
  type: string;
  image: string;
}

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, ModalModule],
  template: `
    <div class="container w-full mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">Component Demo</h1>
      
      <!-- Toastr Demo -->
      <div class="pk-card mb-6">
        <div class="pk-card-header">
          <h2 class="pk-card-header-title">Toastr Messages</h2>
        </div>
        <div class="pk-card-body">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button class="pk-button pk-button-success" (click)="showToastr('success')">
              Success
            </button>
            <button class="pk-button pk-button-error" (click)="showToastr('error')">
              Error
            </button>
            <button class="pk-button pk-button-warning" (click)="showToastr('warning')">
              Warning
            </button>
            <button class="pk-button pk-button-info" (click)="showToastr('info')">
              Info
            </button>
          </div>
        </div>
      </div>
      
      <!-- Alert Demo -->
      <div class="pk-card mb-6">
        <div class="pk-card-header">
          <h2 class="pk-card-header-title">Alert Messages</h2>
        </div>
        <div class="pk-card-body">
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
            <button class="pk-button pk-button-outline pk-button-success" (click)="showAlert('success')">
              Success
            </button>
            <button class="pk-button pk-button-outline pk-button-error" (click)="showAlert('error')">
              Error
            </button>
            <button class="pk-button pk-button-outline pk-button-warning" (click)="showAlert('warning')">
              Warning
            </button>
            <button class="pk-button pk-button-outline pk-button-info" (click)="showAlert('info')">
              Info
            </button>
            <button class="pk-button pk-button-outline pk-button-primary" (click)="showAlert('confirm')">
              Confirm
            </button>
          </div>
        </div>
      </div>
      
      <!-- Cards with Modal Demo -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div *ngFor="let card of cards" class="pk-card">
          <div class="pk-card-header" [ngClass]="'bg-' + card.type + '-50'">
            <h3 class="pk-card-header-title">{{ card.title }}</h3>
          </div>
          <div class="pk-card-body">
            <img [src]="card.image" [alt]="card.title" class="w-full h-40 object-cover mb-4 rounded">
            <p>{{ card.description }}</p>
          </div>
          <div class="pk-card-footer flex justify-end space-x-2">
            <button 
              class="pk-button pk-button-sm" 
              [ngClass]="'pk-button-' + card.type"
              (click)="showModal('sm', card)">
              Small
            </button>
            <button 
              class="pk-button pk-button-sm pk-button-outline" 
              [ngClass]="'pk-button-' + card.type"
              (click)="showModal('md', card)">
              Medium
            </button>
            <button 
              class="pk-button pk-button-sm" 
              [ngClass]="'pk-button-' + card.type"
              (click)="showModal('lg', card)">
              Large
            </button>
            <button 
              class="pk-button pk-button-sm pk-button-outline" 
              [ngClass]="'pk-button-' + card.type"
              (click)="showModal('xl', card)">
              XL
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pk-card {
      @apply bg-white rounded-lg shadow-md overflow-hidden;
    }
    .pk-card-header {
      @apply p-4 border-b;
    }
    .pk-card-header-title {
      @apply text-lg font-semibold;
    }
    .pk-card-body {
      @apply p-4;
    }
    .pk-card-footer {
      @apply p-4 border-t;
    }
  `]
})
export class DemoComponent {
  private toastr = inject(ToastrService);
  private alertService = inject(AlertService);
  protected modalService = inject(ModalService);

  // ข้อมูลสำหรับแสดงใน Modal
  modalContent = {
    title: 'รายละเอียดข้อมูล',
    description: 'นี่คือรายละเอียดข้อมูลที่คุณเลือก',
    footer: 'ข้อมูลเพิ่มเติมสามารถดูได้ที่เอกสารประกอบ'
  };

  // ข้อมูลตัวอย่าง
  cards: DemoCard[] = [
    {
      id: 1,
      title: 'บัตร Component',
      description: 'ตัวอย่างการใช้งาน pk-card สำหรับแสดงข้อมูลที่มี header, body และ footer',
      type: 'info',
      image: 'https://picsum.photos/300/200?random=1'
    },
    {
      id: 2,
      title: 'ปุ่ม Component',
      description: 'ตัวอย่างการใช้งานปุ่มต่างๆ เช่น pk-button-primary, pk-button-success',
      type: 'success',
      image: 'https://picsum.photos/300/200?random=2'
    },
    {
      id: 3,
      title: 'Modal Component',
      description: 'ตัวอย่างการใช้งาน Modal สำหรับแสดงข้อมูลแบบ popup',
      type: 'warning',
      image: 'https://picsum.photos/300/200?random=3'
    },
    {
      id: 4,
      title: 'Alert และ Toastr',
      description: 'ตัวอย่างการใช้งาน Alert และ Toastr สำหรับแสดงข้อความแจ้งเตือน',
      type: 'error',
      image: 'https://picsum.photos/300/200?random=4'
    }
  ];

  /**
   * แสดง Toastr ตามประเภทที่ระบุ
   */
  showToastr(type: string): void {
    switch (type) {
      case 'success':
        this.toastr.success('นี่คือข้อความแจ้งเตือนแบบ Success', 'สำเร็จ');
        break;
      case 'error':
        this.toastr.error('นี่คือข้อความแจ้งเตือนแบบ Error', 'ข้อผิดพลาด');
        break;
      case 'warning':
        this.toastr.warning('นี่คือข้อความแจ้งเตือนแบบ Warning', 'คำเตือน');
        break;
      case 'info':
        this.toastr.info('นี่คือข้อความแจ้งเตือนแบบ Info', 'ข้อมูล');
        break;
      default:
        this.toastr.info('นี่คือข้อความแจ้งเตือนทั่วไป', 'ข้อมูล');
    }
  }

  /**
   * แสดง Alert ตามประเภทที่ระบุ
   */
  showAlert(type: string): void {
    switch (type) {
      case 'success':
        this.alertService.success('การทำงานสำเร็จ', 'ระบบได้บันทึกข้อมูลของคุณเรียบร้อยแล้ว');
        break;
      case 'error':
        this.alertService.error('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
        break;
      case 'warning':
        this.alertService.warning('คำเตือน', 'คุณกำลังจะทำรายการที่ไม่สามารถยกเลิกได้');
        break;
      case 'info':
        this.alertService.info('ข้อมูล', 'นี่คือข้อมูลเพิ่มเติมสำหรับคุณ');
        break;
      case 'confirm':
        this.alertService.confirm(
          'คุณต้องการดำเนินการต่อหรือไม่?',
          () => this.toastr.success('คุณได้ยืนยันการดำเนินการ', 'ยืนยัน'),
          () => this.toastr.info('คุณได้ยกเลิกการดำเนินการ', 'ยกเลิก')
        );
        break;
      default:
        this.alertService.info('ข้อมูล', 'นี่คือข้อมูลเพิ่มเติมสำหรับคุณ');
    }
  }

  /**
   * แสดง Modal ตามขนาดที่ระบุ
   */
  showModal(size: ModalSize, card: DemoCard): void {
    this.modalContent.title = card.title;
    this.modalContent.description = card.description;

    this.modalService.open({
      title: `${card.title} - Modal ขนาด ${size}`,
      size: size,
      closeable: true,
      closeOnBackdropClick: true,
      data: { card }
    });
  }

  /**
   * แสดง Modal Content ตามขนาดที่ระบุ
   */
  showModalSize(size: ModalSize): void {
    this.modalService.open({
      title: `Modal ขนาด ${size}`,
      size: size,
      closeable: true,
      closeOnBackdropClick: true
    });
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