import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../shared/services/modal.service';
import { ModalModule } from '../shared/modal/modal.module';
import { ModalSize } from '../shared/models/modal.model';
import { ToastrService } from '../shared/services/toastr.service';

// Card interface
interface DemoCard {
  id: number;
  title: string;
  description: string;
  type: string;
  image: string;
}

@Component({
  selector: 'app-modal-demo',
  standalone: true,
  imports: [CommonModule, ModalModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">Modal Component Demo</h1>
      
      <!-- Modal Size Demo -->
      <div class="pk-card mb-6">
        <div class="pk-card-header">
          <h2 class="pk-card-header-title">Modal Sizes</h2>
        </div>
        <div class="pk-card-body">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            <button class="pk-button pk-button-primary" (click)="showModalSize('sm')">
              Small
            </button>
            <button class="pk-button pk-button-primary" (click)="showModalSize('md')">
              Medium (Default)
            </button>
            <button class="pk-button pk-button-primary" (click)="showModalSize('lg')">
              Large
            </button>
            <button class="pk-button pk-button-primary" (click)="showModalSize('xl')">
              Extra Large
            </button>
            <button class="pk-button pk-button-primary" (click)="showModalSize('2xl')">
              2X Large
            </button>
            <button class="pk-button pk-button-primary" (click)="showModalSize('full')">
              Full Screen
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
  `
})
export class ModalDemoComponent {
  protected modalService = inject(ModalService);
  private toastr = inject(ToastrService);
  
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
   * แสดง Modal ตามขนาดที่ระบุ
   */
  showModal(size: string, card: DemoCard): void {
    this.modalContent.title = card.title;
    this.modalContent.description = card.description;
    
    this.modalService.open({
      title: `${card.title} - Modal ขนาด ${size}`,
      size: size as ModalSize,
      closeable: true,
      closeOnBackdropClick: true,
      data: { card }
    });
  }
  
  /**
   * แสดง Modal Content ตามขนาดที่ระบุ
   */
  showModalSize(size: string): void {
    this.modalService.open({
      title: `Modal ขนาด ${size}`,
      size: size as ModalSize,
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
