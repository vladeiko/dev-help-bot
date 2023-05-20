import { botClient } from './modules/botClient/botClient';
import { commands } from './modules/commands/commands';
import { cron } from './modules/cron/cron';

botClient.init();
commands.refreshCommands();
commands.setupListeners();
cron.scheduleJobs().then((jobs) => jobs.forEach((j) => j.start()));
