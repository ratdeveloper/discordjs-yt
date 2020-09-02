const Discord = require('discord.js')
const fs = require('fs')
const bot = new Discord.Client()
const cfg = require('./cfg.json')
bot.config = cfg
bot.prefix = cfg.prefix

bot.on('message', async message => {
    if(message.channel.type === 'dm' || message.author.bot || !message.content.startsWith(bot.prefix))return
    if(message.content.startsWith(`${bot.prefix}ping`)){
        let pingE = new Discord.MessageEmbed()
        .setTitle("pong!")
        .setDescription(`current ping: ${bot.ws.ping}ms`)
        .setColor("RED")

        message.channel.send(pingE).catch(e => console.error(e))
        message.react('✅').catch(e => console.error(e))
    }
})

bot.on('ready', () => {
    console.log(`Bot ${bot.user.tag} logged in. Servers: ${bot.guilds.cache.size}, Users: ${bot.users.cache.size - 1}`)
})

bot.login(bot.config.token)