const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    
    let admin = message.member
    let admin_tag = message.author.tag 
    let member = message.mentions.members.first()
    let reason = args.slice(1).join(' ')

    if (!admin) return

    if (!admin.permissions.has("KICK_MEMBERS")) {
        let noRights = new Discord.MessageEmbed()
            .setTitle('Недостаточно прав')
            .setDescription('Недостаточно прав для выполнения !kick')
            .setColor("RED")
        
        message.channel.send(noRights)
        return
    }
    
    if (!member || !reason) {
        let errorNoArgs = new Discord.MessageEmbed()
            .setTitle('Недостаточно аргументов')
            .setDescription('🔸!kick @user [reason here]')
            .setColor('RED')
        
        message.channel.send(errorNoArgs)
        return
    }

    await member.kick(`[${admin_tag}] ${reason}`).catch(e => {
        let no = new Discord.MessageEmbed()
            .setTitle("ERROR")
            .setDescription("При кике произошла ошибка, попробуйте позднее")
            .setColor("RED")
        
        message.channel.send(no)
        console.error(`[KICK ERROR]: ${e}`)
        return
    })
    let banned = new Discord.MessageEmbed()
        .setTitle("Кикнут")
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
        .setColor("YELLOW")
    
    message.channel.send(banned)


}

// [fz#7777] Спам в ЛС

module.exports.config = {
    name: 'kick',
    aliases: ['k','кик']
}