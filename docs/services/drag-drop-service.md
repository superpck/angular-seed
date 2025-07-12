# DragDropService

Service สำหรับจัดการข้อมูลและการทำงานของ drag-drop component รวมถึงการสร้าง การย้าย การโอน และการกรองข้อมูล

## การใช้งาน

### Import Service

```typescript
import { DragDropService } from '@shared/services/drag-drop.service';

constructor(private dragDropService: DragDropService) {}
```

## Methods

### createItems()

สร้างรายการ `DragDropItem[]` จาก array ของ string

```typescript
createItems(contents: string[]): DragDropItem[]
```

**Parameters:**
- `contents` - Array ของ string ที่จะแปลงเป็น DragDropItem

**Returns:**
- `DragDropItem[]` - Array ของ DragDropItem

**ตัวอย่าง:**
```typescript
const items = this.dragDropService.createItems([
  'รายการที่ 1',
  'รายการที่ 2',
  'รายการที่ 3'
]);

// ผลลัพธ์:
// [
//   { id: '1', content: 'รายการที่ 1' },
//   { id: '2', content: 'รายการที่ 2' },
//   { id: '3', content: 'รายการที่ 3' }
// ]
```

### moveItem()

ย้ายรายการจากตำแหน่งหนึ่งไปยังอีกตำแหน่งหนึ่งภายใน array เดียวกัน

```typescript
moveItem(items: DragDropItem[], fromIndex: number, toIndex: number): DragDropItem[]
```

**Parameters:**
- `items` - Array ของ DragDropItem
- `fromIndex` - ตำแหน่งเดิม
- `toIndex` - ตำแหน่งใหม่

**Returns:**
- `DragDropItem[]` - Array ใหม่ที่มีการเรียงลำดับใหม่

**ตัวอย่าง:**
```typescript
const items = [
  { id: '1', content: 'A' },
  { id: '2', content: 'B' },
  { id: '3', content: 'C' }
];

const reordered = this.dragDropService.moveItem(items, 0, 2);
// ผลลัพธ์: [{ id: '2', content: 'B' }, { id: '3', content: 'C' }, { id: '1', content: 'A' }]
```

### transferItem()

โอนรายการจาก array หนึ่งไปยังอีก array หนึ่ง

```typescript
transferItem(
  sourceItems: DragDropItem[], 
  targetItems: DragDropItem[], 
  item: DragDropItem, 
  targetIndex: number
): { source: DragDropItem[], target: DragDropItem[] }
```

**Parameters:**
- `sourceItems` - Array ต้นทาง
- `targetItems` - Array ปลายทาง
- `item` - รายการที่จะโอน
- `targetIndex` - ตำแหน่งใน array ปลายทาง

**Returns:**
- Object ที่มี `source` และ `target` arrays ใหม่

**ตัวอย่าง:**
```typescript
const sourceItems = [
  { id: '1', content: 'A' },
  { id: '2', content: 'B' }
];

const targetItems = [
  { id: '3', content: 'C' }
];

const item = { id: '1', content: 'A' };

const result = this.dragDropService.transferItem(sourceItems, targetItems, item, 0);

// ผลลัพธ์:
// {
//   source: [{ id: '2', content: 'B' }],
//   target: [{ id: '1', content: 'A' }, { id: '3', content: 'C' }]
// }
```

### handleTransfer()

จัดการการโอนรายการระหว่าง container พร้อมการอัปเดต arrays ต้นทางและปลายทาง

```typescript
handleTransfer(
  containers: Map<string, DragDropItem[]>,
  fromContainerId: string,
  toContainerId: string,
  item: DragDropItem,
  targetIndex: number
): Map<string, DragDropItem[]>
```

**Parameters:**
- `containers` - Map ของ container ID และ items
- `fromContainerId` - ID ของ container ต้นทาง
- `toContainerId` - ID ของ container ปลายทาง
- `item` - รายการที่จะโอน
- `targetIndex` - ตำแหน่งใน container ปลายทาง

**Returns:**
- `Map<string, DragDropItem[]>` - Map ใหม่ที่มีการอัปเดตแล้ว

**ตัวอย่าง:**
```typescript
const containers = new Map([
  ['todo', [{ id: '1', content: 'Task 1' }, { id: '2', content: 'Task 2' }]],
  ['progress', [{ id: '3', content: 'Task 3' }]]
]);

const item = { id: '1', content: 'Task 1' };

const updated = this.dragDropService.handleTransfer(
  containers, 
  'todo', 
  'progress', 
  item, 
  1
);

// ผลลัพธ์:
// Map([
//   ['todo', [{ id: '2', content: 'Task 2' }]],
//   ['progress', [{ id: '3', content: 'Task 3' }, { id: '1', content: 'Task 1' }]]
// ])
```

