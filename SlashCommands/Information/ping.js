const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require("../../Configs/config.json");
const embedsettings = require("../../Configs/embeds.json");

module.exports = {
    name: 'ping',
    description: 'Return Bot Latencies',
    run: async (client, interaction, args, prefix, guild, color, channel) => {
        let circles = {
            green: "🟢",
            yellow: "🟡",
            red: "🔴"
        }
        let days = Math.floor(client.uptime / 86400000)
        let hours = Math.floor(client.uptime / 3600000) % 24
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60

        let botLatency = new Date() - interaction.createdAt
        let apiLatency = client.ws.ping;

        const pingEmbed = new MessageEmbed()
            .setColor(embedsettings.coloruwant)
            
            .addField("Bot Latency",
                `${botLatency <= 200 ? circles.green : botLatency <= 400 ? circles.yellow : circles.red} ${botLatency}ms`
                , true
            )
            .addField("API Latency",
                `${apiLatency <= 200 ? circles.yellow : apiLatency <= 400 ? circles.yellow : circles.red} ${apiLatency}ms`
                , true
            )
            .addField("Client Uptime",
                `${days}d ${hours}h ${minutes}m ${seconds}s`
                , true
            )
            .setImage(embedsettings.image)
            .setTimestamp()
        return interaction.followUp({ embeds: [pingEmbed], allowedMentions: { repliedUser: false } })
    },
}
