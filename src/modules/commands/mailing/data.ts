import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
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
