# Navigation Component

Navigation component ในโปรเจคนี้ประกอบด้วย Top Navigation Bar และ Side Navigation ที่ responsive

## การใช้งาน

Navigation component ถูกรวมอยู่ใน AppComponent โดยอัตโนมัติ คุณไม่จำเป็นต้องเพิ่มมันในหน้าอื่นๆ

```html
<app-nav></app-nav>
```

## คุณสมบัติ

- **Top Navigation Bar** - แสดงด้านบนของหน้าจอเสมอ มีลิงก์สำคัญและปุ่ม toggle menu
- **Side Navigation** - สามารถย่อ/ขยายได้ และซ่อน/แสดงในโหมด mobile
- **Responsive Design** - ปรับตามขนาดหน้าจอโดยอัตโนมัติ
- **Nested Menus** - รองรับเมนูแบบซ้อนกันหลายระดับ
- **Icon Support** - แสดง icon ประกอบรายการเมนู
- **Active State** - แสดงสถานะ active ของเมนูที่กำลังเปิดอยู่

## การกำหนดค่า

คุณสามารถกำหนดรายการเมนูได้ใน `nav.component.ts`:

```typescript
menuItems: MenuItem[] = [
  {
    label: 'Home',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    route: '/home'
  },
  // เพิ่มรายการเมนูตามต้องการ
];
```

แต่ละรายการเมนูมีโครงสร้างดังนี้:

```typescript
interface MenuItem {
  label: string;       // ชื่อที่แสดงในเมนู
  icon: string;        // SVG path สำหรับไอคอน
  route?: string;      // เส้นทางที่จะนำทางไปเมื่อคลิก
  children?: MenuItem[]; // เมนูย่อย (ถ้ามี)
  expanded?: boolean;  // สถานะการขยายเมนูย่อย
}
```

## การปรับแต่ง

คุณสามารถปรับแต่งสไตล์ได้ใน `nav.component.scss` โดยใช้ Tailwind CSS utilities หรือ SCSS โดยตรง
