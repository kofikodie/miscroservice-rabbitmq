import commander from "commander";
import {Consume} from "./config/Consume"

commander.version("beta").description("i receive stuff");
commander
  .command("receive")
  .alias("r")
  .description("am the receiver")
  .action(() => {
    let consume = new Consume();
    let message: string;
    message = consume.consumer();
    console.log(message)
  });
commander.parse(process.argv);
