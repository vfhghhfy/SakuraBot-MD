import ws from 'ws'

let handler = async (m, { conn }) => {
   let uniqueUsers = new Map()

   if (!global.conns || !Array.isArray(global.conns)) {
     global.conns = []
   }

   global.conns.forEach((conn) => {
     if (conn.user && conn.ws?.socket?.readyState !== ws.CLOSED) {
       uniqueUsers.set(conn.user.jid, conn)
     }
   })

   let totalUsers = uniqueUsers.size
   let txt = '*`🕸 Total Sub-Bots`*' + ` » *${totalUsers || 0}*`

   await conn.reply(m.chat, txt, m, rcanal)
}

handler.command = ['sockets', 'bots']
handler.help = ['bots', 'sockets']
handler.tags = ['jadibot']
export default handler