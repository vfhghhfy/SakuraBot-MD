import fs from 'fs';
import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn }) => {
  const quoted = m.quoted || m;
  const mime = (quoted.msg || quoted).mimetype || '';

  const user = global.db.data.users[m.sender];
  const name = user.name;
  const text1 = `S'ᴛᴇʟʟᴀʀ 🧠 WᴀBᴏᴛ`;
  const text2 = `@${name}`;
  let stiker = false;
  let out = false;

  if (/image/.test(mime)) {
    const media = await quoted.download();
      if (/webp/g.test(mime)) out = await webp2png(media)
     else if (/image/g.test(mime)) out = await uploadImage(media)
     else if (/video/g.test(mime)) out = await uploadFile(media)
    if (typeof out !== 'string') out = await uploadImage(media)
    stiker = await sticker(media, out, text1, text2)
    const stickerPath = conn.sendFile(m.chat, sticker, 'sticker.webp', '', m)
    await fs.unlinkSync(stickerPath);
  } else if (/video/.test(mime)) {
    if ((quoted.msg || quoted).seconds > 20) {
      return m.reply('🫗 El video no puede ser muy largo. Máximo 20 segundos.');
    }
    const media = await quoted.download();
      if (/webp/g.test(mime)) out = await webp2png(media)
     else if (/image/g.test(mime)) out = await uploadImage(media)
     else if (/video/g.test(mime)) out = await uploadFile(media)
    if (typeof out !== 'string') out = await uploadImage(media)
    stiker = await sticker(media, out, text1, text2)
    const stickerPath = conn.sendFile(m.chat, sticker, 'sticker.webp', '', m)
    await new Promise(resolve => setTimeout(resolve, 2000));
    await fs.unlinkSync(stickerPath);
  } else {
    return conn.reply(
      m.chat,
      '🌾 Debes responder a una *Imagen, Video, Sticker o Webm* para convertirlo en sticker.',
      m
    );
  }
};

handler.help = ['sticker', 's'];
handler.tags = ['utils'];
handler.command = ['sticker', 's'];

export default handler;