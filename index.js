const Discord = require('discord.js');
const bot = new Discord.Client();


  bot.on('message', message => { 
if(message.content.startsWith(prefix + 'sug')) {
      if(!message.channel.guild) return message.reply(`هذا الأمر فقط ل السيرفرات :x:`);
   let args = message.content.split(" ").slice(1);
   var ID = message.author.id 
   var emben = new Discord.RichEmbed()
   .setTimestamp()
   .setTitle(`:x: Error`)
   .setDescription(`الرجاء كتابت إقتراحك بعد الأمر `)
   if(!args.join(" ")) return message.channel.send(emben).then(message => {message.delete(50000)});
   var embet = new Discord.RichEmbed()
   .setTitle(`:white_check_mark: Success!`)
   .setTimestamp()
   .setDescription(`شكراً على اقتراحك !`)
.addField(`إقتراحك : `,args.join(" "))
   var embed = new Discord.RichEmbed()
   .setTimestamp()
   .setColor('RANDOM')
   .setThumbnail(message.author.avatarURL)
   .setFooter(`${message.author.username}#${message.author.discriminator}`)
   .setTitle(`${bot.user.username}`)
   .setURL(`${bot.user.avatarURL}`)
   .setDescription(`**
__المقترح__ :\n <@${ID}>\n
__الإقتراح__ :  \`\`\`${args.join(" ")}\`\`\`**`)
           bot.channels.get("500361564969369601").send(embed)
  message.channel.sendEmbed(embet).then(message => {message.delete(50000)})
            message.react("📩")
}
});

bot.on('message', message => {
    if(message.content.startsWith(prefix + 'new')) {
        let args = message.content.split(' ').slice(1).join(' ');
        let support = message.guild.roles.find("name","Support");
        let ticketsStation = message.guild.channels.find("name", "TICKETS");
        if(!args) {
            return message.channel.send('اكتب موضوع التكت.');
        };
                if(!support) {
                    return message.channel.send('**`Support` تأكد من وجود رتبة**');
                };
            if(!ticketsStation) {
                message.guild.createChannel("TICKETS", "category");
            };
                message.guild.createChannel(`ticket-${message.author.id}`, "text").then(ticket => {
                    message.delete()
                        message.channel.send(`تم انشاء تذكرة. [ ${ticket} ]`);
                    ticket.setParent(ticketsStation);
                    ticketsStation.setPosition(1);
                        ticket.overwritePermissions(message.guild.id, {
                            SEND_MESSAGES: false,
                            READ_MESSAGES: false
                        });
                            ticket.overwritePermissions(support.id, {
                                SEND_MESSAGES: true,
                                READ_MESSAGES: true
                            });
                                ticket.overwritePermissions(message.author.id, {
                                    SEND_MESSAGES: true,
                                    READ_MESSAGES: true
                                });
                    let embed = new Discord.RichEmbed()
                                .setTitle('**The Royal Manager**')
                                .setColor("RANDOM")
                                .setThumbnail(`${message.author.avatarURL}`)
                                .addField('الموضوع', args)
                                .addField('صاحب التكت', message.author)
                                .addField('تم انشاء التكت من روم', `<#${message.channel.id}>`);

                                ticket.sendEmbed(embed);
                }) .catch();
    }
    if(message.content.startsWith(prefix + 'close')) {
            if(!message.member.hasPermission("ADMINISTRATOR")) return;
        if(!message.channel.name.startsWith("ticket")) {
            return;
        };  
                            message.channel.delete();


            
    }
});




bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;
  var args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');
  if (message.author.id !== "324672376455299074") return;

  
  if (message.content.startsWith(prefix + 'setwatch')) {
  bot.user.setActivity(argresult, {type: 'WATCHING'})
     console.log('test' + argresult);
    message.channel.sendMessage(`Watch Now: **${argresult}**`)
} 

 
  if (message.content.startsWith(prefix + 'setlis')) {
  bot.user.setActivity(argresult, {type: 'LISTENING'})
     console.log('test' + argresult);
    message.channel.sendMessage(`LISTENING Now: **${argresult}**`)
} 


if (message.content.startsWith(prefix + 'setname')) {
  bot.user.setUsername(argresult).then
      message.channel.sendMessage(`Username Changed To **${argresult}**`)
  return message.reply("You Can Only Chanage Name 2 Times Per Hour");
} 

