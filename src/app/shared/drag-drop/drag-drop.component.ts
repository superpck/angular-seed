import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropItem, DragDropConfig, DragDropChangeEvent, DragDropTransferEvent } from '../models/drag-drop.model';
import { DragDropService } from '../services/drag-drop.service';

@Component({
  selector: 'app-drag-drop',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit, OnChanges {
  private dragDropService = inject(DragDropService);

  @Input() items: DragDropItem[] = [];
  @Input() config: DragDropConfig = {};
  @Output() itemsChange = new EventEmitter<DragDropChangeEvent>();
  @Output() itemTransfer = new EventEmitter<DragDropTransferEvent>();

  filteredItems: DragDropItem[] = [];
  searchText = '';
  
  // Default config values
  defaultConfig: Required<DragDropConfig> = {
    allowReorder: true,
    showFilter: true,
    filterPlaceholder: 'ค้นหารายการ...',
    emptyMessage: 'ไม่พบรายการ',
    itemHeight: '3rem',
    maxHeight: '400px',
    connectWith: [],
    containerId: ''
  };

  ngOnInit(): void {
    this.applyConfig();
    this.updateFilteredItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.updateFilteredItems();
    }
    if (changes['config']) {
      this.applyConfig();
    }
  }

  private applyConfig(): void {
    this.defaultConfig = { ...this.defaultConfig, ...this.config };
  }

  private updateFilteredItems(): void {
    this.filteredItems = this.dragDropService.filterItems(this.items, this.searchText);
  }

  onFilterChange(): void {
    this.updateFilteredItems();
  }

  onDrop(event: CdkDragDrop<DragDropItem[]>): void {
    if (!this.defaultConfig.allowReorder) {
      return;
    }

    const movedItem = event.previousContainer.data[event.previousIndex];
    
    // ตรวจสอบว่าไอเทมสามารถย้ายได้หรือไม่
    if (!this.dragDropService.canMoveItem(movedItem)) {
      return;
    }

    // ตรวจสอบว่าเป็นการย้ายภายในคอนเทนเนอร์เดียวกันหรือข้ามคอนเทนเนอร์
    if (event.previousContainer === event.container) {
      // ย้ายภายในคอนเทนเนอร์เดียวกัน
      if (event.previousIndex !== event.currentIndex) {
        const newItems = this.dragDropService.moveItem(this.items, event.previousIndex, event.currentIndex);
        
        this.updateFilteredItems();

        const changeEvent: DragDropChangeEvent = {
          items: newItems,
          movedItem,
          fromIndex: event.previousIndex,
          toIndex: event.currentIndex,
          fromContainer: this.defaultConfig.containerId,
          toContainer: this.defaultConfig.containerId
        };

        this.itemsChange.emit(changeEvent);
      }
    } else {
      // ย้ายข้ามคอนเทนเนอร์
      const transferEvent: DragDropTransferEvent = {
        item: movedItem,
        fromContainer: event.previousContainer.id,
        toContainer: event.container.id,
        fromIndex: event.previousIndex,
        toIndex: event.currentIndex
      };

      this.itemTransfer.emit(transferEvent);
    }
  }

  trackByFn(index: number, item: DragDropItem): string | number {
    return item.id;
  }
}
