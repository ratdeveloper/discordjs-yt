const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

    let admin = message.member
    let admin_tag = message.author.tag
    let member = message.mentions.members.first()
    let reason = args.slice(1).join(' ')

    if (!admin) return

    if (!message.member.permissions.has("BAN_MEMBERS")) {
        let noRights = new Discord.MessageEmbed()
            .setTitle('Недостаточно прав')
            .setDescription('Недостаточно прав для выполнения !ban')
            .setColor("RED")

        message.channel.send(noRights)
        return
    }

    if (!member || !reason) {
        let errorNoArgs = new Discord.MessageEmbed()
            .setTitle('Недостаточно аргументов')
            .setDescription('🔸!ban @user [reason here]')
            .setColor('RED')

        message.channel.send(errorNoArgs)
        return
    }

    await member.ban({ days: 7, reason: `[${admin_tag}] ${reason}` }).catch(e => {
        let no = new Discord.MessageEmbed()
            .setTitle("ERROR")
            .setDescription("При бане произошла ошибка, попробуйте позднее")
            .setColor("RED")

        message.channel.send(no)
        console.error(`[BAN ERROR]: ${e}`)
        return
    })
    let banned = new Discord.MessageEmbed()
        .setTitle("Забанен.")
        .addFields(
            {
                name: "Участник",
                value: `${member}`,
                inline: true
            },
            {
                name: "Администратор",
                value: `${admin} [${admin_tag}]`,
                inline: true
            },
            {
                name: "Причина",
                value: `${reason}`,
                inline: true
            }
        )
        .setColor("RED")

    message.channel.send(banned)


}

// [fz#7777] Спам в ЛС

module.exports.config = {
    name: 'ban',
    aliases: ['b', 'бан']
}