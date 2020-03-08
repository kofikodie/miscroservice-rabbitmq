import commander from "commander";
import { Receive } from "./config/Receive";

commander.version("beta").description("i receive stuff");
commander
  .command("receive")
  .alias("r")
  .description("am the receiver")
  .action(() => {
    new Receive().receiver().then(r => console.log("closing connection"));
  });
commander.parse(process.argv);
