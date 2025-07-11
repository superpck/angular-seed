# Alert Modals

Alert Modals เป็นคอมโพเนนต์ที่ใช้สำหรับแสดงกล่องข้อความเตือนแบบ modal ที่จะปรากฏตรงกลางหน้าจอพร้อม backdrop ทึบแสง

## การใช้งาน

การใช้งาน Alert ทำได้ผ่าน `AlertService` โดยการ inject service เข้าไปในคอมโพเนนต์ที่ต้องการใช้งาน

### การแสดง Alert ประเภทต่างๆ

```typescript
import { Component, inject } from '@angular/core';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-alert-example',
  template: `
    <div class="space-y-4">
      <button class="pk-button pk-button-success" (click)="showSuccessAlert()">Success Alert</button>
      <button class="pk-button pk-button-error" (click)="showErrorAlert()">Error Alert</button>
      <button class="pk-button pk-button-warning" (click)="showWarningAlert()">Warning Alert</button>
      <button class="pk-button pk-button-info" (click)="showInfoAlert()">Info Alert</button>
      <button class="pk-button pk-button-primary" (click)="showConfirmAlert()">Confirm Dialog</button>
    </div>
  `
})
export class AlertExampleComponent {
  private alertService = inject(AlertService);
  
  showSuccessAlert(): void {
    this.alertService.success('การดำเนินการเสร็จสมบูรณ์!');
  }
  
  showErrorAlert(): void {
    this.alertService.error('เกิดข้อผิดพลาดในการดำเนินการ กรุณาลองอีกครั้ง');
  }
  
  showWarningAlert(): void {
    this.alertService.warning('โปรดตรวจสอบข้อมูลก่อนดำเนินการต่อ');
  }
  
  showInfoAlert(): void {
    this.alertService.info('ระบบกำลังอัปเดตข้อมูล กรุณารอสักครู่');
  }
  
  showConfirmAlert(): void {
    this.alertService.confirm(
      'คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้? การกระทำนี้ไม่สามารถเรียกคืนได้',
      () => {
        console.log('ผู้ใช้ยืนยันการลบข้อมูล');
      },
      () => {
        console.log('ผู้ใช้ยกเลิกการลบข้อมูล');
      }
    );
  }
}
```

## ประเภทของ Alert

Alert มี 5 ประเภทให้เลือกใช้:

1. **success** - สีเขียว ใช้สำหรับแสดงข้อความว่าการทำงานสำเร็จ
2. **error** - สีแดง ใช้สำหรับแสดงข้อความข้อผิดพลาด
3. **warning** - สีเหลือง ใช้สำหรับแสดงข้อความเตือน
4. **info** - สีฟ้า ใช้สำหรับแสดงข้อมูลทั่วไป
5. **confirm** - สีม่วง ใช้สำหรับขอการยืนยันจากผู้ใช้ (มีปุ่มตกลงและยกเลิก)

## การใช้งาน Confirm Dialog

Confirm Dialog แตกต่างจาก Alert ทั่วไปตรงที่มีปุ่มสองปุ่ม (ตกลงและยกเลิก) และรับ callback functions สำหรับจัดการกับการกระทำของผู้ใช้:

```typescript
this.alertService.confirm(
  'ข้อความที่ต้องการให้ผู้ใช้ยืนยัน',
  () => {
    // ฟังก์ชันที่จะทำงานเมื่อผู้ใช้กด "ตกลง"
  },
  () => {
    // ฟังก์ชันที่จะทำงานเมื่อผู้ใช้กด "ยกเลิก" (เป็นตัวเลือก)
  }
);
```

## การกำหนดข้อความปุ่ม

คุณสามารถกำหนดข้อความของปุ่มใน Confirm Dialog ได้โดยส่งพารามิเตอร์เพิ่มเติม:

```typescript
this.alertService.confirm(
  'คุณต้องการเปลี่ยนแปลงการตั้งค่าหรือไม่?',
  () => {
    // ฟังก์ชันเมื่อกดปุ่มใช่
  },
  () => {
    // ฟังก์ชันเมื่อกดปุ่มไม่
  },
  'ใช่, เปลี่ยนแปลง', // ข้อความปุ่มตกลง
  'ไม่, ยกเลิก'        // ข้อความปุ่มยกเลิก
);
```

## ไอคอน Emoji

Alert แต่ละประเภทจะมีไอคอน emoji ที่แตกต่างกัน:

- success: ✅
- error: ❌
- warning: ⚠️
- info: ℹ️
- confirm: ❓

## การซ้อนทับกันของ Alert

ระบบรองรับเพียง 1 Alert ในเวลาเดียวกัน หากมีการเรียกใช้ Alert ใหม่ในขณะที่ยังมี Alert แสดงอยู่ Alert เก่าจะถูกปิดโดยอัตโนมัติ

## การปิด Alert ด้วยการกดปุ่ม Escape

ผู้ใช้สามารถปิด Alert ได้โดยการกดปุ่ม Escape บนคีย์บอร์ด (ยกเว้น Confirm Dialog ที่ต้องการการตัดสินใจจากผู้ใช้)

## ตัวอย่างการดูได้ที่หน้าตัวอย่าง

คุณสามารถดูตัวอย่างการใช้งาน Alert ได้ที่หน้า `/alert-demo` ในแอปพลิเคชัน
