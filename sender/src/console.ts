import commander from "commander";
import dotenv from "dotenv";

dotenv.config();

commander.version("beta").description("i send stuff to rabbit");
commander
  .command("send")
  .alias("s")
  .description("am the sender")
  .action(() => {
    console.log("have send it");
  });
commander.parse(process.argv);
