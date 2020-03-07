import commander from "commander";
import dotenv from "dotenv";
import { Send } from "./config/Send";
import { SendConfigInterface } from "./config/SendConfigInterface";

dotenv.config();

commander.version("beta").description("i send stuff to rabbit");
commander
  .command("send")
  .alias("s")
  .arguments("<message>")
  .description("am the sender")
  .action((message: string) => {
    let sender: SendConfigInterface;
    sender = new Send();
    sender.publisher(message);
  });
commander.parse(process.argv);
