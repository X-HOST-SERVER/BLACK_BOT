import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor((ms % 3600000) / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

const handler = async (m, { conn, usedPrefix, __dirname, text, isPrems }) => {
    let d = new Date();
    d.setTime(d.getTime() + 3600000); // تعديل وقت الساعة بإضافة ساعة
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let user = global.db.data.users[m.sender] || {};
    let name = conn.getName(m.sender) || 'مستخدم';
    let { money = 0, joincount = 0, diamond = 0 } = user;
    let { exp = 0, limit = 0, level = 0, role = 'مستخدم' } = user;
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered === true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];

    await conn.sendMessage(m.chat, { react: { text: '🐉', key: m.key } });

    // إرسال المقطع الصوتي أولاً
    await conn.sendMessage(m.chat, { 
        audio: { 
            url: '' 
        }, 
        mimetype: 'audio/mpeg', 
        ptt: true 
    }, { quoted: m });

    // تجهيز الصورة والقائمة
    const images = [
        'https://files.catbox.moe/a2qoe3.jpg', 
        'https://files.catbox.moe/a2qoe3.jpg
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

    var messa = await prepareWAMessageMedia({ image: { url: randomImage } }, { upload: conn.waUploadToServer });

    // إرسال القائمة
    conn.relayMessage(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: {
                        text: `> ╮━━━━━━━━━━━━━━╭
        ┃    【 𝑾𝑬𝑳𝑪𝑶𝑴𝑬 】    ┃
> ╯━━━━━━━━━━━━━━╰
> *┤ *مرحبا يا ${name}*
> *┤ 🤴🏻 المطور: 𝐁𝐋𝐀𝐂𝐊*
> *┤ #️⃣ ارقام المطور: https://wa.me/201203375667*
> *┤ ✅ الاصدار: 1.2.0*
> *┤ 🎳 البادئة: •*
> *┤ 🧜🏽‍♂️ المستخدمين: ${rtotalreg}*  
> *┤────────────···* 
> *✧────[الـﻤـسـتـخـدم]────╮*
> *┤ 🎩 *الاسـم: ${name}*
> *┤ 🔃 المستوي: ${level}*
> *┤ 🏆 *الـرتبة: ${role}*
> *┤ 🎮 *الخبـرة: ${exp}* 
> *┤ 💎 *الألـماس: ${diamond}*
> *┤ 🎟️ *الرموز: 32*
> *┤ 🌟 *الـبـرﯾـمـيـوم: ${user.premiumTime > 0 ? 'مـمـيز✅' : (isPrems ? 'مـمـيز ✅' : 'عـادي ❌') || ''}* 
> *┤────────────···* 
> *✧────[ الـوقـت ]────╮*
> *┤ 📆 التاريخ: ${date}*
> *┤ 📅 اليوم: ${week}*
> *┤ 🚀 وقت النشاط: ${uptime}*
> *┤────────────···*`
                    },
                    footer: {
                        text: '✪┋𝐁𝐋𝐀𝐂𝐊-𝐁𝐎𝐓┋✪'
                    },
                    header: {
                        title: '',
                        hasMediaAttachment: true,
                        imageMessage: messa.imageMessage,
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: 'single_select',
buttonParamsJson: JSON.stringify({
    title: '『』اوامر البوت《',
    sections: [
        {
            title: '『』بلاك-بوت《',
            highlight_label: '✪┋𝐁𝐋𝐀𝐂𝐊-𝐁𝐎𝐓┋✪',
            rows: [
                                        {

                                            title: '𝑩𝑳𝑨𝑪𝑲 Bₒₜ',
                                            description: 'قسم لاعضاء'                id: '.ق1'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '2',
                                    rows: [
                                        {

                                            title: '𝑩𝑳𝑨𝑪𝑲 Bₒₜ',
                                            description: 'قسم دين',
                                            id: '.ق2'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '3',
                                    rows: [
                                        {

                                            title: '𝑩𝑳𝑨𝑪𝑲 Bₒₜ',
                                            description: 'قسم المطور',
                                            id: '.ق3'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '4',
                                    rows: [
                                        {

                                            title: '𝑩𝑳𝑨𝑪𝑲 Bₒₜ',
                                            description: 'قسم تحميل',
                                            id: '.ق4'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '5',
                                    rows: [
                                        {

                                            title: '𝑩𝑳𝑨𝑪𝑲 Bₒₜ',
                                            description: 'قسم الالعاب',
                                            id: '.ق5'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '6',
                                    rows: [
                                        {

                                            title: '𝑩𝑳𝑨𝑪𝑲 Bₒₜ',
                                            description: 'قسم تحويلات',
                                            id: '.ق6'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '7',
                                    rows: [
                                        {

                                            title: '𝑩𝑳𝑨𝑪𝑲 Bₒₜ',
                                            description: 'قسم ذكاء',
                                            id: '.ق7'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '8',
                                    rows: [
                                        {

                                            title: '𝑩𝑳𝑨𝑪𝑲 Bₒₜ',
                                            description: 'قسم دعم',
                                            id: '.ق8'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '9',
                                    rows: [
                                        {

                                            title: '𝑩𝑳𝑨𝑪𝑲 Bₒₜ',
                                            description: 'قسم اديت',
                                            id: '.ق9'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '10',
                                    rows: [
                                        {

                                            title: '𝑩𝑳𝑨𝑪𝑲 Bₒₜ',
                                            description: 'قسم المشرفين',
                                            id: '.ق10'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '11',
                                    rows: [
                                        {

                                            title: '𝑩𝑳𝑨𝑪𝑲 Bₒₜ',
                                            description: 'قسم البحث',
                                            id: '.ق11'
                                        }
                                    ]
                                },
                                {
                                highlight_label: '12',
                                    rows: [
                                        {

                                            title: '𝑩𝑳𝑨𝑪𝑲 Bₒₜ',
                                            description: 'قسم صور',
                                            id: '.ق12'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '13',
                                    rows: [
                                        {

                                            title: '𝑩𝑳𝑨𝑪𝑲 Bₒₜ',
                                            description: 'قسم الالقاب',
                                            id: '.ق13'
                                        }
                                    ]
                                }
                            ]
})
},
messageParamsJson: ''
                            },
                            {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
        display_text: "『』رقم بلاك《",
        url: "https://wa.me/213796769686",
        merchant_url: "https://wa.me/213796769686"
    })
},
{
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
        display_text: "『』رقم بلاك《",
        url: "https://wa.me/201203375667",
        merchant_url: "https://wa.me/201203375667"
    })
},
{
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
        display_text: "『』جروب البوت《",
        id: ".دعم"
    })
},
{
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
        display_text: "『』قيم البوت《",
        id: ".تقييم"
    })
},
{
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
        display_text: "『』قنات-البوت《",
        url: "https://whatsapp.com/channel/0029Vb5ieKG1SWsuDdNQgd2D",
        merchant_url: "https://whatsapp.com/channel/0029Vb5ieKG1SWsuDdNQgd2D"
    })
}
                        ]
                    }
                }
            }
        }
    }, {});
}

handler.help = ['خ'];
handler.tags = ['خ'];
handler.command = ['خ'];

export default handler;
``