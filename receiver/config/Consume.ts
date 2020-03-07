import { ConsumerInterface } from "./ConsumerInterface";
export class Consume implements ConsumerInterface {
  consumer(): string {
    return "free melly";
  }
}
