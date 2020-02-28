import { SendConfigInterface } from "./SendConfigInterface";

class SendConfig implements SendConfigInterface {
  close(): Promise<void> {
    return undefined;
  }

  connect(): Promise<void> {
    return undefined;
  }
}
