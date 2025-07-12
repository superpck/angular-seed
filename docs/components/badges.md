# PK Badges Component

ระบบ Badge components ที่รองรับ icons และมีหลายรูปแบบสำหรับแสดงข้อมูลสั้นๆ หรือสถานะต่างๆ

## คุณสมบัติ

- 🏷️ **หลายขนาด**: sm, md, lg
- 🎨 **หลายสี**: primary, success, warning, error, info, dark, light
- 🔄 **หลายรูปแบบ**: solid, outline, gradient
- 📱 **Icon Support**: รองรับ emoji และ SVG icons
- 🎭 **หลายรูปร่าง**: rounded, pill, square
- ✨ **Animation**: pulse และ bounce effects
- 🗑️ **Removable**: สามารถลบได้
- 🔴 **Notification Dots**: จุดแจ้งเตือนเล็กๆ
- ♿ **Accessibility**: รองรับ keyboard navigation และ screen reader

## การใช้งานพื้นฐาน

### Badge ธรรมดา

```html
<span class="pk-badge pk-badge-primary pk-badge-md">
  Primary Badge
</span>
```

### Badge พร้อม Icon

```html
<!-- Emoji Icon -->
<span class="pk-badge pk-badge-success pk-badge-md">
  <span class="pk-badge-icon emoji-icon icon-left">✅</span>
  Success
</span>

<!-- SVG Icon -->
<span class="pk-badge pk-badge-primary pk-badge-md">
  <svg class="pk-badge-icon svg-icon icon-left" viewBox="0 0 24 24">
    <path d="..."/>
  </svg>
  With SVG
</span>
```

## ขนาด (Sizes)

### Small Badge
```html
<span class="pk-badge pk-badge-primary pk-badge-sm">
  <span class="pk-badge-icon emoji-icon icon-left">📱</span>
  Small
</span>
```

### Medium Badge (Default)
```html
<span class="pk-badge pk-badge-primary pk-badge-md">
  <span class="pk-badge-icon emoji-icon icon-left">💻</span>
  Medium
</span>
```

### Large Badge
```html
<span class="pk-badge pk-badge-primary pk-badge-lg">
  <span class="pk-badge-icon emoji-icon icon-left">🖥️</span>
  Large
</span>
```

## สี (Colors)

### สีหลัก
```html
<span class="pk-badge pk-badge-primary">Primary</span>
<span class="pk-badge pk-badge-success">Success</span>
<span class="pk-badge pk-badge-warning">Warning</span>
<span class="pk-badge pk-badge-error">Error</span>
<span class="pk-badge pk-badge-info">Info</span>
<span class="pk-badge pk-badge-dark">Dark</span>
<span class="pk-badge pk-badge-light">Light</span>
```

## รูปแบบ (Styles)

### Outline Badges
```html
<span class="pk-badge pk-badge-outline pk-badge-primary">
  <span class="pk-badge-icon emoji-icon icon-left">🔵</span>
  Primary Outline
</span>
```

### Gradient Badges
```html
<span class="pk-badge pk-badge-gradient pk-badge-primary">
  <span class="pk-badge-icon emoji-icon icon-left">✨</span>
  Gradient Badge
</span>
```

## ตำแหน่ง Icon

### Icon ทางซ้าย
```html
<span class="pk-badge pk-badge-primary">
  <span class="pk-badge-icon emoji-icon icon-left">👈</span>
  Icon Left
</span>
```

### Icon ทางขวา
```html
<span class="pk-badge pk-badge-success">
  Icon Right
  <span class="pk-badge-icon emoji-icon icon-right">👉</span>
</span>
```

### Icon ทั้งสองด้าน
```html
<span class="pk-badge pk-badge-warning">
  <span class="pk-badge-icon emoji-icon icon-left">🎯</span>
  Both Icons
  <span class="pk-badge-icon emoji-icon icon-right">✨</span>
</span>
```

## รูปร่าง (Shapes)

### Default Rounded
```html
<span class="pk-badge pk-badge-primary">Default</span>
```

### Pill Shape
```html
<span class="pk-badge pk-badge-success pk-badge-pill">Pill</span>
```

### Square
```html
<span class="pk-badge pk-badge-warning pk-badge-square">Square</span>
```

## Removable Badges

```html
<span class="pk-badge pk-badge-primary pk-badge-removable">
  <span class="pk-badge-icon emoji-icon icon-left">📧</span>
  Messages
  <button class="pk-badge-close" 
          (click)="removeBadge()"
          (keydown.enter)="removeBadge()"
          (keydown.space)="removeBadge()"
          type="button"
          aria-label="Remove badge">
    <span class="pk-badge-icon emoji-icon">❌</span>
  </button>
</span>
```

## Notification Dots

```html
<!-- Different sizes -->
<span class="pk-badge pk-badge-dot pk-badge-primary pk-badge-sm"></span>
<span class="pk-badge pk-badge-dot pk-badge-success pk-badge-md"></span>
<span class="pk-badge pk-badge-dot pk-badge-error pk-badge-lg"></span>

<!-- With animation -->
<span class="pk-badge pk-badge-dot pk-badge-warning pk-badge-pulse"></span>
```

## Animations

### Pulse Animation
```html
<span class="pk-badge pk-badge-primary pk-badge-pulse">
  <span class="pk-badge-icon emoji-icon icon-left">💫</span>
  Pulse
</span>
```

