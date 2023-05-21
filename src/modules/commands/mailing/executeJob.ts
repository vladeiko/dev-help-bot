import { botClient } from '../../botClient/botClient';
import { type JobObject } from '../../cron/JobObject';

interface MailingJob extends JobObject {
  text?: string;
  guildId?: string;
  channelId?: string;
}

const hasGuildId = (job?: MailingJob) => Boolean(job?.guildId);
const hasChannelAndText = (job?: MailingJob) => Boolean(job?.channelId && job?.text);

export const executeJob = async (job: MailingJob) => {
  if (hasGuildId(job) && hasChannelAndText(job)) {
    const guild = await botClient.instance.guilds.fetch(job.guildId as string);
    const channel = await guild.channels.fetch(job.channelId as string);

    channel?.isTextBased() && channel.send({ content: job.text });
  }

  if (!hasGuildId(job) && hasChannelAndText(job)) {
    const channel = await botClient.instance.channels.fetch(job.channelId as string);

    channel?.isTextBased() && channel.send({ content: job.text });
  }
};
