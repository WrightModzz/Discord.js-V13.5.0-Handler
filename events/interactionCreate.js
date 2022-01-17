const client = require("../index.js");
const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const { owners } = require("../Configs/config.json");
const embedsettings = require("../Configs/embeds.json");

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id
        );

    /// owner only handler
      if (cmd) {
      if (cmd.ownerOnly) {
      if (!owners.includes(interaction.user.id)) {
      let ownerOnly = new MessageEmbed()
        .setTitle("__**Owner Only**__")
        .setAuthor({ name: embedsettings.guildName, iconURL: embedsettings.iconURL })
        .setThumbnail(embedsettings.iconURL)
        .setColor(embedsettings.coloruwant)
        .setImage(embedsettings.image)
        .setDescription("Only Bot Developer can use this command!")
        .setTimestamp()
        return interaction.followUp({embeds : [ownerOnly] })
     }}
    }
      
     // userPermission Handler
        if(!interaction.member.permissions.has(cmd.userPermissions || [])) 
        return interaction.followUp({ 
          embeds: [
            new MessageEmbed()
            .setTitle("__**MISSING PERMISSIONS**__")
            .setAuthor({ name: embedsettings.guildName, iconURL: embedsettings.iconURL })
            .setThumbnail(embedsettings.iconURL)
            .setColor(embedsettings.color)
            .setImage(embedsettings.image)
            .setDescription(`You do not have **${cmd.userPermissions}** to run this command`)
            .setTimestamp()
          ]
        });

        cmd.run(client, interaction, args);
    }

    //////////////////////////////////////////
    /////////////CONTEXT MENU COMMAND HANDLER//////////////
    //////////////////////////////////////////
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});
