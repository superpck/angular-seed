# คู่มือการใช้งาน Modal

Modal เป็น component สำหรับแสดงเนื้อหาแบบ popup window โดยสามารถกำหนดขนาดและคุณสมบัติต่างๆ ได้

## การเรียกใช้งาน Modal

1. นำเข้า `ModalModule` ในโมดูลหรือคอมโพเนนต์ที่ต้องการใช้งาน:

```typescript
import { ModalModule } from '../shared/modal/modal.module';

@Component({
  // ...
  imports: [CommonModule, ModalModule],
  // ...
})
```

2. นำเข้า `ModalService` ในคอมโพเนนต์ที่ต้องการใช้งาน:

```typescript
import { ModalService } from '../shared/services/modal.service';

export class YourComponent {
  private modalService = inject(ModalService);
  
  // ...
}
```

3. เรียกใช้งาน Modal โดยใช้ `ModalService`:

```typescript
openModal() {
  this.modalService.open({
    title: 'Modal Title',
    size: 'md',
    closeable: true,
    closeOnBackdropClick: true,
    data: { yourData: 'here' }
  });
}
```

4. การรับค่าเมื่อปิด Modal:

```typescript
constructor() {
  this.modalService.onClose.subscribe(data => {
    console.log('Modal closed with data:', data);
    // ทำอะไรก็ตามเมื่อ Modal ถูกปิด
  });
}

// ปิด Modal พร้อมส่งข้อมูลกลับ
closeWithData() {
  this.modalService.close({ result: 'success', id: 123 });
}
```

## การกำหนดเนื้อหาของ Modal

เนื้อหาของ Modal สามารถกำหนดได้โดยใช้ Content Projection ใน Angular:

1. เพิ่ม `<app-modal>` ลงในเทมเพลตของคอมโพเนนต์:

```html
<app-modal>
  <!-- เนื้อหาของ Modal Body -->
  <div>
    <p>เนื้อหาของ Modal</p>
    <form>
      <!-- ฟอร์มหรือเนื้อหาอื่นๆ -->
    </form>
  </div>
  
  <!-- เนื้อหาของ Modal Footer (ใช้ attribute modal-footer) -->
  <div modal-footer>
    <button class="pk-button pk-button-outline pk-button-primary" (click)="cancel()">Cancel</button>
    <button class="pk-button pk-button-primary" (click)="confirm()">Confirm</button>
  </div>
</app-modal>
```

## ขนาดของ Modal

Modal มีขนาดให้เลือกใช้ 6 ขนาด:

| ขนาด | คำอธิบาย |
|------|----------|
| `sm` | ขนาดเล็ก (Small) |
| `md` | ขนาดกลาง (Medium, ค่าเริ่มต้น) |
| `lg` | ขนาดใหญ่ (Large) |
| `xl` | ขนาดใหญ่พิเศษ (Extra Large) |
| `2xl` | ขนาดใหญ่มาก (2X Large) |
| `full` | เต็มหน้าจอ (Full Screen) |

ตัวอย่างการกำหนดขนาด:

```typescript
this.modalService.open({
  title: 'Large Modal',
  size: 'lg'
});
```

## คุณสมบัติของ Modal

| คุณสมบัติ | ประเภท | ค่าเริ่มต้น | คำอธิบาย |
|----------|--------|------------|----------|
| `title` | string | undefined | หัวข้อของ Modal |
| `size` | ModalSize | 'md' | ขนาดของ Modal (sm, md, lg, xl, 2xl, full) |
| `closeable` | boolean | true | กำหนดให้มีปุ่มปิด (X) ที่มุมบนขวา |
| `closeOnBackdropClick` | boolean | true | กำหนดให้สามารถปิด Modal ได้โดยการคลิกที่พื้นหลัง |
| `data` | any | undefined | ข้อมูลที่ต้องการส่งให้กับ Modal |

## CSS Classes

Modal มี CSS classes ที่สามารถใช้ในการปรับแต่งรูปแบบ:

- `.pk-modal-backdrop` - พื้นหลังทึบแสงของ Modal
- `.pk-modal` - คอนเทนเนอร์หลักของ Modal
- `.pk-modal-sm`, `.pk-modal-md`, `.pk-modal-lg`, `.pk-modal-xl`, `.pk-modal-2xl`, `.pk-modal-full` - ขนาดต่างๆ ของ Modal
- `.pk-modal-header` - ส่วนหัวของ Modal
- `.pk-modal-title` - หัวข้อของ Modal
- `.pk-modal-close` - ปุ่มปิด Modal
- `.pk-modal-body` - ส่วนเนื้อหาของ Modal
- `.pk-modal-footer` - ส่วนท้ายของ Modal

## ตัวอย่างการใช้งาน

สามารถดูตัวอย่างการใช้งานได้ที่ `ModalExampleComponent` ในโปรเจค