if (message.content.startsWith(prefix + 'setavatar')) {
  bot.user.setAvatar(argresult);
   message.channel.sendMessage(`Avatar Changed Successfully To **${argresult}**`);
}

if (message.content.startsWith(prefix + 'setstream')) {
  bot.user.setGame(argresult, "https://www.twitch.tv/peery13");
     console.log('test' + argresult);
    message.channel.sendMessage(`Streaming: **${argresult}**`)
} 
if (message.content.startsWith(prefix + 'setplay')) {
  bot.user.setGame(argresult);
     console.log('test' + argresult);
    message.channel.sendMessage(`Playing: **${argresult}**`)
} 



});
bot.on('message',async message => {
if(message.content === '$unbanall') {
	        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌|**\`ADMINISTRATOR\`لا توجد لديك صلاحية`**');
message.guild.fetchBans().then(ba => {
ba.forEach(ns => {
message.guild.unban(ns);
});
});
}
});


bot.on('message', message => {
    let log = message.guild.channels.find('name', 'alarms');
    let reason = message.content.split(" ").slice(2).join(' ');
    let p = message.mentions.members.first();
    if(message.content.startsWith(prefix + "warn")){
        if (!message.member.roles.find('name','ادارة')) return message.reply('**هذا الأمر مخصص للادارة فقط !**').then(message => message.delete(3000));
        if(!p) return message.reply(`منشن المذنب :slight_smile: `);
        if(reason.length < 1) return message.reply(`اكتب سبب!`)
        var embed = new Discord.RichEmbed()
        .setTitle('**The Royal Warns**')
        .setColor("RANDOM")
        .setThumbnail(`${message.author.avatarURL}`)
        .addField('تحذير لـ', `<@${p.user.id}>`)
        .addField('بواسطة', `<@${message.author.id}>`)
        .addField('السبب', reason)	
        .addField('تم تحذير العضو من روم', `<#${message.channel.id}>`);
            message.channel.send(`**تم تحذير العضو** :white_check_mark: `)
            message.delete();
        log.send({embed})
    }
});

bot.on('message', message => {
    let log = message.guild.channels.find('name', 'alarms');
    let punsh = message.content.split(" ").slice(2).join(' ');
    let p = message.mentions.members.first();
    if(message.content.startsWith(prefix + "punsh")){
        if (!message.member.roles.find('name', 'ادارة')) return message.reply('**هذا الأمر مخصص للادارة فقط !**').then(message => message.delete(3000));
        if(!p) return message.reply(`منشن  المعاقب :slight_smile: `);
        if(punsh.length < 1) return message.reply(`اكتب العقاب!`)    
        var embed = new Discord.RichEmbed()
        .setTitle('**The Royal Punshiments**')
        .setColor("RANDOM")
        .setThumbnail(`${message.author.avatarURL}`)
        .addField('تم معاقبة', `<@${p.user.id}>`)
        .addField('بواسطة', `<@${message.author.id}>`)
        .addField('العقاب', punsh)	
        .addField('تم جمع البيانات من روم', `<#${message.channel.id}>`);
            message.channel.send(`**تم تدوين العقاب** :white_check_mark: `)
            message.delete();
        log.send({embed})
    }
});



const moment = require("moment")
bot.on("guildMemberAdd", m => {
        let room = m.guild.channels.find(a => a.name === 'log'); //
    if (datediff(parseDate(moment(m.user.createdTimestamp).format('l')), parseDate(moment().format('l'))) < 2) {
        m.ban() .then((
            room.send(`**:no_entry: | ${m} Has been banned for: \`fake\`**`)
        ));
    };
    function parseDate(str) {
        var mdy = str.split('/');
        return new Date(mdy[2], mdy[0]-1, mdy[1]);
    };
    
    function datediff(first, second) {
        return Math.round((second-first)/(1000*60*60*24));
    };
});


bot.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);
  
 

if (command == "e") {
    let say = new Discord.RichEmbed()
    .setDescription(args.join("  "))
    .setColor("RANDOM")
    message.channel.sendEmbed(say);
    message.delete();
  }


});

client.login("NTEwNzQ2MDI1NjI0MDc2Mjg5.DshfuA.9EZLqV7NZd9eFeAKeF3jyxXFhw0")
	
const prefix = '$';
