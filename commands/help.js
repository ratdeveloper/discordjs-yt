const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let helped = new Discord.MessageEmbed()
        .setTitle("Помощь")
        .addField("Текущие комманды:", `🔸!ban @user [reason]\n🔸!kick @user [reason]\n🔸!ping\n🔸!help\n🔸!purge [messages]`)
        .setColor("ORANGE")
    
    message.channel.send(helped)
}

module.exports.config = {
    name: 'help',
    aliases: ['h', 'помощь']
}