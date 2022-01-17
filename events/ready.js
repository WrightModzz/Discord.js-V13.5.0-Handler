const client = require("../index.js");
console.clear();

client.on("ready", () => {
    console.log("==================")
    console.log(`${client.user.tag}`)
    console.log("BOT ONLINE SUCESSFULLY")
    console.log("==================\n")
});