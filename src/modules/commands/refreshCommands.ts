import { REST, Routes } from 'discord.js';
import keys from '../../constants/keys';
import { logger } from '../logger/logger';
import { commandsMap } from './commandsMap';

const refreshCommands = async () => {
  logger.info('Commands refresh started');

  const commands = Object.values(commandsMap).map((command) => command.data.toJSON());

  const rest = new REST().setToken(keys.token);

  try {
    logger.info(`Started refreshing ${commands.length} application (/) commands.`);

    const data = (await rest.put(Routes.applicationCommands(keys.applicationId), {
      body: commands,
    })) as any[];

    logger.info(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    logger.error(error as string);
  }
};

export default refreshCommands;
