# Cards

คอมโพเนนต์การ์ดใน Angular Seed ใช้สำหรับแสดงเนื้อหาในรูปแบบที่เป็นบล็อค มีส่วนหัว เนื้อหา และส่วนท้าย

## การใช้งานพื้นฐาน

การ์ดพื้นฐานประกอบด้วย 3 ส่วนหลัก: header, body และ footer (footer เป็นตัวเลือก):

```html
<div class="pk-card">
  <div class="pk-card-header">
    <h3 class="pk-card-header-title">หัวข้อการ์ด</h3>
  </div>
  <div class="pk-card-body">
    <p>เนื้อหาของการ์ด สามารถใส่ข้อความหรือคอมโพเนนต์อื่นๆ ได้ตามต้องการ</p>
  </div>
  <div class="pk-card-footer">
    <button class="pk-button pk-button-primary">ตกลง</button>
  </div>
</div>
```

## การ์ดประเภทต่างๆ

การ์ดมีหลากหลายประเภทให้เลือกใช้:

```html
<!-- การ์ดหลัก (Primary) -->
<div class="pk-card pk-card-primary">
  <div class="pk-card-header">
    <h3 class="pk-card-header-title">Primary Card</h3>
  </div>
  <div class="pk-card-body">
    <p>เนื้อหาของการ์ด Primary</p>
  </div>
  <div class="pk-card-footer">
    <button class="pk-button pk-button-primary">ตกลง</button>
  </div>
</div>

<!-- การ์ดสำเร็จ (Success) -->
<div class="pk-card pk-card-success">
  <div class="pk-card-header">
    <h3 class="pk-card-header-title">Success Card</h3>
  </div>
  <div class="pk-card-body">
    <p>เนื้อหาของการ์ด Success</p>
  </div>
  <div class="pk-card-footer">
    <button class="pk-button pk-button-success">ตกลง</button>
  </div>
</div>

<!-- การ์ดคำเตือน (Warning) -->
<div class="pk-card pk-card-warning">
  <div class="pk-card-header">
    <h3 class="pk-card-header-title">Warning Card</h3>
  </div>
  <div class="pk-card-body">
    <p>เนื้อหาของการ์ด Warning</p>
  </div>
  <div class="pk-card-footer">
    <button class="pk-button pk-button-warning">ตกลง</button>
  </div>
</div>

<!-- การ์ดข้อผิดพลาด (Error) -->
<div class="pk-card pk-card-error">
  <div class="pk-card-header">
    <h3 class="pk-card-header-title">Error Card</h3>
  </div>
  <div class="pk-card-body">
    <p>เนื้อหาของการ์ด Error</p>
  </div>
  <div class="pk-card-footer">
    <button class="pk-button pk-button-error">ตกลง</button>
  </div>
</div>

<!-- การ์ดข้อมูล (Info) -->
<div class="pk-card pk-card-info">
  <div class="pk-card-header">
    <h3 class="pk-card-header-title">Info Card</h3>
  </div>
  <div class="pk-card-body">
    <p>เนื้อหาของการ์ด Info</p>
  </div>
  <div class="pk-card-footer">
    <button class="pk-button pk-button-info">ตกลง</button>
  </div>
</div>
```

## ขนาดของการ์ด

การ์ดมีขนาดให้เลือกใช้ 3 ขนาด:

```html
<!-- การ์ดขนาดเล็ก -->
<div class="pk-card pk-card-sm">
  <!-- เนื้อหาการ์ด -->
</div>

<!-- การ์ดขนาดปกติ (ไม่ต้องกำหนดคลาสเพิ่มเติม) -->
<div class="pk-card">
  <!-- เนื้อหาการ์ด -->
</div>

<!-- การ์ดขนาดใหญ่ -->
<div class="pk-card pk-card-lg">
  <!-- เนื้อหาการ์ด -->
</div>
```

## การใช้งานเพิ่มเติม

### การ์ดที่ไม่มี Footer

```html
<div class="pk-card">
  <div class="pk-card-header">
    <h3 class="pk-card-header-title">การ์ดไม่มี Footer</h3>
  </div>
  <div class="pk-card-body">
    <p>เนื้อหาของการ์ดที่ไม่มีส่วน Footer</p>
  </div>
</div>
```

### การ์ดที่มีเนื้อหาซับซ้อน

```html
<div class="pk-card">
  <div class="pk-card-header">
    <h3 class="pk-card-header-title">การ์ดที่มีเนื้อหาซับซ้อน</h3>
  </div>
  <div class="pk-card-body">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h4 class="font-semibold">ส่วนที่ 1</h4>
        <p>ข้อความส่วนที่ 1</p>
      </div>
      <div>
        <h4 class="font-semibold">ส่วนที่ 2</h4>
        <p>ข้อความส่วนที่ 2</p>
      </div>
    </div>
    
    <div class="mt-4">
      <p>ข้อความเพิ่มเติม...</p>
    </div>
  </div>
  <div class="pk-card-footer flex justify-between">
    <button class="pk-button pk-button-outline pk-button-primary">ย้อนกลับ</button>
    <button class="pk-button pk-button-primary">ดำเนินการต่อ</button>
  </div>
</div>
```

## ตัวอย่างการใช้งานใน Angular Component

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-card-example',
  template: `
    <div class="pk-card" *ngIf="isLoaded">
      <div class="pk-card-header">
        <h3 class="pk-card-header-title">{{ cardTitle }}</h3>
      </div>
      <div class="pk-card-body">
        <p>{{ cardContent }}</p>
      </div>
      <div class="pk-card-footer">
        <button class="pk-button pk-button-primary" (click)="onAction()">{{ actionText }}</button>
      </div>
    </div>
  `
})
export class CardExampleComponent {
  isLoaded = true;
  cardTitle = 'ตัวอย่างการ์ด';
  cardContent = 'นี่คือเนื้อหาตัวอย่างของการ์ด';
  actionText = 'ดำเนินการ';
  
  onAction() {
    console.log('คลิกปุ่มดำเนินการ');
  }
}
```
