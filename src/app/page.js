require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.TOKEN;

// Estructura: { "quien:objetivo": contador }
const deudas = {};

client.on('ready', () => {
  console.log(`Bot iniciado como ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return; // ignorar otros bots

  if (message.content.toLowerCase().startsWith('!c ')) {
    const partes = message.content.trim().split(/\s+/);
    if (partes.length >= 2) {
      const objetivo = partes[1].toLowerCase(); // normaliza el nombre
      const autor = message.author.username;
      const clave = `${autor.toLowerCase()}:${objetivo}`;

      if (!deudas[clave]) {
        deudas[clave] = 0;
      }
      deudas[clave] += 1;

      message.channel.send(`${autor} le debe ${deudas[clave]} a ${objetivo}`);
    } else {
      message.channel.send(`Usá el comando así: !c <nombre>`);
    }
  }
});

client.login(TOKEN);