import { botClient } from './modules/botClient/botClient';
import { commands } from './modules/commands/commands';

botClient.init();
commands.refreshCommands();
commands.setupListeners();
