import { SlashCommandBuilder, type ChatInputCommandInteraction } from 'discord.js';
import { validateTime } from './validateTime';

const data = new SlashCommandBuilder()
  .setName('mailing')
  .setDescription('Автоматическая рассылка сообщений')
  .addSubcommand((subcommand) =>
    subcommand
      .setName('add')
      .setDescription('Создать сообщение для автоматической рассылки (только рабочие дни)')
      .addStringOption((message) =>
        message
          .setName('text')
          .setDescription('Сообщение, которое будет рассылаться')
          .setRequired(true),
      )
      .addStringOption((message) =>
        message.setName('time').setDescription('Время отправки сообщения').setRequired(true),
      ),
  );

const execute = async (interaction: ChatInputCommandInteraction) => {
  const subcommandName = interaction.options.getSubcommand();
  const subCommand = interaction.options.data.find((_) => _.name === subcommandName);

  const message = subCommand?.options?.find((_) => _.name === 'text' && typeof _.value === 'string')
    ?.value as string | undefined;

  const time = subCommand?.options?.find((_) => _.name === 'time' && typeof _.value === 'string')
    ?.value as string | undefined;

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
      `Я получил вашу команду ${interaction.commandName} ${subcommandName}. Будет сделано!\n\n` +
      `Список параметров:\n\n` +
      subCommand?.options
        ?.map((_) => `Имя: ${_.name}\n` + `Значение: ${_.value}\n`)
        .join('---------\n'),
    ephemeral: true,
  });

  if (message) {
    const channel = await interaction.client.channels
      .fetch(interaction.channelId)
      .then((_) => (_?.isTextBased() ? _ : null));

    channel?.send(message);
  }
};

export const mailing = { data, execute };
