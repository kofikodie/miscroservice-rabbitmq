export interface SendConfigInterface {
    publisher(message?: string): Promise<void>;
}
