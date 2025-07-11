# PK Grid System

ระบบ Grid แบบ responsive ที่ใช้ CSS Grid เป็นฐาน สำหรับการจัดเลย์เอาต์ที่ยืดหยุ่นและปรับตัวได้ตามขนาดหน้าจอ

## ภาพรวม

PK Grid System เป็นระบบ layout ที่ใช้ CSS Grid เป็นพื้นฐาน โดยจัดแบ่งหน้าจอออกเป็น 12 คอลัมน์ พร้อมรองรับการปรับเปลี่ยนขนาดตาม breakpoints ต่างๆ

## Breakpoints

| Breakpoint | Min width | Description |
|------------|-----------|-------------|
| (default)  | 0px       | ทุกขนาดหน้าจอ (mobile first) |
| sm         | 640px     | Small screens และขึ้นไป |
| md         | 768px     | Medium screens และขึ้นไป |
| lg         | 1024px    | Large screens และขึ้นไป |
| xl         | 1280px    | Extra large screens และขึ้นไป |

## การใช้งานพื้นฐาน

### สร้าง Grid Container

ใช้ class `.pk-row` เพื่อสร้าง grid container:

```html
<div class="pk-row">
  <!-- columns จะอยู่ภายใน -->
</div>
```

### กำหนดขนาดคอลัมน์

ใช้ class `.pk-col-{ขนาด}` เพื่อกำหนดขนาดคอลัมน์ (1-12):

```html
<div class="pk-row">
  <div class="pk-col-6">คอลัมน์ขนาด 6</div>
  <div class="pk-col-6">คอลัมน์ขนาด 6</div>
</div>
```

## Responsive Design

### ใช้ Breakpoints

สามารถกำหนดขนาดคอลัมน์ที่แตกต่างกันสำหรับ breakpoints ต่างๆ:

```html
<div class="pk-row">
  <div class="pk-col-12 pk-col-sm-6 pk-col-md-4 pk-col-lg-3 pk-col-xl-2">
    <!-- 
    - Mobile: 12 คอลัมน์ (เต็มความกว้าง)
    - Small: 6 คอลัมน์ (ครึ่งหนึ่ง)
    - Medium: 4 คอลัมน์ (1/3)
    - Large: 3 คอลัมน์ (1/4)
    - XL: 2 คอลัมน์ (1/6)
    -->
  </div>
</div>
```

## Classes ที่ใช้ได้

### Grid Container
- `.pk-row` - สร้าง grid container พร้อม 12 columns

### Column Sizes
- `.pk-col-{1-12}` - ขนาดคอลัมน์สำหรับทุกขนาดหน้าจอ
- `.pk-col-sm-{1-12}` - ขนาดคอลัมน์สำหรับหน้าจอ 640px ขึ้นไป
- `.pk-col-md-{1-12}` - ขนาดคอลัมน์สำหรับหน้าจอ 768px ขึ้นไป
- `.pk-col-lg-{1-12}` - ขนาดคอลัมน์สำหรับหน้าจอ 1024px ขึ้นไป
- `.pk-col-xl-{1-12}` - ขนาดคอลัมน์สำหรับหน้าจอ 1280px ขึ้นไป

### Gap (ระยะห่าง)
- `.pk-row-gap-0` - ไม่มีระยะห่าง
- `.pk-row-gap-1` - ระยะห่าง 0.25rem
- `.pk-row-gap-2` - ระยะห่าง 0.5rem
- `.pk-row-gap-3` - ระยะห่าง 0.75rem
- `.pk-row-gap-4` - ระยะห่าง 1rem (default)
- `.pk-row-gap-5` - ระยะห่าง 1.25rem
- `.pk-row-gap-6` - ระยะห่าง 1.5rem
- `.pk-row-gap-8` - ระยะห่าง 2rem

### Column Positioning
- `.pk-col-start-{1-12}` - กำหนดตำแหน่งเริ่มต้นของคอลัมน์
- `.pk-col-end-{1-13}` - กำหนดตำแหน่งสิ้นสุดของคอลัมน์

### Responsive Gap
- `.pk-row-gap-sm-{0,1,2,3,4,5,6,8}` - ระยะห่างสำหรับหน้าจอ sm ขึ้นไป
- `.pk-row-gap-md-{0,1,2,3,4,5,6,8}` - ระยะห่างสำหรับหน้าจอ md ขึ้นไป
- `.pk-row-gap-lg-{0,1,2,3,4,5,6,8}` - ระยะห่างสำหรับหน้าจอ lg ขึ้นไป
- `.pk-row-gap-xl-{0,1,2,3,4,5,6,8}` - ระยะห่างสำหรับหน้าจอ xl ขึ้นไป

