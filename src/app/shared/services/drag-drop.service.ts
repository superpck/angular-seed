import { Injectable } from '@angular/core';
import { DragDropItem, DragDropTransferEvent } from '../models/drag-drop.model';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  
  /**
   * ย้ายไอเทมจากตำแหน่งหนึ่งไปอีกตำแหน่งหนึ่ง
   */
  moveItem(items: DragDropItem[], fromIndex: number, toIndex: number): DragDropItem[] {
    const result = [...items];
    const [removed] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, removed);
    return result;
  }

  /**
   * ย้ายไอเทมจากรายการหนึ่งไปยังอีกรายการหนึ่ง
   */
  transferItem(
    sourceItems: DragDropItem[], 
    targetItems: DragDropItem[], 
    fromIndex: number, 
    toIndex: number
  ): { source: DragDropItem[], target: DragDropItem[] } {
    const source = [...sourceItems];
    const target = [...targetItems];
    const [removed] = source.splice(fromIndex, 1);
    target.splice(toIndex, 0, removed);
    
    return { source, target };
  }

  /**
   * จัดการการถ่ายโอนระหว่างคอนเทนเนอร์
   */
  handleTransfer(
    containers: { [key: string]: DragDropItem[] },
    transferEvent: DragDropTransferEvent
  ): { [key: string]: DragDropItem[] } {
    const result = { ...containers };
    const sourceItems = result[transferEvent.fromContainer] || [];
    const targetItems = result[transferEvent.toContainer] || [];
    
    const { source, target } = this.transferItem(
      sourceItems,
      targetItems,
      transferEvent.fromIndex,
      transferEvent.toIndex
    );
    
    result[transferEvent.fromContainer] = source;
    result[transferEvent.toContainer] = target;
    
    return result;
  }

  /**
   * กรองรายการตามข้อความค้นหา
   */
  filterItems(items: DragDropItem[], searchText: string): DragDropItem[] {
    if (!searchText.trim()) {
      return items;
    }
    
    const lowerSearchText = searchText.toLowerCase().trim();
    return items.filter(item => 
      item.content.toLowerCase().includes(lowerSearchText) ||
      (item.id && item.id.toString().toLowerCase().includes(lowerSearchText))
    );
  }

  /**
   * สร้างรายการใหม่จากข้อมูลพื้นฐาน
   */
  createItems(data: string[] | { id: string | number; content: string; data?: unknown }[]): DragDropItem[] {
    return data.map((item, index) => {
      if (typeof item === 'string') {
        return {
          id: index + 1,
          content: item
        };
      }
      return {
        id: item.id,
        content: item.content,
        data: item.data
      };
    });
  }

  /**
   * ตรวจสอบว่าไอเทมสามารถย้ายได้หรือไม่
   */
  canMoveItem(item: DragDropItem): boolean {
    return !item.disabled;
  }
}
