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

## รูปแบบการ์ด (Card Variants)

การ์ดมีหลายรูปแบบให้เลือกใช้ตามความเหมาะสมกับข้อมูลและการใช้งาน:

### การ์ดสี (Colored Cards)

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

<!-- การ์ดเตือน (Warning) -->
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

### ขนาดการ์ด (Card Sizes)

มีขนาดการ์ดให้เลือกใช้ 3 ขนาด:

```html
<!-- การ์ดขนาดเล็ก (Small) -->
<div class="pk-card pk-card-sm">
  <div class="pk-card-header">
    <h3 class="pk-card-header-title">Small Card</h3>
  </div>
  <div class="pk-card-body">
    <p>เนื้อหาของการ์ดขนาดเล็ก</p>
  </div>
  <div class="pk-card-footer">
    <button class="pk-button pk-button-sm pk-button-primary">ตกลง</button>
  </div>
</div>

<!-- การ์ดขนาดปกติ (Default) -->
<div class="pk-card">
  <div class="pk-card-header">
    <h3 class="pk-card-header-title">Default Card</h3>
  </div>
  <div class="pk-card-body">
    <p>เนื้อหาของการ์ดขนาดปกติ</p>
  </div>
  <div class="pk-card-footer">
    <button class="pk-button pk-button-primary">ตกลง</button>
  </div>
</div>

<!-- การ์ดขนาดใหญ่ (Large) -->
<div class="pk-card pk-card-lg">
  <div class="pk-card-header">
    <h3 class="pk-card-header-title">Large Card</h3>
  </div>
  <div class="pk-card-body">
    <p>เนื้อหาของการ์ดขนาดใหญ่</p>
  </div>
  <div class="pk-card-footer">
    <button class="pk-button pk-button-lg pk-button-primary">ตกลง</button>
  </div>
</div>
```

## การใช้งานร่วมกับ Grid System

คุณสามารถใช้ Card ร่วมกับ Grid System เพื่อสร้าง layout ที่สวยงาม:

```html
<div class="pk-row">
  <div class="pk-col-md-6">
    <div class="pk-card pk-card-primary">
      <div class="pk-card-header">
        <h3 class="pk-card-header-title">Card 1</h3>
      </div>
      <div class="pk-card-body">
        <p>เนื้อหาของการ์ด 1</p>
      </div>
    </div>
  </div>
  <div class="pk-col-md-6">
    <div class="pk-card pk-card-success">
      <div class="pk-card-header">
        <h3 class="pk-card-header-title">Card 2</h3>
      </div>
      <div class="pk-card-body">
        <p>เนื้อหาของการ์ด 2</p>
      </div>
    </div>
  </div>
</div>
```

## การใช้งานร่วมกับองค์ประกอบอื่นๆ

คุณสามารถใช้ Card ร่วมกับองค์ประกอบอื่นๆ เพื่อสร้าง UI ที่ซับซ้อนได้:

### การ์ดกับ Badges

```html
<div class="pk-card">
  <div class="pk-card-header">
    <div class="flex justify-between items-center">
      <h3 class="pk-card-header-title">รายการแจ้งเตือน</h3>
      <span class="pk-badge pk-badge-primary">ใหม่</span>
    </div>
  </div>
  <div class="pk-card-body">
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <p>แจ้งเตือนที่ 1</p>
        <span class="pk-badge pk-badge-success">อ่านแล้ว</span>
      </div>
      <div class="flex justify-between items-center">
        <p>แจ้งเตือนที่ 2</p>
        <span class="pk-badge pk-badge-warning">ยังไม่อ่าน</span>
      </div>
    </div>
  </div>
</div>
```

### การ์ดกับ Modal

```html
<div class="pk-card">
  <div class="pk-card-header">
    <h3 class="pk-card-header-title">การใช้งานร่วมกับ Modal</h3>
  </div>
  <div class="pk-card-body">
    <p>คลิกปุ่มด้านล่างเพื่อเปิด Modal</p>
  </div>
  <div class="pk-card-footer">
    <button class="pk-button pk-button-primary" (click)="openModal()">เปิด Modal</button>
  </div>
</div>
```

## สรุป CSS Classes

| Class | คำอธิบาย |
|-------|---------|
| `.pk-card` | Class หลักสำหรับการ์ด |
| `.pk-card-header` | ส่วนหัวของการ์ด |
| `.pk-card-header-title` | ข้อความหัวข้อในส่วนหัวของการ์ด |
| `.pk-card-body` | ส่วนเนื้อหาของการ์ด |
| `.pk-card-footer` | ส่วนท้ายของการ์ด |
| `.pk-card-primary` | การ์ดสีหลัก (น้ำเงิน) |
| `.pk-card-success` | การ์ดสีสำเร็จ (เขียว) |
| `.pk-card-warning` | การ์ดสีเตือน (เหลือง) |
| `.pk-card-error` | การ์ดสีข้อผิดพลาด (แดง) |
| `.pk-card-info` | การ์ดสีข้อมูล (ฟ้า) |
| `.pk-card-sm` | การ์ดขนาดเล็ก |
| `.pk-card-lg` | การ์ดขนาดใหญ่ |

## ข้อแนะนำการใช้งาน

1. ใช้การ์ดสีให้สอดคล้องกับประเภทของข้อมูล (เช่น สีเขียวสำหรับสำเร็จ, สีแดงสำหรับข้อผิดพลาด)
2. จำกัดการใช้ส่วนหัวและส่วนท้ายให้กระชับ ข้อมูลหลักควรอยู่ในส่วนเนื้อหา
3. ใช้ขนาดการ์ดให้เหมาะสมกับข้อมูลและพื้นที่แสดงผล
4. ใช้ร่วมกับ Grid System เพื่อจัดการ์ดหลายๆ ใบในหน้าเดียวกัน
