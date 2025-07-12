# คู่มือการใช้งาน Angular Seed

คู่มือนี้จะอธิบายถึงการใช้งานคอมโพเนนต์และบริการต่างๆ ที่มีอยู่ในโปรเจค Angular Seed

## สารบัญ

1. [การติดตั้งและเริ่มต้นใช้งาน](#การติดตั้งและเริ่มต้นใช้งาน)
2. [Layout System](#layout-system)
   - [PK Grid System](./components/grid.md)
3. [CSS Components](#css-components)
   - [Buttons](./components/buttons.md)
   - [Cards](./components/cards.md)
   - [Badges](./components/badges.md)
   - [Breadcrumbs](./components/breadcrumbs.md)
4. [UI Components](#ui-components)
   - [Toastr Notifications](./components/toastr.md)
   - [Alert Modals](./components/alert.md)
   - [Modal Windows](./components/modal.md)
   - [Drag & Drop Lists](./components/drag-drop.md)
5. [Services](#services)
   - [ToastrService](./services/toastr-service.md)
   - [AlertService](./services/alert-service.md)
   - [ModalService](./services/modal-service.md)
   - [DragDropService](./services/drag-drop-service.md)
6. [Pages & Routing](#pages--routing)
7. [Authentication](#authentication)
8. [Best Practices](#best-practices)

## การติดตั้งและเริ่มต้นใช้งาน

### ความต้องการของระบบ
- Node.js v18+
- npm v8+
- Angular CLI v16+

### การติดตั้ง

1. Clone repository นี้:
```bash
git clone https://github.com/superpck/angular-seed.git
cd angular-seed
```

2. ติดตั้ง dependencies:
```bash
npm install
```

3. รันโปรเจคใน development mode:
```bash
npm start
```

4. เปิดเบราว์เซอร์และเข้าไปที่ `http://localhost:4200`

## Layout System

โปรเจคนี้มี Layout System ที่ช่วยในการจัดเลย์เอาต์:

- [PK Grid System](./components/grid.md) - ระบบ grid แบบ responsive ที่ใช้ CSS Grid เป็นฐาน

## CSS Components

โปรเจคนี้มี CSS Components ที่ถูกสร้างขึ้นด้วย Tailwind CSS เพื่อให้การพัฒนา UI เป็นไปอย่างรวดเร็วและสอดคล้องกัน:

- [Buttons](./components/buttons.md) - ปุ่มหลากหลายรูปแบบ (primary, success, warning, error, info)
- [Cards](./components/cards.md) - การ์ดพร้อม header, body และ footer
- [Badges](./components/badges.md) - ระบบ Badge ที่หลากหลายและปรับแต่งได้พร้อมรองรับ Icon
- [Breadcrumbs](./components/breadcrumbs.md) - ระบบ Breadcrumb navigation แบบเต็มรูปแบบพร้อม variants

## UI Components

โปรเจคนี้มี UI Components ที่ใช้งานได้ทันที:

- [Toastr Notifications](./components/toastr.md) - การแจ้งเตือนแบบชั่วคราวที่มุมบนขวาของหน้าจอ
- [Alert Modals](./components/alert.md) - กล่องข้อความเตือนแบบ modal
- [Modal Windows](./components/modal.md) - popup window ที่ปรับแต่งได้หลากหลาย
- [Drag & Drop Lists](./components/drag-drop.md) - รายการที่สามารถลาก-วางเพื่อเรียงลำดับใหม่ได้

## Services

Services ที่ช่วยในการจัดการข้อมูลและการทำงานของแอปพลิเคชัน:

- [ToastrService](./services/toastr-service.md) - บริการสำหรับแสดงการแจ้งเตือนแบบ toast
- [AlertService](./services/alert-service.md) - บริการสำหรับแสดง alert dialog
- [ModalService](./services/modal-service.md) - บริการสำหรับควบคุม modal windows
- [DragDropService](./services/drag-drop-service.md) - บริการสำหรับจัดการข้อมูลและการทำงานของ drag-drop component

## Pages & Routing

โปรเจคนี้มีหน้าตัวอย่างและระบบ routing ที่พร้อมใช้งาน:

- `/login` - หน้าเข้าสู่ระบบ
- `/home` - หน้าหลักหลังจากเข้าสู่ระบบ
- `/users` - หน้าจัดการผู้ใช้
- `/toastr-demo` - หน้าตัวอย่างการใช้งาน Toastr
- `/alert-demo` - หน้าตัวอย่างการใช้งาน Alert
- `/modal-demo` - หน้าตัวอย่างการใช้งาน Modal
- `/grid-demo` - หน้าตัวอย่างการใช้งาน Grid System
- `/drag-drop-demo` - หน้าตัวอย่างการใช้งาน Drag & Drop Component
- `/icons-demo` - หน้าแสดงตัวอย่าง Icons และ CSS Components
- `/badges-demo` - หน้าแสดงตัวอย่าง PK Badges System
- `/breadcrumbs-demo` - หน้าแสดงตัวอย่าง PK Breadcrumbs System

## Authentication

โปรเจคนี้มีระบบ Authentication เบื้องต้น:

- ใช้ Guard เพื่อป้องกันการเข้าถึงหน้าที่ต้องการการยืนยันตัวตน
- มีการจัดเก็บข้อมูลผู้ใช้ที่ล็อกอินในปัจจุบัน

## Best Practices

แนวทางการพัฒนาที่แนะนำสำหรับโปรเจคนี้:

- ใช้ Standalone Components เพื่อให้ง่ายต่อการนำไปใช้และการทดสอบ
- ใช้ Signal API สำหรับการจัดการ State
- ใช้ CSS Components ที่มีให้เพื่อความสอดคล้องของ UI
- แยก Services และ Models เพื่อให้โค้ดอ่านง่ายและบำรุงรักษาได้ง่าย
