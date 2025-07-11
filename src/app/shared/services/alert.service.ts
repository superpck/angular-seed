import { Injectable, signal } from '@angular/core';
import { AlertConfig, AlertState } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // สร้าง signal สำหรับ state ของ alert
  private alertState = signal<AlertState>({
    show: false,
    config: null
  });

  // Expose state as readonly
  readonly alert = this.alertState.asReadonly();

  // แสดง Alert
  show(config: AlertConfig): void {
    // ตั้งค่าเริ่มต้นถ้าไม่ได้กำหนด
    const defaultConfig = {
      ...config,
      confirmText: config.confirmText || 'ตกลง',
      cancelText: config.cancelText || 'ยกเลิก',
      autoClose: config.type !== 'confirm' && config.autoClose !== false,
      duration: config.duration || 5000 // 5 วินาทีเป็นค่าเริ่มต้น
    };

    // อัปเดต state เพื่อแสดง alert
    this.alertState.set({
      show: true,
      config: defaultConfig
    });

    // ปิดอัตโนมัติสำหรับ alerts ที่ไม่ใช่ confirm
    if (defaultConfig.autoClose) {
      setTimeout(() => {
        this.close();
      }, defaultConfig.duration);
    }
  }

  // ปิด Alert
  close(): void {
    this.alertState.set({
      show: false,
      config: null
    });
  }

  // Helper methods สำหรับประเภท Alert ต่างๆ
  success(message: string, title?: string, duration?: number): void {
    this.show({
      type: 'success',
      title: title || 'สำเร็จ',
      message,
      duration
    });
  }

  warning(message: string, title?: string, duration?: number): void {
    this.show({
      type: 'warning',
      title: title || 'คำเตือน',
      message,
      duration
    });
  }

  error(message: string, title?: string, duration?: number): void {
    this.show({
      type: 'error',
      title: title || 'ข้อผิดพลาด',
      message,
      duration
    });
  }

  info(message: string, title?: string, duration?: number): void {
    this.show({
      type: 'info',
      title: title || 'ข้อมูล',
      message,
      duration
    });
  }

  // สำหรับการยืนยันการดำเนินการ
  confirm(
    message: string, 
    onConfirm?: () => void, 
    onCancel?: () => void, 
    title?: string, 
    confirmText?: string, 
    cancelText?: string
  ): void {
    this.show({
      type: 'confirm',
      title: title || 'ยืนยันการดำเนินการ',
      message,
      confirmText,
      cancelText,
      onConfirm,
      onCancel,
      autoClose: false
    });
  }

  // เรียกเมื่อกดปุ่มยืนยัน
  handleConfirm(): void {
    const config = this.alertState().config;
    
    if (config?.onConfirm) {
      config.onConfirm();
    }
    
    this.close();
  }

  // เรียกเมื่อกดปุ่มยกเลิก
  handleCancel(): void {
    const config = this.alertState().config;
    
    if (config?.onCancel) {
      config.onCancel();
    }
    
    this.close();
  }
}
