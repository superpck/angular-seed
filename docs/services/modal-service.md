````markdown
# คู่มือการใช้งาน ModalService

`ModalService` เป็นบริการที่ใช้สำหรับการควบคุม Modal ในแอปพลิเคชัน โดยรองรับการเปิด-ปิด Modal และการส่งข้อมูลระหว่าง Component

## การนำเข้า ModalService

```typescript
import { ModalService } from '../shared/services/modal.service';

export class YourComponent {
  constructor(private modalService: ModalService) { }
  
  // หรือใช้ inject ใน Angular 14+
  private modalService = inject(ModalService);
}
```

## การเปิด Modal

```typescript
// เปิด Modal พื้นฐาน
openBasicModal() {
  this.modalService.open({
    title: 'Modal Title',
    size: 'md'
  });
}

// เปิด Modal พร้อมส่งข้อมูล
openModalWithData() {
  this.modalService.open({
    title: 'User Details',
    size: 'lg',
    closeable: true,
    closeOnBackdropClick: true,
    data: {
      userId: 123,
      userName: 'John Doe',
      userRole: 'Admin'
    }
  });
}
```

## การปิด Modal

```typescript
// ปิด Modal โดยไม่ส่งข้อมูลกลับ
closeModal() {
  this.modalService.close();
}

// ปิด Modal พร้อมส่งข้อมูลกลับ
closeModalWithData() {
  this.modalService.close({
    action: 'save',
    data: {
      id: 123,
      name: 'Updated Name',
      saved: true
    }
  });
}
```

## การรับข้อมูลเมื่อ Modal ปิด

```typescript
// ใช้ในคอนสตรัคเตอร์หรือเมธอด ngOnInit
this.modalService.onClose.subscribe(result => {
  if (result) {
    console.log('Modal closed with data:', result);
    // จัดการกับข้อมูลที่ได้รับจาก Modal
    if (result.action === 'save') {
      this.saveData(result.data);
    }
  } else {
    console.log('Modal closed without data');
  }
});
```

## การตรวจสอบสถานะของ Modal

```typescript
// ตรวจสอบว่า Modal กำลังแสดงอยู่หรือไม่
const isModalVisible = this.modalService.modal().show;

// เข้าถึงการตั้งค่าของ Modal ปัจจุบัน
const currentModalTitle = this.modalService.modal().config?.title;
const currentModalSize = this.modalService.modal().config?.size;
const currentModalData = this.modalService.modal().config?.data;
```

## คุณสมบัติที่รองรับในการเปิด Modal

| คุณสมบัติ | ประเภท | ค่าเริ่มต้น | คำอธิบาย |
|----------|--------|------------|----------|
| `title` | string | undefined | หัวข้อของ Modal |
| `size` | ModalSize | 'md' | ขนาดของ Modal (sm, md, lg, xl, 2xl, full) |
| `closeable` | boolean | true | กำหนดให้มีปุ่มปิด (X) ที่มุมบนขวา |
| `closeOnBackdropClick` | boolean | true | กำหนดให้สามารถปิด Modal ได้โดยการคลิกที่พื้นหลัง |
| `data` | any | undefined | ข้อมูลที่ต้องการส่งให้กับ Modal |

## คุณสมบัติพิเศษ

### Fixed Background

เมื่อ Modal เปิดขึ้น `ModalService` จะจัดการให้พื้นหลังถูก fixed โดยอัตโนมัติ ทำให้ไม่สามารถเลื่อนหน้าจอได้ขณะที่ Modal แสดงอยู่ ซึ่งเป็นพฤติกรรมมาตรฐานของ Modal ในเว็บแอปพลิเคชันสมัยใหม่

### การกำหนดขนาด

Modal มีขนาดให้เลือกใช้ 6 ขนาด:

| ขนาด | พิกเซล (โดยประมาณ) | คำอธิบาย |
|------|-------------------|----------|
| `sm` | 448px | ขนาดเล็ก |
| `md` | 512px | ขนาดกลาง (ค่าเริ่มต้น) |
| `lg` | 672px | ขนาดใหญ่ |
| `xl` | 896px | ขนาดใหญ่พิเศษ |
| `2xl` | 1152px | ขนาดใหญ่มาก |
| `full` | 95% ของหน้าจอ | เต็มหน้าจอ |

## ตัวอย่างการใช้งาน

```typescript
import { Component, inject } from '@angular/core';
import { ModalService } from '../shared/services/modal.service';
import { ModalSize } from '../shared/models/modal.model';

@Component({
  selector: 'app-modal-example',
  template: `
    <button class="pk-button pk-button-primary" (click)="openUserForm()">
      เปิดฟอร์มแก้ไขข้อมูลผู้ใช้
    </button>
  `
})
export class ModalExampleComponent {
  private modalService = inject(ModalService);
  
  openUserForm() {
    this.modalService.open({
      title: 'แก้ไขข้อมูลผู้ใช้',
      size: 'lg',
      data: {
        userId: 123,
        name: 'John Doe',
        email: 'john@example.com'
      }
    });
    
    // รับข้อมูลเมื่อ Modal ถูกปิด
    this.modalService.onClose.subscribe(result => {
      if (result && result.action === 'save') {
        console.log('บันทึกข้อมูลผู้ใช้:', result.data);
        // บันทึกข้อมูลหรือทำอย่างอื่นต่อไป
      }
    });
  }
}
```

หมายเหตุ: หากต้องการดูตัวอย่างการใช้งานจริง สามารถดูได้ที่ `ModalDemoComponent` ในโปรเจค
````
