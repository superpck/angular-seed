// Modal Configuration Interface
export interface ModalConfig {
  title?: string;
  size?: ModalSize;
  closeable?: boolean;
  closeOnBackdropClick?: boolean;
  data?: unknown;
  content?: string;
  footerContent?: string;
}

// Modal Size Type
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

// Modal State Interface
export interface ModalState {
  show: boolean;
  config?: ModalConfig;
}

// Modal Result Interface
export interface ModalResult {
  action?: string;
  data?: unknown;
  confirmed?: boolean;
  saved?: boolean;
  user?: unknown;
  size?: ModalSize;
  [key: string]: unknown; // เพิ่มความยืดหยุ่นให้สามารถกำหนด property อื่นๆ ได้
}