## ตัวอย่างการใช้งาน

### Layout พื้นฐาน

```html
<!-- แถวที่มี 3 คอลัมน์เท่าๆ กัน -->
<div class="pk-row">
  <div class="pk-col-4">คอลัมน์ 1</div>
  <div class="pk-col-4">คอลัมน์ 2</div>
  <div class="pk-col-4">คอลัมน์ 3</div>
</div>

<!-- แถวที่มี 2 คอลัมน์ -->
<div class="pk-row">
  <div class="pk-col-6">คอลัมน์ 1</div>
  <div class="pk-col-6">คอลัมน์ 2</div>
</div>

<!-- แถวที่มีคอลัมน์ขนาดต่างกัน -->
<div class="pk-row">
  <div class="pk-col-3">Sidebar</div>
  <div class="pk-col-9">Main Content</div>
</div>
```

### Responsive Layout

```html
<!-- การ์ดที่ปรับขนาดตามหน้าจอ -->
<div class="pk-row">
  <div class="pk-col-12 pk-col-sm-6 pk-col-md-4 pk-col-lg-3">
    <div class="pk-card">การ์ด 1</div>
  </div>
  <div class="pk-col-12 pk-col-sm-6 pk-col-md-4 pk-col-lg-3">
    <div class="pk-card">การ์ด 2</div>
  </div>
  <div class="pk-col-12 pk-col-sm-6 pk-col-md-4 pk-col-lg-3">
    <div class="pk-card">การ์ด 3</div>
  </div>
  <div class="pk-col-12 pk-col-sm-6 pk-col-md-4 pk-col-lg-3">
    <div class="pk-card">การ์ด 4</div>
  </div>
</div>
```

### ปรับระยะห่าง

```html
<!-- ไม่มีระยะห่าง -->
<div class="pk-row pk-row-gap-0">
  <div class="pk-col-4">คอลัมน์ 1</div>
  <div class="pk-col-4">คอลัมน์ 2</div>
  <div class="pk-col-4">คอลัมน์ 3</div>
</div>

<!-- ระยะห่างใหญ่ -->
<div class="pk-row pk-row-gap-8">
  <div class="pk-col-4">คอลัมน์ 1</div>
  <div class="pk-col-4">คอลัมน์ 2</div>
  <div class="pk-col-4">คอลัมน์ 3</div>
</div>
```

### การจัดตำแหน่งคอลัมน์

```html
<!-- คอลัมน์ที่เริ่มจากตำแหน่งที่ 3 และมีขนาด 6 คอลัมน์ -->
<div class="pk-row">
  <div class="pk-col-6 pk-col-start-3">Centered Content</div>
</div>

<!-- คอลัมน์ที่กำหนดตำแหน่งเริ่มต้นและสิ้นสุดแบบชัดเจน -->
<div class="pk-row">
  <div class="pk-col-start-2 pk-col-end-10">Custom Positioned Content</div>
</div>
```

## Best Practices

1. **Mobile First**: เริ่มจากการออกแบบสำหรับมือถือก่อน แล้วค่อยปรับสำหรับหน้าจอใหญ่
2. **ใช้ Semantic HTML**: ใช้ HTML tags ที่เหมาะสมกับเนื้อหา
3. **ทดสอบใน Breakpoints ต่างๆ**: ตรวจสอบให้แน่ใจว่า layout ทำงานได้ดีในทุกขนาดหน้าจอ
4. **จำกัดการ Nest**: หลีกเลี่ยงการซ้อน grid ลึกเกินไป

## เปรียบเทียบกับ Bootstrap Grid

| คุณสมบัติ | PK Grid | Bootstrap Grid |
|-----------|---------|----------------|
| Base Technology | CSS Grid | Flexbox |
| Columns | 12 | 12 |
| Breakpoints | 5 levels | 5 levels |
| Gap Control | ✅ | ✅ |
| Performance | ดีกว่า | ดี |
| Browser Support | Modern browsers | รองรับกว้างกว่า |

## การทดสอบ

สามารถทดสอบ Grid System ได้ที่หน้า `/grid-demo` ซึ่งมีตัวอย่างการใช้งานแบบต่างๆ และสามารถดูผลลัพธ์ในขนาดหน้าจอต่างๆ
