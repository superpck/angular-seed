# ToastrService

ToastrService เป็นบริการที่ใช้จัดการการแสดงการแจ้งเตือนแบบ toast notification ที่มุมบนขวาของหน้าจอ

## การใช้งาน

การใช้งาน ToastrService ทำได้โดยการ inject เข้าไปในคอมโพเนนต์ของคุณ:

```typescript
import { Component, inject } from '@angular/core';
import { ToastrService } from '../shared/services/toastr.service';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="showToast()">Show Toast</button>
  `
})
export class ExampleComponent {
  private toastr = inject(ToastrService);
  
  showToast(): void {
    this.toastr.success('การดำเนินการสำเร็จ', 'สำเร็จ');
  }
}
```

## Methods

ToastrService มีเมธอดดังต่อไปนี้:

### success(message: string, title?: string, duration?: number, showCloseButton?: boolean): void

แสดงการแจ้งเตือนประเภท success (สีเขียว):

```typescript
// Basic usage
this.toastr.success('การดำเนินการสำเร็จ');

// With title
this.toastr.success('บันทึกข้อมูลเรียบร้อยแล้ว', 'สำเร็จ');

// With custom duration (milliseconds)
this.toastr.success('บันทึกข้อมูลเรียบร้อยแล้ว', 'สำเร็จ', 3000);

// Hide close button
this.toastr.success('บันทึกข้อมูลเรียบร้อยแล้ว', 'สำเร็จ', 3000, false);
```

### error(message: string, title?: string, duration?: number, showCloseButton?: boolean): void

แสดงการแจ้งเตือนประเภท error (สีแดง):

```typescript
this.toastr.error('เกิดข้อผิดพลาด กรุณาลองอีกครั้ง', 'ข้อผิดพลาด');
```

### warning(message: string, title?: string, duration?: number, showCloseButton?: boolean): void

แสดงการแจ้งเตือนประเภท warning (สีเหลือง):

```typescript
this.toastr.warning('โปรดตรวจสอบข้อมูลก่อนดำเนินการต่อ', 'คำเตือน');
```

### info(message: string, title?: string, duration?: number, showCloseButton?: boolean): void

แสดงการแจ้งเตือนประเภท info (สีฟ้า):

```typescript
this.toastr.info('ระบบกำลังประมวลผลข้อมูล', 'ข้อมูล');
```

## การทำงานภายในของ ToastrService

ToastrService ใช้ BehaviorSubject ในการจัดการ state ของ toast notifications:

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast, ToastType } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  // คอลเลกชันของ toast ที่กำลังแสดงอยู่
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  
  // Observable ที่คอมโพเนนต์อื่นสามารถ subscribe เพื่อรับการเปลี่ยนแปลง
  public toasts$ = this.toastsSubject.asObservable();
  
  // ID ที่ไม่ซ้ำกันสำหรับแต่ละ toast
  private nextId = 0;
  
  // ...เมธอดต่างๆ
}
```

## การเชื่อมต่อกับ ToastrComponent

ToastrService ทำงานร่วมกับ ToastrComponent โดย ToastrComponent จะ subscribe ต่อ `toasts$` Observable เพื่อรับการเปลี่ยนแปลงและแสดงผล toast ตามที่กำหนด:

```typescript
// ตัวอย่างจาก toastr.component.ts
export class ToastrComponent implements OnInit, OnDestroy {
  private toastrService = inject(ToastrService);
  toasts: Toast[] = [];
  private subscription!: Subscription;
  
  ngOnInit(): void {
    this.subscription = this.toastrService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  // ...เมธอดอื่นๆ
}
```

## Best Practices

- ใช้ประเภทของ toast ให้เหมาะสมกับประเภทของข้อความ:
  - `success` สำหรับการดำเนินการสำเร็จ
  - `error` สำหรับข้อผิดพลาด
  - `warning` สำหรับคำเตือน
  - `info` สำหรับข้อมูลทั่วไป
- ใช้ข้อความที่สั้นและกระชับ
- กำหนดระยะเวลาแสดงผลให้เหมาะสมกับความยาวของข้อความ
