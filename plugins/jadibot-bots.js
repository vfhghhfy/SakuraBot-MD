import ws from 'ws'

async function handler(m, { conn: stars, usedPrefix }) {
  let uniqueUsers = new Map()

  global.conns.forEach((conn) => {
    if (conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED) {
      uniqueUsers.set(conn.user.jid, conn)
    }
  })

  let users = [...uniqueUsers.values()]
  let totalUsers = users.length

  let message = users.map((v, index) => {
    let name = v.user.name || '— Sin nombre —'
    let link = `https://wa.me/${v.user.jid.replace(/[^0-9]/g, '')}`
    return `*${index + 1}.* 🧩 *${name}*\n╰📎 *Contacto »* ${link}`
  }).join('\n\n')

  let header = `╭─❖ 「 *Sub-Bots Activos* 」 ❖─╮\n│\n│ 🛰️ *Total conectados:* ${totalUsers}\n│\n╰───────────────╯\n\n`
  let body = message.length > 0 ? message : '⚠️ No hay sub-bots activos en este momento.'
  let footer = `\n\n🧠 Usa *${usedPrefix}sockets* para refrescar la lista.`

  let responseMessage = `${header}${body}${footer}`.trim()

  await stars.sendMessage(m.chat, { text: responseMessage, ...rcanal }, { quoted: m })
}

handler.command = ['sockets', 'bots']
handler.help = ['bots', 'sockets']
handler.tags = ['jadibot']
export default handler