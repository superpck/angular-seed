# Buttons

คอมโพเนนต์ปุ่มใน Angular Seed มีหลากหลายรูปแบบและขนาดเพื่อรองรับการใช้งานที่หลากหลาย

## การใช้งานพื้นฐาน

ปุ่มพื้นฐานสามารถใช้งานได้โดยใช้คลาส `pk-button` ร่วมกับคลาสที่กำหนดสี:

```html
<button class="pk-button pk-button-primary">ปุ่มหลัก</button>
<button class="pk-button pk-button-success">สำเร็จ</button>
<button class="pk-button pk-button-warning">คำเตือน</button>
<button class="pk-button pk-button-error">ข้อผิดพลาด</button>
<button class="pk-button pk-button-info">ข้อมูล</button>
```

## ปุ่มแบบ Outline

ปุ่มแบบเส้นขอบสามารถใช้งานได้โดยเพิ่มคลาส `pk-button-outline`:

```html
<button class="pk-button pk-button-outline pk-button-primary">ปุ่มหลัก Outline</button>
<button class="pk-button pk-button-outline pk-button-success">สำเร็จ Outline</button>
<button class="pk-button pk-button-outline pk-button-warning">คำเตือน Outline</button>
<button class="pk-button pk-button-outline pk-button-error">ข้อผิดพลาด Outline</button>
<button class="pk-button pk-button-outline pk-button-info">ข้อมูล Outline</button>
```

## ขนาดของปุ่ม

ปุ่มมี 3 ขนาดให้เลือกใช้:

```html
<!-- ปุ่มขนาดเล็ก -->
<button class="pk-button pk-button-sm pk-button-primary">ปุ่มเล็ก</button>

<!-- ปุ่มขนาดปกติ (ไม่ต้องกำหนดคลาสเพิ่มเติม) -->
<button class="pk-button pk-button-primary">ปุ่มปกติ</button>

<!-- ปุ่มขนาดใหญ่ -->
<button class="pk-button pk-button-lg pk-button-primary">ปุ่มใหญ่</button>
```

## ปุ่มที่ถูกปิดใช้งาน (Disabled)

ปุ่มสามารถถูกปิดใช้งานได้โดยใช้แอตทริบิวต์ `disabled`:

```html
<button class="pk-button pk-button-primary" disabled>ปุ่มที่ถูกปิดใช้งาน</button>
```

## ปุ่มกับไอคอน

ปุ่มสามารถใช้ร่วมกับไอคอนได้:

```html
<button class="pk-button pk-button-primary">
  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <!-- path ของไอคอน -->
  </svg>
  ปุ่มพร้อมไอคอน
</button>
```

## ปุ่มแบบเต็มความกว้าง

ปุ่มสามารถขยายเต็มความกว้างของ container ได้โดยใช้คลาส Tailwind `w-full`:

```html
<button class="pk-button pk-button-primary w-full">ปุ่มเต็มความกว้าง</button>
```

## ตัวอย่างการใช้งานใน Angular Component

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-button-example',
  template: `
    <div class="space-y-4">
      <div>
        <button class="pk-button pk-button-primary" (click)="onSave()">บันทึก</button>
      </div>
      
      <div>
        <button class="pk-button pk-button-outline pk-button-error" (click)="onCancel()">ยกเลิก</button>
      </div>
    </div>
  `
})
export class ButtonExampleComponent {
  onSave() {
    console.log('บันทึกข้อมูล');
  }
  
  onCancel() {
    console.log('ยกเลิกการทำงาน');
  }
}
```
