import ws from 'ws'

async function handler(m, { conn: stars, usedPrefix, command }) {
  let activeConns = new Map()

  global.conns.forEach(conn => {
    if (conn.user && conn.ws?.socket?.readyState !== ws.CLOSED) {
      activeConns.set(conn.user.jid, conn)
    }
  })

  let users = [...activeConns.values()]
  let total = users.length

  let header = ''
  let body = ''
  let footer = ''

  if (['sockets'].includes(command)) {
    header =
      `┌─「 🛰️ *Socket Monitor* 」─┐\n` +
      `│ 📡 Conexiones activas: ${total}\n` +
      `└────────────────────────┘\n`

    body = users.length > 0
      ? users.map((v, i) => {
          let name = v.user.name || '—'
          let jid = v.user.jid.replace(/[^0-9]/g, '')
          return `#${i + 1} » ${name}\n   ↳ wa.me/${jid}`
        }).join('\n\n')
      : '⚠️ No hay sockets activos en este momento.'

    footer =
      `\n\n🔄 Usa *${usedPrefix}sockets* o *${usedPrefix}sockets* para actualizar esta vista.`

  } else if (command === 'bots') {
    header =
      `╭─🎩 *Catálogo de Sub-Bots* ─╮\n` +
      `│ 🤖 Total conectados: *${total}*\n` +
      `╰──────────────────────────╯\n`

    body = users.length > 0
      ? users.map((v, i) => {
          let name = v.user.name || '— Sin nombre —'
          let jid = v.user.jid.replace(/[^0-9]/g, '')
          return `*${i + 1}.* 🧠 *${name}*\n   ╰📎 [Abrir Chat](https://wa.me/${jid})`
        }).join('\n\n')
      : '😴 No hay sub-bots activos por ahora.'

    footer =
      `\n\n✨ Puedes usar *${usedPrefix}bots* para refrescar esta lista.`

  } else {
   return
  }

  let response = `${header}\n${body}\n${footer}`.trim()

  await stars.sendMessage(
    m.chat,
    { text: response, ...rcanal },
    { quoted: m }
  )
}

handler.command = ['sockets', 'bots']
handler.help = ['bots', 'sockets']
handler.tags = ['jadibot']
export default handler