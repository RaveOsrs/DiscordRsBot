const client = require("..");
const { MessageEmbed } = require("discord.js");

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    message.channel.send("hi");
})