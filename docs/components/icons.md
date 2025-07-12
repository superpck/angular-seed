# Icons

โปรเจคนี้ใช้ SVG icons ที่สามารถปรับแต่งได้หลากหลาย

## การใช้งาน

คุณสามารถใช้ icons ได้ในสองรูปแบบ:

### 1. SVG Path โดยตรง

```html
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
</svg>
```

### 2. Icon Component (จากระบบ Badges และ Breadcrumbs)

```html
<app-icon type="home" class="text-blue-500"></app-icon>
<app-icon type="user" size="lg" class="text-green-500"></app-icon>
```

## คุณสมบัติ

- **Responsive Sizing** - ปรับขนาดตามขนาดข้อความหรือกำหนดขนาดเอง
- **Color Customization** - ปรับสีตาม theme หรือกำหนดสีเอง
- **Animation Support** - รองรับ animation เช่น pulse, spin
- **Accessibility** - มี ARIA attributes สำหรับ screen readers

## รายการ Icons ที่มีให้

โปรเจคนี้มี icons จาก [Heroicons](https://heroicons.com/) ซึ่งเป็น SVG icons ที่เข้ากันได้ดีกับ Tailwind CSS

### Common Icons

- **Home** - `M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6`
- **User** - `M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z`
- **Settings** - `M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z`
- **Alert** - `M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z`

ดูรายการ icons ทั้งหมดได้ที่หน้า `/icons-demo`

## การกำหนดสไตล์ด้วย Tailwind CSS

คุณสามารถใช้ Tailwind CSS utilities เพื่อปรับแต่ง icons:

```html
<!-- ขนาด -->
<svg class="h-4 w-4"></svg>     <!-- เล็ก -->
<svg class="h-6 w-6"></svg>     <!-- กลาง -->
<svg class="h-8 w-8"></svg>     <!-- ใหญ่ -->

<!-- สี -->
<svg class="text-blue-500"></svg>    <!-- สีฟ้า -->
<svg class="text-red-500"></svg>     <!-- สีแดง -->
<svg class="text-gray-500"></svg>    <!-- สีเทา -->

<!-- Animation -->
<svg class="animate-spin"></svg>     <!-- หมุน -->
<svg class="animate-pulse"></svg>    <!-- เต้น -->
<svg class="animate-bounce"></svg>   <!-- เด้ง -->
```
