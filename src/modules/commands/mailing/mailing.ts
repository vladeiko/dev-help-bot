import { SlashCommandBuilder, type ChatInputCommandInteraction } from 'discord.js';

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

  interaction.reply({
    content:
      `Я получил вашу команду ${interaction.commandName} ${subcommandName}. Будет сделано!\n\n` +
      `Список параметров:\n\n` +
      subCommand?.options
        ?.map((_) => `Имя: ${_.name}\n` + `Значение: ${_.value}\n`)
        .join('---------\n'),
    ephemeral: true,
  });

  const message = subCommand?.options?.find((_) => _.name === 'text' && typeof _.value === 'string')
    ?.value as string | undefined;

  if (message) {
    const channel = await interaction.client.channels
      .fetch(interaction.channelId)
      .then((_) => (_?.isTextBased() ? _ : null));

    channel?.send(message);
  }
};

export const mailing = { data, execute };
