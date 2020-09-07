const Discord = require('discord.js')
const fs = require('fs')
const bot = new Discord.Client()
const cfg = require('./cfg.json')
bot.config = cfg
bot.prefix = cfg.prefix
bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

fs.readdir('./commands/', (err, files) => {
    if(err)console.error(err)
    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if(jsfile.length <= 0)return(console.error('[DISCORD] No commands found'))
    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`)
        bot.commands.set(pull.config.name, pull)
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        })
    })
})

/*bot.on('message', async message => {
    if(message.channel.type === 'dm' || message.author.bot || !message.content.startsWith(bot.prefix))return
    if(message.content.startsWith(`${bot.prefix}ping`)){
        let pingE = new Discord.MessageEmbed()
        .setTitle("pong!")
        .setDescription(`current ping: ${bot.ws.ping}ms`)
        .setColor("RED")

        message.channel.send(pingE).catch(e => console.error(e))
        message.react('✅').catch(e => console.error(e))
    }
})*/

bot.on('message', async message => {
    if(message.channel.type === 'dm' || message.author.bot || !message.content.startsWith(bot.prefix))return
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0]
    let args =messageArray.slice(1)
    let commandfile = bot.commands.get(cmd.slice(bot.prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(bot.prefix.length)))
    if(commandfile){
        commandfile.run(bot,message,args)
    }
})

bot.on('ready', () => {
    console.log(`Bot ${bot.user.tag} logged in. Servers: ${bot.guilds.cache.size}, Users: ${bot.users.cache.size - 1}`)
})

bot.login(bot.config.token)