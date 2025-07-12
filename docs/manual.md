# คู่มือการใช้งาน Angular Seed

คู่มือนี้จะอธิบายถึงการใช้งานคอมโพเนนต์และบริการต่างๆ ที่มีอยู่ในโปรเจค Angular Seed

## สารบัญ

1. [การติดตั้งและเริ่มต้นใช้งาน](#การติดตั้งและเริ่มต้นใช้งาน)
2. [Layout System](#layout-system)
   - [PK Grid System](./components/grid.md)
   - [Navigation](./components/navigation.md)
   - [Footer](./components/footer.md)
3. [CSS Components](#css-components)
   - [Buttons](./components/buttons.md)
   - [Cards](./components/cards.md)
   - [Badges](./components/badges.md)
   - [Breadcrumbs](./components/breadcrumbs.md)
   - [Icons](./components/icons.md)
4. [UI Components](#ui-components)
   - [Toastr Notifications](./components/toastr.md)
   - [Alert Modals](./components/alert.md)
   - [Modal Windows](./components/modal.md)
   - [Drag & Drop Lists](./components/drag-drop.md)
   - [Forms](./components/forms.md)
5. [Services](#services)
   - [ToastrService](./services/toastr-service.md)
   - [AlertService](./services/alert-service.md)
   - [ModalService](./services/modal-service.md)
   - [DragDropService](./services/drag-drop-service.md)
   - [AuthService](./services/auth-service.md)
6. [Pages & Routing](#pages--routing)
7. [Authentication](#authentication)
8. [State Management](#state-management)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

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

### การ Build สำหรับ Production

เมื่อต้องการ build สำหรับนำไปใช้งานจริง:

```bash
npm run build
```

ไฟล์ที่ได้จะอยู่ในโฟลเดอร์ `dist/`

### การทดสอบ

รันชุดทดสอบ:

```bash
npm test
```

## Layout System

โปรเจคนี้มี Layout System ที่ช่วยในการจัดเลย์เอาต์:

- [PK Grid System](./components/grid.md) - ระบบ grid แบบ responsive ที่ใช้ CSS Grid เป็นฐาน
- [Navigation](./components/navigation.md) - ระบบ navigation ที่มี top bar และ side navigation
- [Footer](./components/footer.md) - Footer component ที่ปรับขนาดตาม content area

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
- ปฏิบัติตาม Angular Style Guide สำหรับการตั้งชื่อและโครงสร้างไฟล์
- ใช้ TypeScript interfaces สำหรับ type safety
- ตรวจสอบ responsive design บนอุปกรณ์ขนาดต่างๆ

## State Management

โปรเจคนี้ใช้ Angular Signals สำหรับการจัดการ state:

- Signal เป็น primitive ใหม่ใน Angular 16+ สำหรับจัดการค่าที่เปลี่ยนแปลง
- Computed values คำนวณค่าใหม่โดยอัตโนมัติเมื่อ dependencies เปลี่ยนแปลง
- Effects ทำงานเมื่อมีการเปลี่ยนแปลงใน signals
- ง่ายต่อการใช้งานและเหมาะสำหรับโปรเจคขนาดเล็กถึงกลาง

## Troubleshooting

### ปัญหาที่พบบ่อย

1. **ปัญหาการติดตั้ง dependencies**
   - ลอง `npm cache clean --force` และติดตั้งใหม่
   - ตรวจสอบเวอร์ชันของ Node.js และ npm ให้ตรงตามความต้องการ

2. **ปัญหาเกี่ยวกับ Tailwind CSS**
   - ตรวจสอบไฟล์ `tailwind.config.ts` และ `postcss.config.js`
   - รัน `npm run build:tailwind` เพื่อสร้าง CSS ใหม่

3. **ปัญหาเกี่ยวกับ Angular**
   - ลอง `ng update` เพื่ออัปเดต Angular CLI และ dependencies
   - ตรวจสอบ browser console สำหรับข้อผิดพลาด

สำหรับปัญหาอื่นๆ โปรดสร้าง issue ที่ [GitHub repository](https://github.com/superpck/angular-seed/issues)
