.gps اوامر|import pkg from '@whiskeysockets/baileys';
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

    await conn.sendMessage(m.chat, { react: { text: '📂', key: m.key } });

    // إرسال المقطع الصوتي أولاً
    await conn.sendMessage(m.chat, { 
        audio: { 
            url: 'https://files.catbox.moe/rwgiqt.aac' 
        }, 
        mimetype: 'audio/mpeg', 
        ptt: true 
    }, { quoted: m });

    // تجهيز الصورة والقائمة
    const images = [
        'https://files.catbox.moe/a2qoe3.jpg',
        'https://files.catbox.moe/a2qoe3.jpg',
        'https://files.catbox.moe/a2qoe3.jpg',
        'https://files.catbox.moe/a2qoe3.jpg',
        'https://files.catbox.moe/a2qoe3.jpg', 
        'https://files.catbox.moe/a2qoe3.jpg, 
        'https://files.catbox.moe/a2qoe3.jpg', 
        'https://files.catbox.moe/a2qoe3.jpg', 
        'https://files.catbox.moe/a2qoe3.jpg', 
        'https://files.catbox.moe/a2qoe3.jpg', 
        'https://files.catbox.moe/a2qoe3.jpg', 
        'https://files.catbox.moe/a2qoe3.jpg'
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
> *┤ 🤴🏻 المطور: BLACK*
> *┤ #️⃣ رقم المطور: 201203375667*
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
> *┤ 🪙 *تربو كوينز: ${money}*
> *┤ 🎟️ *الرموز: ${joincount}*
> *┤ 🌟 *الـبـرﯾـمـيـوم: ${user.premiumTime > 0 ? 'مـمـيز✅' : (isPrems ? 'مـمـيز ✅' : 'عـادي ❌') || ''}* 
> *┤────────────···* 
> *✧────[ الـوقـت ]────╮*
> *┤ 📆 التاريخ: ${date}*
> *┤ 📅 اليوم: ${week}*
> *┤ 🚀 وقت النشاط: ${uptime}*
> *┤────────────···*`
                    },
                    footer: {
                        text: '✪┋𝐁𝐘┋❥ 𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓 ┋✪'
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
    title: '｢🍷┇الاوامـر┇🌸｣',
    sections: [
        {
            title: '『』قسم المالك《',
            highlight_label: '｢🌸┇𝐁𝐋𝐀𝐂𝐊_𝐁𝐎𝐓┇🍷｣',
            rows: [
                { header: 'المطور', title: '⌬ ❛╏المطور', description: 'تواصل مع المطور', id: '.المطور', highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓' },
            ]
        },
        {
            title: '『』قسم الادوات《',
            highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓',
            rows: [
                { header: 'التنزيلات', title: '⌬ ❛╏التنزيلات', description: 'جميع التحميلات هنا', id: '.اوامر-التحميل', 
 highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓' },
                { header: 'الذكاء الاصطناعي', title: '⌬ ❛╏قائمة الذكاء الاصطناعي', description: 'قسم الذكاء الاصطناعي', id: '.اوامر-الذكاء', highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓' }
            ]
        },
        {
            title: '『』قسم التحويلات《',
            highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓',
            rows: [
                { header: 'التصميم', title: '⌬ ❛╏اوامر التصميم', description: 'اوامر التصميم والتحويلات', id: '.اوامر-التصميم', highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓' },
  { header: 'الصوتيات', title: '⌬ ❛╏الصوتيات', description: 'قائمة التعديل علي الصوت', id: '.اوامر-الصوت', highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓' }
            ]
        },
        {
            title: '『』قسم الجروبات والاعضاء《',
            highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓',
            rows: [
                { header: 'الرومات', title: '⌬ ❛╏اوامر الرومات', description: 'قسم خاص بالمجموعات', id: '.اوامرالرومات', highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓' },
                { header: 'الالقاب', title: '⌬ ❛╏اوامر الالقاب', description: 'قسم خاص بلالقاب والنقابات', id: '.اوامر-الالقاب', highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓' },
                { header: 'الاعضاء', title: '⌬ ❛╏اوامر الاعضاء', description: 'قسم خاص بالاعضاء', id: '.اوامر-الاعضاء', highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓' }
            ]
        },
        {
            title: '『』القسم الاسلامي《',
            highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓',
            rows: [
                { header: 'الاوامر الدينية', title: '⌬ ❛╏القائمة الدينية', description: 'قسم خاص بالاوامر الاسلامية', id: '.الاوامر-الدينية', highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓' }
            ]
        },
        {
            title: '『』قسم الصور والفيديوهات《',
            highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓',
            rows: [
                { header: 'الانمي والخلفيات والفيديوهات', title: '⌬ ❛╏قائمة الانمي والخلفيات والفيديوهات', description: 'كل قوائم الانمي والخلفيات والفيديوهات', id: '.الانمي2', highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓' }
            ]
        },
        {
            title: '『』قسم المرح والجيمز《',
            highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓',
            rows: [
                { header: 'الالعاب', title: '⌬ ❛╏قائمة الالعاب', description: 'قائمة متنوعة من الالعاب', id: '.اوامرالجيمز', highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓' },
                { header: 'الالعاب 2', title: '⌬ ❛╏قائمة الالعاب 2', description: 'قائمة خاصة بأوامر الفاعليات', id: '.اوامرالالعاب', highlight_label: '𝐁𝐋𝐀𝐂𝐊☞𝐁𝐎𝐓' },
                
            ]
        }
    ]
}),
messageParamsJson: "BLACK bot"
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
        display_text: "『』رقم المطور《",
        url: "https://wa.me/201203375667",
        merchant_url: "https://wa.me/213796769686"
    })
},
{
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
        display_text: "『』قناة البوت《",
        url: "https://whatsapp.com/channel/0029Vb5ieKG1SWsuDdNQgd2D",
        merchant_url: "https://whatsapp.com/channel/0029Vb5ieKG1SWsuDdNQgd2D"
    })
},
{
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
        display_text: "『』موقع المطور《",
        url: "https://linkbio.co/el-BLACK",
        merchant_url: "https://linkbio.co/el-BLACK"
    })
}
                        ]
                    }
                }
            }
        }
    }, {});
}

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['اوامر', 'الاوامر', 'menu', 'المهام'];

export default handler;
``