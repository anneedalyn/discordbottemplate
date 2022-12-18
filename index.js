const Discord = require('discord.js');
const { Client, Intents, MessageEmbed, Collection, Guild } = require('discord.js');
const intents = new Discord.Intents(Intents)
const client = new Discord.Client({ intents })
const fs = require('fs');
let { readdirSync } = require('fs');

const estados =[
  {
  tipo: "WATCHING",
  contenido: "Your status",
  opcionesestado: "DND"
 },
];

async function activarestado() {
  const estado = Math.floor(Math.random() * estados.length);

  try{
    await client.user.setPresence({
      activities:[
        {
        name:estados[estado].contenido,
        type:estados[estado].tipo
       },
      ],
      status: estados[estado].opcionesestado
    });

  }catch (error){
    console.error[error];
  }
}

setInterval(activarestado,5000)
console.log("Status Finished")

client.on("ready", () => {
console.log("Bot started")
});

////////////////////////HANDLER//////////////////////////
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
  
client.on('messageCreate', (message) => {

let prefix = 'yourprefix'

if(message.channel.type === "dm") return;
if(message.author.bot) return;
if(!message.content.startsWith(prefix)) return;

let usuario = message.mentions.members.first() || message.member;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

  let cmd = client.commands.find((c) => c.name === command || c.aliagis && c.alias.includes(command));
if(cmd){
  cmd.execute(client, message, args)
}
if(!cmd){
  message.channel.send('Command error')
}
  
    });

client.login("yourtoken")

//Created by https://github.com/anneedalyn//