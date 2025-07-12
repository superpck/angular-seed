# PK-Tabs Quick Reference

เอกสารอ้างอิงแบบรวดเร็วสำหรับระบบ PK-Tabs

## 🚀 Quick Start

```html
<!-- พื้นฐาน -->
<app-pk-tabs>
  <app-pk-tab title="Tab 1" [active]="true">Content 1</app-pk-tab>
  <app-pk-tab title="Tab 2">Content 2</app-pk-tab>
</app-pk-tabs>

<!-- ขั้นสูง -->
<app-pk-tabs overflow="dropdown" [showAddButton]="true"
             (tabChange)="onTabChange($event)"
             (tabClose)="onTabClose($event)"
             (addTab)="onAddTab()">
  <app-pk-tab title="Dashboard" [active]="true" theme="primary">
    <h3>Dashboard</h3>
  </app-pk-tab>
  
  <app-pk-tab title="Settings" [isClose]="true" theme="warn">
    <h3>Settings</h3>
  </app-pk-tab>
</app-pk-tabs>
```

## 📋 Properties

### PkTabsComponent
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `overflow` | `'scroll' \| 'dropdown' \| 'new-line'` | `'scroll'` | การจัดการเมื่อ tab เยอะ |
| `showAddButton` | `boolean` | `false` | แสดงปุ่ม Add Tab |

### PkTabComponent
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `''` | ชื่อ tab |
| `active` | `boolean` | `false` | tab ที่เปิดอยู่ |
| `disabled` | `boolean` | `false` | ปิดการใช้งาน |
| `isClose` | `boolean` | `false` | แสดงปุ่มปิด |
| `theme` | `'primary' \| 'warn' \| 'success' \| 'error'` | `'primary'` | สีธีม |

## 🎯 Events

| Event | Type | Description |
|-------|------|-------------|
| `(tabChange)` | `number` | เมื่อเปลี่ยน tab |
| `(tabClose)` | `number` | เมื่อขอปิด tab |
| `(addTab)` | `void` | เมื่อคลิกปุ่ม Add |

## 🎨 Themes

```html
<!-- Primary (สีน้ำเงิน - default) -->
<app-pk-tab title="Primary" theme="primary">

<!-- Warning (สีส้ม) -->
<app-pk-tab title="Warning" theme="warn">

<!-- Success (สีเขียว) -->
<app-pk-tab title="Success" theme="success">

<!-- Error (สีแดง) -->
<app-pk-tab title="Error" theme="error">
```

## 🔄 Overflow Strategies

### 1. Scroll (เลื่อนแนวนอน)
```html
<app-pk-tabs overflow="scroll">
  <!-- หลาย tabs จะเลื่อนได้ -->
</app-pk-tabs>
```

### 2. Dropdown (แสดงใน dropdown)
```html
<app-pk-tabs overflow="dropdown">
  <!-- tabs เกินจะอยู่ใน dropdown -->
</app-pk-tabs>
```

### 3. New Line (แบ่งเป็นหลายแถว)
```html
<app-pk-tabs overflow="new-line">
  <!-- tabs เกินจะขึ้นบรรทัดใหม่ -->
</app-pk-tabs>
```

## 🎭 Custom Title Templates

```html
<app-pk-tabs>
  <app-pk-tab theme="success">
    <!-- Title แบบ custom -->
    <ng-template #titleTemplate>
      <i class="fas fa-chart-bar mr-2"></i>
      <span>รายงาน</span>
      <span class="badge bg-green-500 text-white text-xs px-1 rounded ml-1">5</span>
    </ng-template>
    
    <!-- เนื้อหา tab -->
    <div class="p-4">
      เนื้อหารายงาน
    </div>
  </app-pk-tab>
</app-pk-tabs>
```

## 💻 Event Handling Examples

```typescript
export class TabsExampleComponent {
  // จัดการการเปลี่ยน tab
  onTabChange(index: number) {
    console.log('เปลี่ยนไป tab:', index);
    // อัพเดต state หรือ load ข้อมูล
  }
  
  // จัดการการปิด tab
  onTabClose(index: number) {
    console.log('ขอปิด tab:', index);
    
    // แสดง confirmation dialog
    if (confirm('ต้องการปิด tab นี้หรือไม่?')) {
      // ลบ tab ออกจาก array
      this.tabs.splice(index, 1);
    }
  }
  
  // จัดการการเพิ่ม tab
  onAddTab() {
    console.log('ขอเพิ่ม tab ใหม่');
    
    // เพิ่ม tab ใหม่
    this.tabs.push({
      title: `Tab ${this.tabs.length + 1}`,
      content: 'เนื้อหาใหม่'
    });
  }
}
```

## 🎯 Z-Index Layers

```scss
// ลำดับ z-index ของ PK-Tabs
Container:      1000
Tab Items:      102
Active Tab:     103
Close Buttons:  104
Controls:       110
Dropdown:       120
Dropdown Menu:  150
```

## 📱 Responsive Behavior

### Mobile (< 1024px)
- Z-index ที่สูงขึ้นเพื่อการแสดงผลที่ดี
- ปรับ touch interaction
- Dropdown positioning แบบ responsive

### Desktop (≥ 1024px)
- ฟีเจอร์ครบทุกอย่าง
- Hover effects
- Keyboard navigation

## 🔧 CSS Customization

```scss
// ปรับสี theme
:root {
  --primary: #3f51b5;
  --warn: #ff9800;
  --success: #4caf50;
  --error: #f44336;
}

// ปรับแต่ง container
.pk-tabs-container {
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

// ปรับแต่ง tab items
.pk-tab-item {
  font-weight: 500;
  transition: all 0.3s ease;
}
```

## ⚡ Performance Tips

1. **จำกัดจำนวน tabs**: ไม่ควรเกิน 20-30 tabs
2. **ใช้ lazy loading**: โหลดเนื้อหาเมื่อเปิด tab
3. **Virtual scrolling**: สำหรับข้อมูลเยอะๆ ใน tab content
4. **Memoization**: ใช้ `OnPush` change detection strategy

## 🐛 Common Issues & Solutions

### Tab ไม่แสดง
```typescript
// ตรวจสอบว่ามี tab active หรือไม่
ngAfterContentInit() {
  if (!this.tabs.some(tab => tab.active)) {
    this.tabs[0].active = true;
  }
}
```

### Dropdown ถูกตัด
```scss
// เพิ่ม z-index ให้ container
.tabs-container {
  position: relative;
  z-index: 100;
}
```

### Event ไม่ทำงาน
```html
<!-- ตรวจสอบ event binding -->
<app-pk-tabs (tabChange)="onTabChange($event)">
  <!-- ไม่ใช่ tabChanged หรือ onTabChange -->
</app-pk-tabs>
```

## 📚 More Resources

- **Full Documentation**: [PK-TABS.md](./PK-TABS.md)
- **Demo Page**: `/tabs-demo`
- **Source Code**: `src/app/shared/tabs/`
- **Styles**: `src/app/shared/tabs/pk-tabs.component.ts`

## 🎉 Quick Demo

เยี่ยมชม `/tabs-demo` ในแอปพลิเคชันเพื่อดูตัวอย่างการใช้งานแบบครบถ้วน!
