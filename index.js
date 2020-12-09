const Discord = require('discord.js');
const { config } = require('dotenv');
const client = new Discord.Client();
config({ path: __dirname + '/.env' });
client.login(process.env.token);

function etiket(message, args, öz) {
    let kişi = message.mentions.members.first();
    if (!kişi) kişi = message.guild.members.cache.get(args[0]);
    if (!kişi) {
        if (öz) kişi = message.member;
        if (!öz) return message.channel.send('Bir kişiyi etiketlemelisin veya id girmelisin');
    };
    return kişi;
};

client.on('ready', () => { console.log(`${client.user.username} HAZIR!`) });
client.on('message', async (message) => {
    if (!message.content.startsWith(process.env.prefix)) return;
    if (message.author.bot) return;
    let cmd = message.content.slice(process.env.prefix.length).split(' ')[0]; // Komutumuz
    let args = message.content.split(' ').slice(1); // Argümanlar
    if (cmd === 'pinle') return message.pin();
    if (cmd === 'sil') {
        if (isNaN(args[0])) return message.channel.send('Bir sayı girmelisin!');
        const mesajlar = await message.channel.messages.fetch({limit: args[0] + 1});
        message.channel.bulkDelete(mesajlar);
        return;
    };
    if (cmd === 'nick') {
        const nick = args.slice(1).join(' ');
        const etiket = message.mentions.members.first();
        etiket.setNickname(nick);
        return;
    };
    if (cmd === 'isim') {
        const kişi = etiket(message, args, false);
        const nicktasağı = args.slice(1).join(' ');
        if (!nicktasağı) return message.channel.send('Bir isim girmelisin!');
        const yaş = nicktasağı.split(' ')[nicktasağı.split(' ').length - 1];
        if(isNaN(yaş)) return message.channel.send('Geçerli bir yaş girmelisin!');
        const nick = nicktasağı.replace(yaş, `| ${yaş}`);
        let isim = '';
        nick.split(' ').forEach(element => { isim = isim + element[0].toUpperCase() + element.slice(1) + ' '});
        kişi.setNickname(isim);

    }

});