import { Client, GatewayIntentBits } from 'discord.js';
import keys from '../../constants/keys';
import { logger } from '../logger/logger';

const instance = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const init = () => {
  logger.info('Connection to bot started');

  instance.login(keys.token);

  logger.info('Connected to bot');

  instance.on('ready', (client) => {
    logger.info(`Logged in as ${client.user.tag}`);
  });
};

export const botClient = { instance, init };
