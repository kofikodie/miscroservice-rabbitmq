import commander from "commander";

commander.version("beta").description("i receive stuff");
commander.command("receive")
    .alias("r")
    .description("am the receiver")
    .action(() => {
        console.log("i have receive it")
    });
commander.parse(process.argv);