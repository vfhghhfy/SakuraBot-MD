import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

function reloadCommands(dir = path.join(__dirname, '..')) {
  const commandsMap = new Map();

  function readCommands(folder) {
    const files = fs.readdirSync(folder);
    for (const file of files) {
      const fullPath = path.join(folder, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
        readCommands(fullPath);
      } else if (file.endsWith('.js')) {
        delete require.cache[require.resolve(fullPath)];
        const cmd = require(fullPath);
        if (cmd.command) {
          for (const c of cmd.command) {
            commandsMap.set(c, cmd);
          }
        }
      }
    }
  }

  readCommands(dir);
  global.comandos = commandsMap;
}

let handler = async (m, { conn }) => {
  const baseDir = path.join(__dirname, '..');

  exec('git pull', (error, stdout, stderr) => {
    reloadCommands(baseDir);

    let msg = '';
    if (stdout.includes('Already up to date.')) {
      msg = '🫟 *Estado:* Todo está actualizado';
    } else {
      msg = `🕸 Todo fué actualizado correctamente.`;
    }

    conn.sendMessage(m.chat, { text: msg }, { quoted: m });
  });
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update'];
handler.owner = true;

export default handler;