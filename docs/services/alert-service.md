# AlertService

AlertService เป็นบริการที่ใช้จัดการการแสดงกล่องข้อความเตือนแบบ modal ที่จะปรากฏตรงกลางหน้าจอพร้อม backdrop ทึบแสง

## การใช้งาน

การใช้งาน AlertService ทำได้โดยการ inject เข้าไปในคอมโพเนนต์ของคุณ:

```typescript
import { Component, inject } from '@angular/core';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="showAlert()">Show Alert</button>
  `
})
export class ExampleComponent {
  private alertService = inject(AlertService);
  
  showAlert(): void {
    this.alertService.info('นี่คือข้อความแจ้งเตือน');
  }
}
```

## Methods

AlertService มีเมธอดดังต่อไปนี้:

### success(message: string): void

แสดงกล่องข้อความประเภท success (สีเขียว):

```typescript
this.alertService.success('การดำเนินการสำเร็จ');
```

### error(message: string): void

แสดงกล่องข้อความประเภท error (สีแดง):

```typescript
this.alertService.error('เกิดข้อผิดพลาด กรุณาลองอีกครั้ง');
```

### warning(message: string): void

แสดงกล่องข้อความประเภท warning (สีเหลือง):

```typescript
this.alertService.warning('โปรดตรวจสอบข้อมูลก่อนดำเนินการต่อ');
```

### info(message: string): void

แสดงกล่องข้อความประเภท info (สีฟ้า):

```typescript
this.alertService.info('ระบบกำลังประมวลผลข้อมูล');
```

### confirm(message: string, onConfirm: () => void, onCancel?: () => void, confirmText?: string, cancelText?: string): void

แสดงกล่องข้อความยืนยันที่มีปุ่มตกลงและยกเลิก:

```typescript
// Basic usage
this.alertService.confirm(
  'คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?',
  () => {
    console.log('ผู้ใช้ยืนยันการลบข้อมูล');
  },
  () => {
    console.log('ผู้ใช้ยกเลิกการลบข้อมูล');
  }
);

// With custom button text
this.alertService.confirm(
  'คุณต้องการบันทึกการเปลี่ยนแปลงหรือไม่?',
  () => {
    console.log('ผู้ใช้บันทึกการเปลี่ยนแปลง');
  },
  () => {
    console.log('ผู้ใช้ไม่บันทึกการเปลี่ยนแปลง');
  },
  'บันทึก', // Custom confirm button text
  'ไม่บันทึก' // Custom cancel button text
);
```

## การทำงานภายในของ AlertService

AlertService ใช้ BehaviorSubject ในการจัดการ state ของ alert:

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert, AlertType } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert | null>(null);
  public alert$ = this.alertSubject.asObservable();
  
  // ...เมธอดต่างๆ
}
```

## การเชื่อมต่อกับ AlertComponent

AlertService ทำงานร่วมกับ AlertComponent โดย AlertComponent จะ subscribe ต่อ `alert$` Observable เพื่อรับการเปลี่ยนแปลงและแสดงผล alert ตามที่กำหนด:

```typescript
// ตัวอย่างจาก alert.component.ts
export class AlertComponent implements OnInit, OnDestroy {
  private alertService = inject(AlertService);
  alert: Alert | null = null;
  private subscription!: Subscription;
  
  ngOnInit(): void {
    this.subscription = this.alertService.alert$.subscribe(alert => {
      this.alert = alert;
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  // ...เมธอดอื่นๆ
}
```

## การใช้งานร่วมกับ AnimationBuilder

AlertComponent ใช้ Angular's Animation API เพื่อสร้าง fade-in และ fade-out effect:

```typescript
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-alert',
  template: `...`,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AlertComponent {
  // ...
}
```

## Best Practices

- ใช้ประเภทของ alert ให้เหมาะสมกับประเภทของข้อความ:
  - `success` สำหรับการดำเนินการสำเร็จ
  - `error` สำหรับข้อผิดพลาด
  - `warning` สำหรับคำเตือน
  - `info` สำหรับข้อมูลทั่วไป
  - `confirm` สำหรับการขอการยืนยันจากผู้ใช้
- ใช้ข้อความที่ชัดเจนและเข้าใจง่าย
- สำหรับ confirm dialog ให้ระบุผลลัพธ์ของการกระทำอย่างชัดเจน
- กำหนดข้อความปุ่มให้สอดคล้องกับการกระทำ
