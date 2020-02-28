export interface SendConfigInterface {
  connect(): Promise<void>;

  close(): Promise<void>;
}
