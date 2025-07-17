import { Injectable, signal, inject } from '@angular/core';
import { ModalConfig, ModalState, ModalResult } from '../models/modal.model';
import { Subject, Observable } from 'rxjs';
import { ModalComponentFactory } from './modal-component-factory.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // Modal state signal
  private modalState = signal<ModalState>({ show: false });
  
  // Observable for close and data events
  private closeSubject = new Subject<ModalResult>();
  
  // Public signal for components to access
  public modal = this.modalState.asReadonly();
  
  // Public observable for close events
  public onClose: Observable<ModalResult> = this.closeSubject.asObservable();
  
  // สำหรับสร้าง component แบบ dynamic
  private componentFactory = inject(ModalComponentFactory);
  private initialized = false;
  
  constructor() {
    // ไม่ initialize ทันที เพื่อหลีกเลี่ยง circular dependency
  }
  
  /**
   * เริ่มต้นการทำงานของ ModalService โดยสร้าง ModalComponent
   */
  initialize(): void {
    if (this.initialized) return;
    
    // ใช้ factory สร้าง component
    this.componentFactory.create();
    this.initialized = true;
  }
  
  /**
   * Open the modal with the provided configuration
   */
  open(config: ModalConfig = {}): void {
    // ตรวจสอบว่าได้ initialize แล้วหรือไม่
    if (!this.initialized) {
      this.initialize();
    }
    
    // Set default values if not provided
    const defaultConfig: ModalConfig = {
      size: 'md',
      closeable: true,
      closeOnBackdropClick: true,
      ...config
    };
    
    this.modalState.set({ show: true, config: defaultConfig });
  }
  
  /**
   * Close the modal and optionally pass data to the component that opened it
   */
  close(result?: ModalResult): void {
    this.modalState.set({ show: false });
    this.closeSubject.next(result || {});
  }
  
  /**
   * ทำลาย ModalComponent
   */
  destroyModal(): void {
    this.componentFactory.destroy();
    this.initialized = false;
  }
}
