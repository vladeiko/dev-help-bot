import { dotenv } from '../modules/dotenv/dotenv';

dotenv.init();

const token = process.env.BOT_TOKEN || '';
const applicationId = process.env.APP_ID || '';

export default {
  token,
  applicationId,
};
