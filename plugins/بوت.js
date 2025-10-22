import { prepareWAMessageMedia, generateWAMessageFromContent } from "@whiskeysockets/baileys";

const handler = async (m, { conn }) => {
    const imageUrl = "https://files.catbox.moe/a2qoe3.jpg"; // رابط الصورة المصغرة
    const link1 = "https://wa.me/201203375667"; // الرابط الأول (اتصال مع المطور)
    const link2 = "https://whatsapp.com/channel/0029VaumDtWJZg4B8jLyMK2q"; // الرابط الثاني (القناة)

    // تجهيز الصورة المصغرة
    const media = await prepareWAMessageMedia(
        { image: { url: imageUrl } },
        { upload: conn.waUploadToServer }
    );

    // إنشاء الرسالة التفاعلية
    const interactiveMessage = {
        body: { text: "مـرحـبـا اسـمـي بلاك  مـطـوري شـيـطـان الاذاعـه اسـتـخـدم امـر (.اوامـر) لطلب القائمة" },
        footer: { text: "𝐁𝐋𝐀𝐂𝐊_𝐁𝐎𝐓" },
        header: { 
            title: "❪🌸┇𝐁𝐋𝐀𝐂𝐊_𝐁𝐎𝐓┇🍷❫", 
            hasMediaAttachment: true, 
            imageMessage: media.imageMessage 
        },
        nativeFlowMessage: {
            buttons: [
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "｢🍷┊لـلـمـطـور┊🍷｣",
                        url: link1
                    })
                },
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "｢🍷┊القناة┊🍷｣",
                        url: link2
                    })
                },
                {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: "⌈🚀╎اوامر╎🚀⌋",
                        id: ".اوامر"
                    })
                }
            ]
        }
    };

    // إرسال الرسالة
    let msg = generateWAMessageFromContent(
        m.chat,
        { viewOnceMessage: { message: { interactiveMessage } } },
        { userJid: conn.user.jid, quoted: m }
    );

    conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.command = /^بوت$/i; // تشغيل الكود عند كتابة ".بوت"

export default handler;