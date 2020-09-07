const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let admin = message.member
    let messages = args[0]

    if (!admin.permissions.has("MANAGE_MESSAGES")) {
        let noRights = new Discord.MessageEmbed()
            .setTitle('Недостаточно прав')
            .setDescription('Недостаточно прав для выполнения !purge')
            .setColor("RED")

        message.channel.send(noRights)
        return
    }

    if (messages <= 0 || messages >= 100 || isNaN(messages)) {
        let no = new Discord.MessageEmbed()
            .setTitle('Упс!')
            .setDescription('Аргумент 1 должен быть числом не меньше 0 и не больше 100')
            .setColor("RED")
        
        message.channel.send(no)
        return
    }

    await message.channel.bulkDelete(messages)
    message.channel.send(`✅ Администратор: ${admin} очистил ${messages} сообщений в канале ${message.channel} ✅`).then(m => {
        m.react('✅')
    })

}

module.exports.config = {
    name: 'purge',
    aliases: ['clear']
}