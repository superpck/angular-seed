# Toastr Notifications

Toastr เป็นคอมโพเนนต์ที่ใช้สำหรับแสดงการแจ้งเตือนแบบชั่วคราวที่มุมบนขวาของหน้าจอ

## การใช้งาน

การใช้งาน Toastr ทำได้ผ่าน `ToastrService` โดยการ inject service เข้าไปในคอมโพเนนต์ที่ต้องการใช้งาน

### การแสดง Toastr ประเภทต่างๆ

```typescript
import { Component, inject } from '@angular/core';
import { ToastrService } from '../shared/services/toastr.service';

@Component({
  selector: 'app-toastr-example',
  template: `
    <div class="space-y-4">
      <button class="pk-button pk-button-success" (click)="showSuccess()">Success Toast</button>
      <button class="pk-button pk-button-error" (click)="showError()">Error Toast</button>
      <button class="pk-button pk-button-warning" (click)="showWarning()">Warning Toast</button>
      <button class="pk-button pk-button-info" (click)="showInfo()">Info Toast</button>
    </div>
  `
})
export class ToastrExampleComponent {
  private toastr = inject(ToastrService);
  
  showSuccess(): void {
    this.toastr.success('การดำเนินการเสร็จสมบูรณ์!', 'สำเร็จ');
  }
  
  showError(): void {
    this.toastr.error('เกิดข้อผิดพลาด กรุณาลองอีกครั้ง', 'ข้อผิดพลาด');
  }
  
  showWarning(): void {
    this.toastr.warning('โปรดตรวจสอบข้อมูลของคุณก่อนดำเนินการต่อ', 'คำเตือน');
  }
  
  showInfo(): void {
    this.toastr.info('ระบบกำลังประมวลผลข้อมูลของคุณ', 'ข้อมูล');
  }
}
```

## ประเภทของ Toastr

Toastr มี 4 ประเภทให้เลือกใช้:

1. **success** - สีเขียว ใช้สำหรับแสดงข้อความว่าการทำงานสำเร็จ
2. **error** - สีแดง ใช้สำหรับแสดงข้อความข้อผิดพลาด
3. **warning** - สีเหลือง ใช้สำหรับแสดงข้อความเตือน
4. **info** - สีฟ้า ใช้สำหรับแสดงข้อมูลทั่วไป

## การกำหนดระยะเวลาแสดงผล

โดยค่าเริ่มต้น Toastr จะแสดงผลเป็นเวลา 5 วินาทีก่อนที่จะหายไป คุณสามารถกำหนดระยะเวลาแสดงผลได้ด้วยการส่งพารามิเตอร์เพิ่มเติม:

```typescript
// แสดง Toastr เป็นเวลา 3 วินาที (3000 มิลลิวินาที)
this.toastr.success('การดำเนินการเสร็จสมบูรณ์!', 'สำเร็จ', 3000);
```

## การแสดง Toastr หลายรายการ

Toastr รองรับการแสดงข้อความหลายรายการพร้อมกัน โดยข้อความใหม่จะแสดงด้านล่างของข้อความก่อนหน้า:

```typescript
showMultiple(): void {
  this.toastr.info('แสดงตัวอย่างการแจ้งเตือนหลายรายการ', 'การทดสอบ');
  
  setTimeout(() => {
    this.toastr.success('การดำเนินการเสร็จสมบูรณ์!', 'สำเร็จ');
  }, 1000);
  
  setTimeout(() => {
    this.toastr.warning('โปรดตรวจสอบข้อมูลของคุณ', 'คำเตือน');
  }, 2000);
  
  setTimeout(() => {
    this.toastr.error('พบข้อผิดพลาดในการประมวลผล', 'ข้อผิดพลาด');
  }, 3000);
}
```

## การกำหนดให้ไม่แสดงปุ่มปิด

คุณสามารถกำหนดให้ Toastr ไม่แสดงปุ่มปิดได้ โดยกำหนดพารามิเตอร์เพิ่มเติม:

```typescript
// ไม่แสดงปุ่มปิด
this.toastr.info('ข้อความนี้จะหายไปอัตโนมัติ', 'ข้อมูล', 5000, false);
```

## ไอคอน Emoji

Toastr แต่ละประเภทจะมีไอคอน emoji ที่แตกต่างกัน:

- success: ✅
- error: ❌
- warning: ⚠️
- info: ℹ️

## ตัวอย่างการดูได้ที่หน้าตัวอย่าง

คุณสามารถดูตัวอย่างการใช้งาน Toastr ได้ที่หน้า `/toastr-demo` ในแอปพลิเคชัน
