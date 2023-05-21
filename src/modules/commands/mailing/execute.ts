import { type ChatInputCommandInteraction } from 'discord.js';
import { validateTime } from './validateTime';

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const subcommandName = interaction.options.getSubcommand();
  const subCommand = interaction.options.data.find((_) => _.name === subcommandName);

  const { guildId = '', channelId } = interaction;

  const message = subCommand?.options?.find((_) => _.name === 'text' && typeof _.value === 'string')
    ?.value as string | undefined;

  const time = subCommand?.options?.find((_) => _.name === 'time' && typeof _.value === 'string')
    ?.value as string | undefined;

  console.log(guildId, channelId, message, time);

  if (!validateTime(time)) {
    interaction.reply({
      content:
        'Время введено в неверном формате, пожалуйста повторите ввод команды и укажите время в формате XX:YY',
      ephemeral: true,
    });

    return;
  }

  interaction.reply({
    content:
      `Я получил вашу команду ${interaction.commandName} ${subcommandName}. Пока не могу выполнить её, извините! Скоро исправлюсь!\n\n` +
      `Список параметров:\n\n` +
      subCommand?.options
        ?.map((_) => `Имя: ${_.name}\n` + `Значение: ${_.value}\n`)
        .join('---------\n'),
    ephemeral: true,
  });
};
