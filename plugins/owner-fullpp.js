import fetch from 'node-fetch';

let handler = async (m, { conn, quoted }) => {
    if (!quoted) throw `*Please reply to an image to set as the profile picture*`;

    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || '';

        if (!/image\/(jpeg|png|webp)/.test(mime)) {
            throw `*The quoted message must be an image.*`;
        }

        let imageBuffer = await q.download?.();
        if (!imageBuffer) throw `*Failed to download the quoted image.*`;

        await conn.updateProfilePicture(conn.user.jid, { url: imageBuffer });
        m.react('✅');
        m.reply(`*Profile picture updated successfully!*`);
    } catch (err) {
        console.error(err);
        m.reply(`*Failed to update the profile picture:*\n${err.message || err}`);
    }
};

handler.help = ['setprofilepic'];
handler.tags = ['owner'];
handler.command = /^(fullpp|updateprofilepic)$/i;
handler.owner = true;

export default handler;
