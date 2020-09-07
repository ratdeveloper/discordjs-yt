const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let pingE = new Discord.MessageEmbed()
        .setTitle("pong!")
        .setDescription(`current ping: ${bot.ws.ping}ms`)
        .setColor("RED")

        message.channel.send(pingE).catch(e => console.error(e))
        message.react('✅').catch(e => console.error(e))
}

module.exports.config = {
    name: 'ping',
    aliases: ['p','pingpong','pong']
}