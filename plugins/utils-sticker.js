import fs from 'fs';

let handler = async (m, { conn }) => {
  const quoted = m.quoted || m;
  const mime = (quoted.msg || quoted).mimetype || '';

  const user = global.db.data.users[m.sender];
  const name = user.name;

  if (/image/.test(mime)) {
    const media = await quoted.download();
    const stickerPath = conn.sendFile(m.chat, media, 'sticker.webp', '', m)
    await fs.unlinkSync(stickerPath);
  } else if (/video/.test(mime)) {
    if ((quoted.msg || quoted).seconds > 20) {
      return m.reply('🫗 El video no puede ser muy largo. Máximo 20 segundos.');
    }
    const media = await quoted.download();
    const stickerPath = conn.sendFile(m.chat, media, 'sticker.webp', '', m)
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