import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropComponent } from '../shared/drag-drop/drag-drop.component';
import { DragDropItem, DragDropConfig, DragDropChangeEvent, DragDropTransferEvent } from '../shared/models/drag-drop.model';
import { DragDropService } from '../shared/services/drag-drop.service';

@Component({
  selector: 'app-drag-drop-demo',
  standalone: true,
  imports: [CommonModule, DragDropComponent],
  templateUrl: './drag-drop-demo.component.html',
  styleUrls: ['./drag-drop-demo.component.scss']
})
export class DragDropDemoComponent implements OnInit {
  private dragDropService = inject(DragDropService);
  
  // Kanban board columns
  toDoItems: DragDropItem[] = [];
  inProgressItems: DragDropItem[] = [];
  doneItems: DragDropItem[] = [];

  // Configuration for connected containers (cross-window dragging)
  toDoConfig: DragDropConfig = {
    containerId: 'todo-container',
    connectWith: ['progress-container', 'done-container'],
    allowReorder: true,
    showFilter: true,
    filterPlaceholder: 'ค้นหางาน To Do...',
    emptyMessage: 'ไม่มีงานที่ต้องทำ'
  };

  inProgressConfig: DragDropConfig = {
    containerId: 'progress-container',
    connectWith: ['todo-container', 'done-container'],
    allowReorder: true,
    showFilter: true,
    filterPlaceholder: 'ค้นหางานที่กำลังทำ...',
    emptyMessage: 'ไม่มีงานที่กำลังดำเนินการ'
  };

  doneConfig: DragDropConfig = {
    containerId: 'done-container',
    connectWith: ['todo-container', 'progress-container'],
    allowReorder: true,
    showFilter: false,
    emptyMessage: 'ไม่มีงานที่เสร็จแล้ว'
  };

  // Simple demo
  basicItems: DragDropItem[] = [];
  basicConfig: DragDropConfig = {
    allowReorder: true,
    showFilter: true,
    filterPlaceholder: 'ค้นหารายการ...',
    emptyMessage: 'ไม่พบรายการ'
  };

  ngOnInit(): void {
    this.initializeKanbanData();
    this.initializeBasicItems();
  }

  private initializeKanbanData(): void {
    const toDoData = [
      { id: 'task1', content: 'ออกแบบ User Interface', data: { priority: 'high', assignee: 'John' } },
      { id: 'task2', content: 'เขียน Unit Tests', data: { priority: 'medium', assignee: 'Jane' } },
      { id: 'task3', content: 'ทำเอกสาร API', data: { priority: 'low', assignee: 'Bob' } },
      { id: 'task4', content: 'วิเคราะห์ความต้องการ', data: { priority: 'high', assignee: 'Alice' } }
    ];

    const inProgressData = [
      { id: 'task5', content: 'พัฒนา Authentication', data: { priority: 'high', assignee: 'John' } },
      { id: 'task6', content: 'ติดตั้ง Database', data: { priority: 'medium', assignee: 'Jane' } }
    ];

    const doneData = [
      { id: 'task7', content: 'ตั้งค่า Project', data: { priority: 'high', assignee: 'John' } },
      { id: 'task8', content: 'กำหนดค่า Environment', data: { priority: 'medium', assignee: 'Bob' } }
    ];

    this.toDoItems = toDoData;
    this.inProgressItems = inProgressData;
    this.doneItems = doneData;
  }

  private initializeBasicItems(): void {
    const basicData = [
      'รายการที่ 1',
      'รายการที่ 2', 
      'รายการที่ 3',
      'รายการที่ 4',
      'รายการที่ 5'
    ];
    this.basicItems = this.dragDropService.createItems(basicData);
  }

  // Handle changes within same container
  onToDoChange(event: DragDropChangeEvent): void {
    console.log('To Do items changed:', event);
    this.toDoItems = [...event.items];
  }

  onInProgressChange(event: DragDropChangeEvent): void {
    console.log('In Progress items changed:', event);
    this.inProgressItems = [...event.items];
  }

  onDoneChange(event: DragDropChangeEvent): void {
    console.log('Done items changed:', event);
    this.doneItems = [...event.items];
  }

  onBasicItemsChange(event: DragDropChangeEvent): void {
    console.log('Basic items changed:', event);
    this.basicItems = [...event.items];
  }

  // Handle transfers between containers (cross-window)
  onToDoTransfer(event: DragDropTransferEvent): void {
    console.log('Item transferred from To Do:', event);
    // Remove from To Do
    this.toDoItems = this.toDoItems.filter(item => item.id !== event.item.id);
    // Add to target
    this.addToTargetContainer(event.item, event.toContainer);
  }

  onInProgressTransfer(event: DragDropTransferEvent): void {
    console.log('Item transferred from In Progress:', event);
    // Remove from In Progress
    this.inProgressItems = this.inProgressItems.filter(item => item.id !== event.item.id);
    // Add to target
    this.addToTargetContainer(event.item, event.toContainer);
  }

  onDoneTransfer(event: DragDropTransferEvent): void {
    console.log('Item transferred from Done:', event);
    // Remove from Done
    this.doneItems = this.doneItems.filter(item => item.id !== event.item.id);
    // Add to target
    this.addToTargetContainer(event.item, event.toContainer);
  }

  private addToTargetContainer(item: DragDropItem, containerId: string): void {
    switch (containerId) {
      case 'todo-container':
        this.toDoItems = [...this.toDoItems, item];
        break;
      case 'progress-container':
        this.inProgressItems = [...this.inProgressItems, item];
        break;
      case 'done-container':
        this.doneItems = [...this.doneItems, item];
        break;
    }
  }

  // Helper methods for demo
  addToDoTask(): void {
    const newId = `task-${Date.now()}`;
    const newTask: DragDropItem = {
      id: newId,
      content: `งานใหม่ ${this.toDoItems.length + 1}`,
      data: { priority: 'medium', assignee: 'New User' }
    };
    this.toDoItems = [...this.toDoItems, newTask];
  }

  addBasicItem(): void {
    const newId = this.basicItems.length + 1;
    const newItem: DragDropItem = {
      id: `basic-${newId}`,
      content: `รายการใหม่ ${newId}`
    };
    this.basicItems = [...this.basicItems, newItem];
  }

  getTaskPriority(item: DragDropItem): string {
    return (item.data as { priority?: string })?.priority || 'medium';
  }

  getTaskAssignee(item: DragDropItem): string {
    return (item.data as { assignee?: string })?.assignee || 'Unknown';
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
