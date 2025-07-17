import { Injectable, ApplicationRef, createComponent, EnvironmentInjector, inject, ComponentRef } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalComponentFactory {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private modalComponentRef: ComponentRef<ModalComponent> | null = null;
  private hostElement: HTMLElement | null = null;
  
  constructor() {}
  
  /**
   * สร้าง ModalComponent และเพิ่มเข้าไปใน DOM
   */
  create(): ComponentRef<ModalComponent> {
    if (!this.modalComponentRef) {
      // สร้าง host element สำหรับ modal component
      this.hostElement = document.createElement('div');
      this.hostElement.id = 'dynamic-modal-container';
      document.body.appendChild(this.hostElement);
      
      // สร้าง component instance แบบ dynamic
      this.modalComponentRef = createComponent(ModalComponent, {
        environmentInjector: this.injector,
        hostElement: this.hostElement
      });
      
      // ตรวจจับการเปลี่ยนแปลงใน Angular
      this.appRef.attachView(this.modalComponentRef.hostView);
    }
    
    return this.modalComponentRef;
  }
  
  /**
   * ทำลาย ModalComponent และลบออกจาก DOM
   */
  destroy(): void {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef.destroy();
      this.modalComponentRef = null;
    }
    
    if (this.hostElement && this.hostElement.parentNode) {
      this.hostElement.parentNode.removeChild(this.hostElement);
      this.hostElement = null;
    }
  }
}
