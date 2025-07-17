import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalService } from '../shared/services/modal.service';
import { ModalModule } from '../shared/modal/modal.module';
import { ModalSize, ModalResult } from '../shared/models/modal.model';
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
      <!-- Breadcrumb Navigation -->
      <nav class="pk-breadcrumbs pk-breadcrumbs-background mb-6" aria-label="Modal demo breadcrumb navigation">
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
              <span class="pk-breadcrumb-icon">🪟</span>
              Modal Demo
            </span>
          </li>
        </ol>
      </nav>

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
      
      <!-- Modal With Callback Demo -->
      <div class="pk-card mb-6">
        <div class="pk-card-header">
          <h2 class="pk-card-header-title">Modal With Callback Demo</h2>
        </div>
        <div class="pk-card-body">
          <p class="mb-4">This example demonstrates how to handle the modal close event using a callback.</p>
          <button class="pk-button pk-button-primary" (click)="showModalWithCallback('md', cards[0])">
            Open Modal With Callback
          </button>
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
          <div class="pk-card-footer justify-end space-x-2">
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
export class ModalDemoComponent implements OnInit, OnDestroy {
  private modalService = inject(ModalService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  
  ngOnInit(): void {
    // Initialize modal component dynamically
    this.modalService.initialize();
    
    // Subscribe to modal close events
    this.modalService.onClose.subscribe((result: ModalResult) => {
      if (result && result.data) {
        console.log('Modal closed with data:', result.data);
      }
    });
  }
  
  ngOnDestroy(): void {
    // Clean up modal component when this component is destroyed
    this.modalService.destroyModal();
  }
  
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
   * แสดง Modal ตามขนาดที่ระบุ พร้อม handle onClose event
   */
  showModalWithCallback(size: string, card: DemoCard): void {
    this.modalContent.title = card.title;
    this.modalContent.description = card.description;
    
    // สร้าง Modal
    this.modalService.open({
      title: `${card.title} - Modal ขนาด ${size} (With Callback)`,
      size: size as ModalSize,
      closeable: true,
      closeOnBackdropClick: true,
      data: { card, withCallback: true },
      content: `
        <div class="p-4">
          <h3 class="text-lg font-medium mb-2">${card.title}</h3>
          <p class="mb-4">${card.description}</p>
          <p class="text-sm text-gray-600">ทดสอบการใช้งาน callback เมื่อปิด Modal</p>
          <div class="mt-4 bg-yellow-50 p-3 rounded border border-yellow-200">
            <p class="text-yellow-800">เมื่อปิด Modal นี้ จะมีการแสดง Toastr notification</p>
          </div>
        </div>
      `,
      footerContent: `
        <div class="flex justify-end space-x-2">
          <button class="pk-button pk-button-secondary" id="closeModalCallbackBtn">
            ปิด (ไม่มีข้อมูล)
          </button>
          <button id="closeWithDataBtn" class="pk-button pk-button-primary">
            ปิดพร้อมส่งข้อมูล
          </button>
        </div>
      `
    });
    
    // เพิ่ม event listener ให้กับปุ่มปิดพร้อมส่งข้อมูล
    setTimeout(() => {
      const closeWithDataBtn = document.getElementById('closeWithDataBtn');
      if (closeWithDataBtn) {
        closeWithDataBtn.addEventListener('click', () => this.closeModalWithData());
      }
      
      const closeModalCallbackBtn = document.getElementById('closeModalCallbackBtn');
      if (closeModalCallbackBtn) {
        closeModalCallbackBtn.addEventListener('click', () => this.modalService.close());
      }
    }, 100);
    
    // จัดการ event เมื่อ Modal ถูกปิด (specific to this Modal instance)
    const subscription = this.modalService.onClose.subscribe((result: ModalResult) => {
      if (result && result.data) {
        this.toastr.success(`Modal closed with data: ${JSON.stringify(result.data)}`, 'Success');
      } else {
        this.toastr.info('Modal closed without data', 'Info');
      }
      
      // Unsubscribe after handling this specific modal close
      subscription.unsubscribe();
    });
  }
  
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
      data: { card },
      content: `
        <div class="p-4">
          <h3 class="text-lg font-medium mb-2">${card.title}</h3>
          <p class="mb-4">${card.description}</p>
          <img src="${card.image}" alt="${card.title}" class="w-full h-40 object-cover rounded mb-4">
        </div>
      `,
      footerContent: `
        <div class="flex justify-end space-x-2">
          <button class="pk-button pk-button-sm pk-button-secondary" id="closeModalBtn">
            ปิด
          </button>
          <button class="pk-button pk-button-sm pk-button-primary">
            ตกลง
          </button>
        </div>
      `
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
      closeOnBackdropClick: true,
      content: `
        <div class="p-4">
          <p>นี่คือตัวอย่าง Modal ขนาด ${size}</p>
          <p>คุณสามารถปรับแต่งเนื้อหาภายใน Modal ได้ตามต้องการ</p>
          <div class="mt-4 p-4 bg-gray-100 rounded">
            <pre>size: '${size}'</pre>
          </div>
        </div>
      `,
      footerContent: `
        <div class="flex justify-end">
          <button class="pk-button pk-button-primary" id="closeModalSizeBtn">
            ปิด
          </button>
        </div>
      `
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
  
  /**
   * นำทางกลับไปหน้า Home
   */
  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
