// Modal Configuration Interface
export interface ModalConfig {
  title?: string;
  size?: ModalSize;
  closeable?: boolean;
  closeOnBackdropClick?: boolean;
  data?: unknown;
}

// Modal Size Type
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

// Modal State Interface
export interface ModalState {
  show: boolean;
  config?: ModalConfig;
}
