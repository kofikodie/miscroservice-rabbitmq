export interface RabbitInterface {
    publisher?(message: string): Promise<void>;
    consumer?(): Promise<void>;
}
