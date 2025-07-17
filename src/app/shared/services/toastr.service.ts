import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../models/toast.model';
import { ToastrComponentFactory } from './toastr-component-factory.service';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  // เก็บ toasts ในรูปแบบ BehaviorSubject เพื่อให้คอมโพเนนต์อื่นสามารถติดตามการเปลี่ยนแปลงได้
  private toasts: Toast[] = [];
  private toastSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toastSubject.asObservable();
  
  // สำหรับสร้าง component แบบ dynamic
  private componentFactory = inject(ToastrComponentFactory);
  private initialized = false;

  constructor() {
    // ไม่ initialize ทันที เพื่อหลีกเลี่ยง circular dependency
  }
  
  /**
   * เริ่มต้นการทำงานของ ToastrService โดยสร้าง ToastrComponent
   */
  initialize(): void {
    if (this.initialized) return;
    
    // ใช้ factory สร้าง component
    this.componentFactory.create();
    this.initialized = true;
  }

  // เพิ่ม toast ใหม่
  show(toast: Toast): string {
    // ตรวจสอบว่าได้ initialize แล้วหรือไม่
    if (!this.initialized) {
      this.initialize();
    }
    
    const id = this.generateId();
    const newToast: Toast = {
      id,
      autoClose: toast.autoClose !== false, // เปิดใช้ autoClose เป็นค่าเริ่มต้น
      duration: toast.duration || 5000, // ระยะเวลาแสดงผลเริ่มต้น 5 วินาที
      ...toast
    };

    this.toasts = [...this.toasts, newToast];
    this.toastSubject.next(this.toasts);

    // ตั้งเวลาปิด toast อัตโนมัติ ถ้า autoClose เป็น true
    if (newToast.autoClose) {
      setTimeout(() => {
        this.remove(id);
      }, newToast.duration);
    }

    return id;
  }

  // แสดง success toast
  success(message: string, title?: string, options?: Partial<Toast>): string {
    return this.show({
      type: 'success',
      message,
      title: title || 'สำเร็จ',
      ...options
    });
  }

  // แสดง error toast
  error(message: string, title?: string, options?: Partial<Toast>): string {
    return this.show({
      type: 'error',
      message,
      title: title || 'ข้อผิดพลาด',
      ...options
    });
  }

  // แสดง info toast
  info(message: string, title?: string, options?: Partial<Toast>): string {
    return this.show({
      type: 'info',
      message,
      title: title || 'ข้อมูล',
      ...options
    });
  }

  // แสดง warning toast
  warning(message: string, title?: string, options?: Partial<Toast>): string {
    return this.show({
      type: 'warning',
      message,
      title: title || 'คำเตือน',
      ...options
    });
  }

  // ลบ toast ด้วย id
  remove(id: string): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.toastSubject.next(this.toasts);
  }

  // ล้าง toasts ทั้งหมด
  clear(): void {
    this.toasts = [];
    this.toastSubject.next(this.toasts);
  }

  // สร้าง id สำหรับ toast
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 5);
  }
  
  /**
   * ทำลาย ToastrComponent
   */
  destroyToastr(): void {
    this.componentFactory.destroy();
    this.initialized = false;
  }
}
