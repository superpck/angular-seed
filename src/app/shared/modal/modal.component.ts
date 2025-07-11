import { Component, inject, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../services/modal.service';
import { ModalSize } from '../models/modal.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.95)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'scale(0.95)', opacity: 0 }))
      ])
    ])
  ]
})
export class ModalComponent implements OnDestroy {
  private modalService = inject(ModalService);
  private prevModalState = false;
  
  // Expose modal state to the template
  protected readonly modal = this.modalService.modal;
  
  constructor() {
    // ใช้ effect เพื่อติดตามการเปลี่ยนแปลงของ modal state
    effect(() => {
      const currentState = this.modal().show;
      
      // ถ้าสถานะเปลี่ยนแปลง
      if (currentState !== this.prevModalState) {
        if (currentState) {
          this.lockBodyScroll();
        } else {
          this.unlockBodyScroll();
        }
        this.prevModalState = currentState;
      }
    });
  }
  
  ngOnDestroy(): void {
    // คืนค่า body style เมื่อ component ถูกทำลาย
    this.unlockBodyScroll();
  }
  
  /**
   * ล็อค scroll ของ body เมื่อ modal เปิด
   */
  private lockBodyScroll(): void {
    const body = document.body;
    const scrollY = window.scrollY;
    
    // เก็บตำแหน่ง scroll ปัจจุบันเพื่อกลับมาที่ตำแหน่งเดิมเมื่อปิด modal
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflowY = 'scroll';
  }
  
  /**
   * ปลดล็อค scroll ของ body เมื่อปิด modal
   */
  private unlockBodyScroll(): void {
    const body = document.body;
    const scrollY = body.style.top ? parseInt(body.style.top.replace('-', '')) : 0;
    
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    body.style.overflowY = '';
    
    // กลับไปยังตำแหน่ง scroll เดิม
    window.scrollTo(0, scrollY);
  }
  
  /**
   * Get the CSS class for the modal based on the size
   */
  getModalSizeClass(size: ModalSize | undefined): string {
    if (!size) return 'pk-modal-md';
    
    switch (size) {
      case 'sm':
        return 'pk-modal-sm';
      case 'lg':
        return 'pk-modal-lg';
      case 'xl':
        return 'pk-modal-xl';
      case '2xl':
        return 'pk-modal-2xl';
      case 'full':
        return 'pk-modal-full';
      default:
        return 'pk-modal-md';
    }
  }
  
  /**
   * Close the modal when clicking on the backdrop
   * Only closes if closeOnBackdropClick is true
   */
  onBackdropClick(): void {
    if (this.modal().config?.closeOnBackdropClick) {
      this.close();
    }
  }
  
  /**
   * Prevent event propagation when clicking on the modal content
   */
  onModalClick(event: MouseEvent): void {
    event.stopPropagation();
  }
  
  /**
   * Close the modal
   */
  close(): void {
    this.modalService.close();
  }
}
