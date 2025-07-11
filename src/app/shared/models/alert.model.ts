export type AlertType = 'success' | 'warning' | 'error' | 'info' | 'confirm';

export interface AlertConfig {
  type: AlertType;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export interface AlertState {
  show: boolean;
  config: AlertConfig | null;
}
