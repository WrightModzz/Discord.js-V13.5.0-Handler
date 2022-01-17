const { Client, Collection } = require('discord.js');
const config = require(`./Configs/config.json`); 
const client = new Client({
    intents: 32767,
});

module.exports = client;

client.slashCommands = new Collection();

require("./handler")(client);

//If you want to use enviroment variables you can add your code instead of config.token
client.login(config.token);