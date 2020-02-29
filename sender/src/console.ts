import commander from "commander";
import dotenv from "dotenv";
import { Send } from "../config/Send";

dotenv.config();

commander.version("beta").description("i send stuff to rabbit");
commander
  .command("send")
  .alias("s")
  .description("am the sender")
  .action(() => {
    let sender;
    sender = new Send();
    sender.connect();
  });
commander.parse(process.argv);
