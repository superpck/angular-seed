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

## 📱 การรองรับมือถือ

Toastr ได้รับการปรับปรุงให้รองรับการแสดงผลบนมือถือได้อย่างเหมาะสม:

### ฟีเจอร์สำหรับมือถือ
- **Responsive Layout**: ปรับขนาดและตำแหน่งอัตโนมัติบนหน้าจอเล็ก
- **Touch-Friendly**: ปุ่มปิด (X) มีขนาดใหญ่ขึ้นสำหรับการแตะ
- **Better Visibility**: เพิ่ม contrast ของปุ่มปิดบนพื้นหลังสี
- **Content Protection**: ป้องกันเนื้อหาไม่ให้ทับกับปุ่มปิด

### การปรับแต่งขนาดหน้าจอ

```scss
/* Tablet (768px และต่ำกว่า) */
@media (max-width: 768px) {
  - ขนาดฟอนต์ลดลง: 14px (title), 13px (message)
  - ปุ่มปิดขนาด: 28x28px
  - ระยะขอบ: 10px
}

/* Mobile (480px และต่ำกว่า) */  
@media (max-width: 480px) {
  - ขนาดฟอนต์ลดลง: 13px (title), 12px (message)
  - ปุ่มปิดขนาด: 32x32px (touch target ใหญ่ขึ้น)
  - ระยะขอบ: 8px
}
```

### การใช้งานบนมือถือ
- สามารถแตะปุ่ม X เพื่อปิดได้ง่าย
- ข้อความจะ wrap อัตโนมัติเมื่อข้อความยาว
- ไม่มีการล้นขอบจอ
- การแสดงผลเหมาะสมกับทุกขนาดหน้าจอ

## ตัวอย่างการดูได้ที่หน้าตัวอย่าง

คุณสามารถดูตัวอย่างการใช้งาน Toastr ได้ที่หน้า `/toastr-demo` ในแอปพลิเคชัน
