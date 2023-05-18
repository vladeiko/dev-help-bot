import env from 'dotenv';
import { logger } from '../logger/logger';

const init = () => {
  logger.info('Setting up dotenv');

  env.config();

  logger.info('Dotenv setup done');
};

export const dotenv = { init };
