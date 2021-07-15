import { APIMessage, Client, Intents } from 'discord.js';
import config from './config';

const client = new Client({ intents: Intents.NON_PRIVILEGED });

client.once('ready', async () => {
  // const command = await client.application.commands.create({
  //   name: 'echo',
  //   description: 'Replies with your input!',
  //   options: [{
  //     name: 'input',
  //     type: 'STRING',
  //     description: 'The input which should be echoed back',
  //     required: true,
      
  //   }],
  // });
  // console.log(command);
  // console.log('ready');
});

client.on('error', console.error)
  .on('warn', console.warn)
  .on('debug', (m) => !m.toLowerCase().includes('heartbeat') && console.log(m))
  .on('ready', () => {
    console.log(`Client ready; logged in as ${client.user?.username}#${client.user?.discriminator} (${client.user?.id})`);
  })
  .on('disconnect', () => { console.warn('Disconnected!'); })
  .on('shardReconnecting', () => { console.warn('Reconnecting...'); });

client.on('message', async (message) => {
  // client.application
  if (message.author.bot) return;
  if (message.channel.id !== '343634182615990273') return;
  // await message.reply('test');
  const apiMessage = APIMessage.create(message.channel, 'test', {});
  const { data, files } = await apiMessage.resolveData().resolveFiles();

  console.log(data, apiMessage);

  // @ts-ignore
  data.components = [
    {
      "type": 1,
      "components": [
        {
          "type": 2,
          "style": 1,
          "custom_id": "test",
          "label": "Blurple Button"
        },
        {
          "type": 2,
          "style": 2,
          "custom_id": "test",
          "label": "Gray Button"
        },
        {
          "type": 2,
          "style": 3,
          "custom_id": "test",
          "label": "Green Button"
        },
        {
          "type": 2,
          "style": 4,
          "custom_id": "test",
          "label": "Red Button"
        },
        {
          "type": 2,
          "style": 5,
          "url": "https://google.com",
          "label": "Link Button"
        }
      ]
    }
  ];

  // @ts-ignore
  console.log(data.components);
  // @ts-ignore
  console.log(client.options.http.version);
  // @ts-ignore
  console.log(client.api.channels[message.channel.id].messages.post({ data, files }));
});

client.on('interaction', async (interaction) => {
  if (!interaction.isCommand() || !interaction.channel.isText()) return;

  const apiMessage = APIMessage.create(interaction.channel, 'test', {});
  const { data, files } = await apiMessage.resolveData().resolveFiles();

  console.log(data, apiMessage);

  // @ts-ignore
  data.components = [
    {
      "type": 1,
      "components": [
        {
          "type": 2,
          "style": 1,
          "custom_id": "test",
          "label": "Blurple Button"
        },
        {
          "type": 2,
          "style": 2,
          "custom_id": "test",
          "label": "Gray Button"
        },
        {
          "type": 2,
          "style": 3,
          "custom_id": "test",
          "label": "Green Button"
        },
        {
          "type": 2,
          "style": 4,
          "custom_id": "test",
          "label": "Red Button"
        },
        {
          "type": 2,
          "style": 5,
          "url": "https://google.com",
          "label": "Link Button"
        }
      ]
    }
  ];
  apiMessage.data = data;
  // @ts-ignore
  console.log((await apiMessage.resolveData().resolveFiles()).data.components);
  interaction.reply(apiMessage);
  if (!interaction.channel.isText()) return;
});

client.login(config.token);
