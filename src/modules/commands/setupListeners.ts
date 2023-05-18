import { Events } from 'discord.js';
import { botClient } from '../botClient/botClient';
import { commandsMap } from './commandsMap';

const setupListeners = () => {
  botClient.instance.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const commandName = interaction.commandName;

    if (Object.keys(commandsMap).includes(commandName)) {
      commandsMap[commandName as keyof typeof commandsMap].execute(interaction);
    }
  });
};

export default setupListeners;
