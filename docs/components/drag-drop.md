# PK Drag & Drop Component

Component สำหรับการสร้างรายการที่สามารถลาก-วางเพื่อเรียงลำดับใหม่ได้ พร้อมความสามารถในการค้นหา การกรองข้อมูล และการเชื่อมต่อระหว่าง container

## การใช้งานพื้นฐาน

### 1. Import Component

```typescript
import { DragDropComponent } from '@shared/drag-drop/drag-drop.component';

@Component({
  standalone: true,
  imports: [DragDropComponent],
  // ...
})
```

### 2. ใช้ใน Template

```html
<app-drag-drop
  [items]="items"
  [config]="config"
  (itemsChange)="onItemsChange($event)">
</app-drag-drop>
```

### 3. กำหนดข้อมูลใน Component

```typescript
import { DragDropItem, DragDropConfig, DragDropChangeEvent } from '@shared/models/drag-drop.model';

export class MyComponent {
  items: DragDropItem[] = [
    { id: '1', content: 'รายการ 1' },
    { id: '2', content: 'รายการ 2' },
    { id: '3', content: 'รายการ 3', disabled: true }
  ];

  config: DragDropConfig = {
    allowReorder: true,
    showFilter: true,
    filterPlaceholder: 'ค้นหารายการ...',
    emptyMessage: 'ไม่พบรายการ'
  };

  onItemsChange(event: DragDropChangeEvent): void {
    this.items = [...event.items];
    console.log('Items reordered:', event);
  }
}
```

## Interfaces

### DragDropItem

```typescript
interface DragDropItem {
  id: string | number;        // ID เฉพาะของรายการ
  content: string;            // เนื้อหาที่จะแสดง
  data?: unknown;            // ข้อมูลเพิ่มเติม
  disabled?: boolean;        // ปิดใช้งานการลาก-วาง
}
```

### DragDropConfig

```typescript
interface DragDropConfig {
  allowReorder?: boolean;     // อนุญาตให้เรียงลำดับใหม่ได้ (default: true)
  showFilter?: boolean;       // แสดงช่องค้นหา (default: false)
  filterPlaceholder?: string; // ข้อความใน placeholder ของช่องค้นหา
  emptyMessage?: string;      // ข้อความเมื่อไม่มีรายการ
  itemHeight?: string;        // ความสูงของแต่ละรายการ (CSS value)
  maxHeight?: string;         // ความสูงสูงสุดของ container (CSS value)
  connectWith?: string[];     // Array ของ container ID ที่สามารถเชื่อมต่อได้
  containerId?: string;       // ID เฉพาะของ container นี้
}
```

### DragDropChangeEvent

```typescript
interface DragDropChangeEvent {
  items: DragDropItem[];      // รายการทั้งหมดหลังจากการเปลี่ยนแปลง
  movedItem?: DragDropItem;   // รายการที่ถูกย้าย
  fromIndex?: number;         // ตำแหน่งเดิม
  toIndex?: number;           // ตำแหน่งใหม่
  fromContainer?: string;     // Container ต้นทาง
  toContainer?: string;       // Container ปลายทาง
}
```

### DragDropTransferEvent

```typescript
interface DragDropTransferEvent {
  item: DragDropItem;         // รายการที่ถูกโอน
  fromContainer: string;      // Container ต้นทาง
  toContainer: string;        // Container ปลายทาง
  fromIndex: number;          // ตำแหน่งใน container ต้นทาง
  toIndex: number;            // ตำแหน่งใน container ปลายทาง
}
```

## การใช้งานขั้นสูง

### Custom Template

สามารถกำหนดรูปแบบการแสดงผลของแต่ละรายการได้:

```html
<app-drag-drop
  [items]="items"
  [config]="config"
  (itemsChange)="onItemsChange($event)">
  
  <ng-template #itemTemplate let-item>
    <div class="custom-item">
      <h3>{{ item.content }}</h3>
      <p>{{ item.data?.description }}</p>
      <span class="badge">{{ item.data?.category }}</span>
    </div>
  </ng-template>
</app-drag-drop>
```

### Cross-Window Dragging (Kanban Board)

การเชื่อมต่อระหว่าง container หลายตัวเพื่อให้สามารถลากรายการข้ามไปมาได้:

