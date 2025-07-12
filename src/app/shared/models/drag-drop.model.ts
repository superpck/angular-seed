export interface DragDropItem {
  id: string | number;
  content: string;
  data?: unknown;
  disabled?: boolean;
}

export interface DragDropConfig {
  allowReorder?: boolean;
  showFilter?: boolean;
  filterPlaceholder?: string;
  emptyMessage?: string;
  itemHeight?: string;
  maxHeight?: string;
  connectWith?: string[];  // Array of container IDs to connect with
  containerId?: string;    // Unique ID for this container
}

export interface DragDropChangeEvent {
  items: DragDropItem[];
  movedItem?: DragDropItem;
  fromIndex?: number;
  toIndex?: number;
  fromContainer?: string;  // Source container ID
  toContainer?: string;    // Target container ID
}

export interface DragDropTransferEvent {
  item: DragDropItem;
  fromContainer: string;
  toContainer: string;
  fromIndex: number;
  toIndex: number;
}