### filterItems()

กรองรายการตามคำค้นหา

```typescript
filterItems(items: DragDropItem[], searchTerm: string): DragDropItem[]
```

**Parameters:**
- `items` - Array ของ DragDropItem ที่จะกรอง
- `searchTerm` - คำค้นหา

**Returns:**
- `DragDropItem[]` - Array ที่ถูกกรองแล้ว

**ตัวอย่าง:**
```typescript
const items = [
  { id: '1', content: 'Apple' },
  { id: '2', content: 'Banana' },
  { id: '3', content: 'Orange' }
];

const filtered = this.dragDropService.filterItems(items, 'app');
// ผลลัพธ์: [{ id: '1', content: 'Apple' }]
```

## การใช้งานร่วมกับ Component

### พื้นฐาน

```typescript
export class MyComponent {
  items: DragDropItem[] = [];

  constructor(private dragDropService: DragDropService) {
    // สร้างรายการเริ่มต้น
    this.items = this.dragDropService.createItems([
      'รายการ 1',
      'รายการ 2',
      'รายการ 3'
    ]);
  }

  onItemsChange(event: DragDropChangeEvent): void {
    // อัปเดตรายการเมื่อมีการย้าย
    this.items = [...event.items];
  }

  addNewItem(content: string): void {
    const newItem: DragDropItem = {
      id: `item-${Date.now()}`,
      content: content
    };
    this.items = [...this.items, newItem];
  }

  removeItem(itemId: string | number): void {
    this.items = this.items.filter(item => item.id !== itemId);
  }
}
```

### การใช้งานแบบ Kanban Board

```typescript
export class KanbanComponent {
  toDoItems: DragDropItem[] = [];
  progressItems: DragDropItem[] = [];
  doneItems: DragDropItem[] = [];

  constructor(private dragDropService: DragDropService) {
    this.initializeData();
  }

  private initializeData(): void {
    this.toDoItems = this.dragDropService.createItems([
      'Task 1', 'Task 2', 'Task 3'
    ]);
    
    this.progressItems = this.dragDropService.createItems([
      'Task 4', 'Task 5'
    ]);
    
    this.doneItems = this.dragDropService.createItems([
      'Task 6'
    ]);
  }

  onToDoTransfer(event: DragDropTransferEvent): void {
    // ลบออกจาก To Do
    this.toDoItems = this.toDoItems.filter(item => item.id !== event.item.id);
    
    // เพิ่มไปยัง target container
    this.addToTargetContainer(event.item, event.toContainer);
  }

  private addToTargetContainer(item: DragDropItem, containerId: string): void {
    switch (containerId) {
      case 'progress-container':
        this.progressItems = [...this.progressItems, item];
        break;
      case 'done-container':
        this.doneItems = [...this.doneItems, item];
        break;
    }
  }
}
```

## Best Practices

1. **Immutability**: Service จะคืนค่า array ใหม่เสมอ ไม่แก้ไข array เดิม
2. **Error Handling**: ตรวจสอบ index และ item ID ก่อนเรียกใช้ method
3. **Performance**: ใช้ service methods แทนการเขียน logic การจัดการ array เอง
4. **Type Safety**: ใช้ TypeScript interfaces ที่มีให้เพื่อความปลอดภัยของ type

```typescript
// ❌ อย่าทำแบบนี้
items.splice(fromIndex, 1);
items.splice(toIndex, 0, movedItem);

// ✅ ทำแบบนี้
items = this.dragDropService.moveItem(items, fromIndex, toIndex);
```

## Integration กับ Angular CDK

Service นี้ทำงานร่วมกับ Angular CDK Drag Drop seamlessly:

```typescript
import { CdkDragDrop } from '@angular/cdk/drag-drop';

onDrop(event: CdkDragDrop<DragDropItem[]>): void {
  if (event.previousContainer === event.container) {
    // Same container - reorder
    this.items = this.dragDropService.moveItem(
      this.items,
      event.previousIndex,
      event.currentIndex
    );
  } else {
    // Different containers - transfer
    const result = this.dragDropService.transferItem(
      event.previousContainer.data,
      event.container.data,
      event.item.data,
      event.currentIndex
    );
    
    event.previousContainer.data = result.source;
    event.container.data = result.target;
  }
}
```