```typescript
// To Do Column
toDoConfig: DragDropConfig = {
  containerId: 'todo-container',
  connectWith: ['progress-container', 'done-container'],
  allowReorder: true,
  showFilter: true
};

// In Progress Column
progressConfig: DragDropConfig = {
  containerId: 'progress-container',
  connectWith: ['todo-container', 'done-container'],
  allowReorder: true,
  showFilter: true
};

// Done Column
doneConfig: DragDropConfig = {
  containerId: 'done-container',
  connectWith: ['todo-container', 'progress-container'],
  allowReorder: true
};
```

```html
<!-- To Do -->
<app-drag-drop
  [items]="toDoItems"
  [config]="toDoConfig"
  (itemsChange)="onToDoChange($event)"
  (itemTransfer)="onToDoTransfer($event)">
</app-drag-drop>

<!-- In Progress -->
<app-drag-drop
  [items]="progressItems"
  [config]="progressConfig"
  (itemsChange)="onProgressChange($event)"
  (itemTransfer)="onProgressTransfer($event)">
</app-drag-drop>

<!-- Done -->
<app-drag-drop
  [items]="doneItems"
  [config]="doneConfig"
  (itemsChange)="onDoneChange($event)"
  (itemTransfer)="onDoneTransfer($event)">
</app-drag-drop>
```

```typescript
// Handle transfers between containers
onToDoTransfer(event: DragDropTransferEvent): void {
  // Remove from To Do
  this.toDoItems = this.toDoItems.filter(item => item.id !== event.item.id);
  
  // Add to target container
  if (event.toContainer === 'progress-container') {
    this.progressItems = [...this.progressItems, event.item];
  } else if (event.toContainer === 'done-container') {
    this.doneItems = [...this.doneItems, event.item];
  }
}
```

## DragDropService

Service สำหรับจัดการข้อมูลและการทำงานของ drag-drop:

```typescript
import { DragDropService } from '@shared/services/drag-drop.service';

constructor(private dragDropService: DragDropService) {}

// สร้างรายการจาก array ของ string
items = this.dragDropService.createItems(['Item 1', 'Item 2', 'Item 3']);

// ย้ายรายการ
this.dragDropService.moveItem(items, 0, 2);

// โอนรายการระหว่าง container
this.dragDropService.transferItem(sourceItems, targetItems, item, targetIndex);

// กรองรายการ
const filtered = this.dragDropService.filterItems(items, 'search term');
```

## API Reference

### Properties (Input)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `DragDropItem[]` | `[]` | รายการข้อมูลที่จะแสดง |
| `config` | `DragDropConfig` | `{}` | การตั้งค่าการทำงาน |

### Events (Output)

| Event | Type | Description |
|-------|------|-------------|
| `itemsChange` | `DragDropChangeEvent` | เหตุการณ์เมื่อมีการเปลี่ยนแปลงลำดับรายการ |
| `itemTransfer` | `DragDropTransferEvent` | เหตุการณ์เมื่อมีการโอนรายการไปยัง container อื่น |

### Content Projection

| Slot | Description |
|------|-------------|
| `itemTemplate` | Template สำหรับกำหนดรูปแบบการแสดงผลของแต่ละรายการ |

## ตัวอย่างการใช้งาน

ดูตัวอย่างการใช้งานที่หน้า `/drag-drop-demo` ซึ่งประกอบด้วย:

1. **Kanban Board** - ตัวอย่างการใช้งานแบบ cross-window dragging
2. **Basic List** - การใช้งานพื้นฐานพร้อมการค้นหา
3. **Custom Templates** - การใช้งาน custom template สำหรับแสดงข้อมูลเพิ่มเติม

## Best Practices

1. **ใช้ unique ID**: ตรวจสอบให้แน่ใจว่าแต่ละ item มี ID ที่ไม่ซ้ำกัน
2. **Immutable Updates**: ใช้ spread operator เพื่อสร้าง array ใหม่เมื่ออัปเดตข้อมูล
3. **Error Handling**: จัดการ error case สำหรับข้อมูลที่ไม่ถูกต้อง
4. **Performance**: ใช้ trackBy function สำหรับ list ที่มีข้อมูลจำนวนมาก
5. **Accessibility**: ตั้งค่า aria-label และ keyboard navigation สำหรับ accessibility

```typescript
// ตัวอย่าง trackBy function
trackByFn(index: number, item: DragDropItem): any {
  return item.id;
}
```

```html
<app-drag-drop
  [items]="items"
  [config]="config"
  [trackByFn]="trackByFn"
  (itemsChange)="onItemsChange($event)">
</app-drag-drop>
```