### Bounce Animation
```html
<span class="pk-badge pk-badge-success pk-badge-bounce">
  <span class="pk-badge-icon emoji-icon icon-left">🎾</span>
  Bounce
</span>
```

## Badge Groups

```html
<div class="pk-badge-group">
  <span class="pk-badge pk-badge-primary">Badge 1</span>
  <span class="pk-badge pk-badge-success">Badge 2</span>
  <span class="pk-badge pk-badge-warning">Badge 3</span>
</div>

<!-- Different spacing -->
<div class="pk-badge-group pk-badge-group-sm">Small spacing</div>
<div class="pk-badge-group pk-badge-group-lg">Large spacing</div>
```

## TypeScript Integration

### Component Example
```typescript
export class MyComponent {
  badges = [
    { text: 'Active', icon: '🟢', type: 'success' },
    { text: 'Pending', icon: '🟡', type: 'warning' },
    { text: 'Error', icon: '🔴', type: 'error' }
  ];
  
  removeBadge(index: number): void {
    this.badges.splice(index, 1);
  }
}
```

### Template Example
```html
<div class="pk-badge-group">
  <span *ngFor="let badge of badges; let i = index" 
        class="pk-badge pk-badge-{{badge.type}} pk-badge-removable">
    <span class="pk-badge-icon emoji-icon icon-left">{{ badge.icon }}</span>
    {{ badge.text }}
    <button class="pk-badge-close" (click)="removeBadge(i)">
      <span class="pk-badge-icon emoji-icon">❌</span>
    </button>
  </span>
</div>
```

## CSS Classes Reference

### Base Classes
- `.pk-badge` - คลาสพื้นฐาน (จำเป็น)

### Size Classes
- `.pk-badge-sm` - ขนาดเล็ก
- `.pk-badge-md` - ขนาดกลาง (default)
- `.pk-badge-lg` - ขนาดใหญ่

### Color Classes
- `.pk-badge-primary` - สีน้ำเงิน
- `.pk-badge-success` - สีเขียว
- `.pk-badge-warning` - สีเหลือง
- `.pk-badge-error` - สีแดง
- `.pk-badge-info` - สีฟ้า
- `.pk-badge-dark` - สีเทาเข้ม
- `.pk-badge-light` - สีเทาอ่อน

### Style Modifier Classes
- `.pk-badge-outline` - รูปแบบขอบ
- `.pk-badge-gradient` - รูปแบบ gradient
- `.pk-badge-pill` - รูปร่างแคปซูล
- `.pk-badge-square` - รูปร่างสี่เหลี่ยม
- `.pk-badge-dot` - จุดแจ้งเตือน
- `.pk-badge-removable` - สามารถลบได้
- `.pk-badge-pulse` - Animation แบบกระพริบ
- `.pk-badge-bounce` - Animation แบบเด้ง

### Icon Classes
- `.pk-badge-icon` - คลาสพื้นฐานสำหรับ icon
- `.icon-left` - วาง icon ทางซ้าย
- `.icon-right` - วาง icon ทางขวา
- `.emoji-icon` - สำหรับ emoji icons
- `.svg-icon` - สำหรับ SVG icons

### Group Classes
- `.pk-badge-group` - กลุ่ม badges
- `.pk-badge-group-sm` - ระยะห่างเล็ก
- `.pk-badge-group-lg` - ระยะห่างใหญ่

## Best Practices

### 1. การใช้สี
- ใช้ `success` สำหรับสถานะสำเร็จ
- ใช้ `warning` สำหรับคำเตือน
- ใช้ `error` สำหรับข้อผิดพลาด
- ใช้ `info` สำหรับข้อมูลเพิ่มเติม

### 2. การใช้ขนาด
- `sm` สำหรับพื้นที่จำกัด
- `md` สำหรับการใช้งานทั่วไป
- `lg` สำหรับ emphasis หรือหัวข้อ

### 3. Accessibility
- ใช้ `aria-label` สำหรับ removable badges
- รองรับ keyboard navigation ด้วย `keydown.enter` และ `keydown.space`
- ใช้ semantic colors ที่เหมาะสม

### 4. Performance
- หลีกเลี่ยงการใช้ animation มากเกินไป
- ใช้ `trackBy` สำหรับ `*ngFor` ที่มี badges จำนวนมาก

## ตัวอย่างการใช้งานจริง

### Status Indicators
```html
<span class="pk-badge pk-badge-success pk-badge-sm">
  <span class="pk-badge-icon emoji-icon icon-left">🟢</span>
  Online
</span>
```

### Notification Count
```html
<span class="pk-badge pk-badge-error pk-badge-sm">
  <span class="pk-badge-icon emoji-icon icon-left">📧</span>
  99+
</span>
```

### Tag System
```html
<div class="pk-badge-group">
  <span class="pk-badge pk-badge-primary pk-badge-pill">Frontend</span>
  <span class="pk-badge pk-badge-success pk-badge-pill">TypeScript</span>
  <span class="pk-badge pk-badge-info pk-badge-pill">Angular</span>
</div>
```

รองรับการใช้งานบน `/badges-demo` สำหรับดูตัวอย่างและทดสอบ functionality ต่างๆ
