/*import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import { createCanvas, loadImage, registerFont } from 'canvas';

registerFont('./src/lib/BadSignal.otf', { family: 'BadSignal' })
async function generarImagen(nombre, imagenPerfilURL, fondoURL) {
  const fondo = await loadImage(fondoURL)
  const width = fondo.width
  const height = fondo.height
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  ctx.drawImage(fondo, 0, 0, width, height)

  const perfil = await loadImage(imagenPerfilURL)
  const radius = Math.floor(Math.min(width, height) / 2)
  const x = width / 2 - radius / 2
  const y = height / 2 - radius / 2

  ctx.save()
  ctx.beginPath()
  ctx.arc(x + radius / 2, y + radius / 2, radius / 2, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()
  ctx.drawImage(perfil, x, y, radius, radius)
  ctx.restore()

const texto = nombre
const fontSize = Math.floor(radius / 5)
ctx.font = `${fontSize}px BadSignal`
ctx.textAlign = 'center'
ctx.fillStyle = 'red'
ctx.fillText(texto, width / 2 + 2, y + radius + 40 - 2)
ctx.fillStyle = 'blue'
ctx.fillText(texto, width / 2 - 2, y + radius + 40 + 2)
ctx.fillStyle = '#FFFFFF'
ctx.fillText(texto, width / 2, y + radius + 40)

  return canvas.toBuffer()
}

async function loadImageToBuffer(url) {
  const res = await fetch(url)
  const arrayBuffer = await res.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return true;

    const chat = globalThis.db.data.chats[m.chat];
    const nombre = globalThis.db.data.users[m.messageStubParameters[0]] ? globalThis.db.data.users[m.messageStubParameters[0]].name : null || {};
    const botId = conn.user.jid;

    const ppUrl = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(() => "https://stellarwa.xyz/files/1752115005119.jpg");

      const fondoURL = m.messageStubType === 27 ? "https://stellarwa.xyz/files/1752109547459.jpg" : "https://stellarwa.xyz/files/1752109574508.jpg"

      const name = nombre || conn.getName(m.messageStubParameters[0])
      const img = await generarImagen(name, ppUrl, fondoURL)

    const actionUser = m.key.participant ? await conn.getName(m.key.participant) : null;

    const actionMessages = {
        [WAMessageStubType.GROUP_PARTICIPANT_ADD]: actionUser ? `\n┊➤ *Agregado por ›* @${m.key.participant.split`@`[0]}` : '',
        [WAMessageStubType.GROUP_PARTICIPANT_REMOVE]: actionUser ? `\n┊➤ *Eliminado por ›* @${m.key.participant.split`@`[0]}` : '',
        [WAMessageStubType.GROUP_PARTICIPANT_LEAVE]: ''
    };

    const userss = m.messageStubParameters[0];
    const formatText = (template, memberCount) => {
        return template
            .replace('@user', `@${userss.split`@`[0]}`)
            .replace('@group', groupMetadata.subject)
            .replace('@date', new Date().toLocaleString())
            .replace('@users', `${memberCount}`)
            .replace('@type', actionMessages[m.messageStubType])
            .replace('@desc', groupMetadata.desc?.toString() || '✿ Sin Desc ✿');
    };

    let memberCount = participants.length;

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
        memberCount += 1;
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
        memberCount -= 1;
    }

    const welcomeMessage = formatText(chat.sWelcome || `╭┈──̇─̇─̇────̇─̇─̇──◯◝\n┊「 *Bienvenido (⁠ ⁠ꈍ⁠ᴗ⁠ꈍ⁠)* 」\n┊︶︶︶︶︶︶︶︶︶︶︶\n┊  *Nombre ›* @user\n┊  *Grupo ›* @group\n┊┈─────̇─̇─̇─────◯◝ @type\n┊➤ *Usa /menu para ver los comandos.*\n┊➤ *Ahora somos @users miembros.*\n┊ ︿︿︿︿︿︿︿︿︿︿︿\n╰─────────────────╯`, memberCount);

    const byeMessage = formatText(chat.sBye || `╭┈──̇─̇─̇────̇─̇─̇──◯◝\n┊「 *Hasta pronto (⁠╥⁠﹏⁠╥⁠)* 」\n┊︶︶︶︶︶︶︶︶︶︶︶\n┊  *Nombre ›* @user\n┊┈─────̇─̇─̇─────◯◝ @type\n┊➤ *Ojalá que vuelva pronto.*\n┊➤ *Ahora somos @users miembros.*\n┊ ︿︿︿︿︿︿︿︿︿︿︿\n╰─────────────────╯`, memberCount);

    const leaveMessage = formatText(chat.sBye || `╭┈──̇─̇─̇────̇─̇─̇──◯◝\n┊「 *Hasta pronto (⁠╥⁠﹏⁠╥⁠)* 」\n┊︶︶︶︶︶︶︶︶︶︶︶\n┊  *Nombre ›* @user\n┊┈─────̇─̇─̇─────◯◝\n┊➤ *Ojalá que vuelva pronto.*\n┊➤ *Ahora somos @users miembros.*\n┊ ︿︿︿︿︿︿︿︿︿︿︿\n╰─────────────────╯`, memberCount);

    const mentions = [userss, m.key.participant]

    let fakeContext = {
        contextInfo: {
                isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363420992828502@newsletter",
                serverMessageId: '',
                newsletterName: "₊· ͟͟͞͞꒰✩ 𝐒𝐭𝐞𝐥𝐥𝐚𝐫 𝐖𝐚𝐁𝐨𝐭 - 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ⏤͟͟͞͞✿"
            },
            externalAdReply: {
                title: namebot,
                body: dev,
                mediaUrl: null,
                description: null,
                previewType: "PHOTO",
                thumbnailUrl: icon,
                sourceUrl: redes,
                mediaType: 1,
                renderLargerThumbnail: false
            },
            mentionedJid: mentions
        }
    };

        if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
            await conn.sendMessage(m.chat, { image: img, caption: welcomeMessage, ...fakeContext });
        }

        if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
            await conn.sendMessage(m.chat, { image: img, caption: byeMessage, ...fakeContext });
        }

        if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
           await conn.sendMessage(m.chat, { image: img, caption: leaveMessage, ...fakeContext });
        }
}*/