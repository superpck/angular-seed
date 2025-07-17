import { Injectable, ApplicationRef, createComponent, EnvironmentInjector, inject, ComponentRef } from '@angular/core';
import { ToastrComponent } from '../toastr/toastr.component';

@Injectable({
  providedIn: 'root'
})
export class ToastrComponentFactory {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private toastrComponentRef: ComponentRef<ToastrComponent> | null = null;
  private hostElement: HTMLElement | null = null;
  
  constructor() {}
  
  /**
   * สร้าง ToastrComponent และเพิ่มเข้าไปใน DOM
   */
  create(): void {
    if (this.toastrComponentRef) return;
    
    // สร้าง host element สำหรับ toastr component
    this.hostElement = document.createElement('div');
    this.hostElement.id = 'dynamic-toastr-container';
    document.body.appendChild(this.hostElement);
    
    // สร้าง component instance แบบ dynamic
    this.toastrComponentRef = createComponent(ToastrComponent, {
      environmentInjector: this.injector,
      hostElement: this.hostElement
    });
    
    // ตรวจจับการเปลี่ยนแปลงใน Angular
    this.appRef.attachView(this.toastrComponentRef.hostView);
  }
  
  /**
   * ทำลาย ToastrComponent และลบออกจาก DOM
   */
  destroy(): void {
    if (this.toastrComponentRef) {
      this.appRef.detachView(this.toastrComponentRef.hostView);
      this.toastrComponentRef.destroy();
      this.toastrComponentRef = null;
    }
    
    if (this.hostElement) {
      document.body.removeChild(this.hostElement);
      this.hostElement = null;
    }
  }
}
