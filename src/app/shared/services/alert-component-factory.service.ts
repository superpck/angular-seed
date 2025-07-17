import { Injectable, ApplicationRef, createComponent, EnvironmentInjector, inject } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertComponentFactory {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private alertComponentRef: ReturnType<typeof createComponent<AlertComponent>> | null = null;
  private hostElement: HTMLElement | null = null;
  
  constructor() {}
  
  create(): void {
    if (this.alertComponentRef) return;
    
    // สร้าง host element สำหรับ alert component
    this.hostElement = document.createElement('div');
    this.hostElement.id = 'dynamic-alert-container';
    document.body.appendChild(this.hostElement);
    
    // สร้าง component instance แบบ dynamic
    this.alertComponentRef = createComponent(AlertComponent, {
      environmentInjector: this.injector,
      hostElement: this.hostElement
    });
    
    // ตรวจจับการเปลี่ยนแปลงใน Angular
    this.appRef.attachView(this.alertComponentRef.hostView);
  }
  
  destroy(): void {
    if (this.alertComponentRef) {
      this.appRef.detachView(this.alertComponentRef.hostView);
      this.alertComponentRef.destroy();
      this.alertComponentRef = null;
    }
    
    if (this.hostElement) {
      document.body.removeChild(this.hostElement);
      this.hostElement = null;
    }
  }
}
