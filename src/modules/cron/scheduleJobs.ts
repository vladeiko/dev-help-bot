import cron, { type CronJob } from 'cron';
import { noop } from '../../utils/noop';
import { commandsMap } from '../commands/commandsMap';
import { validateTime } from '../commands/mailing/validateTime';
import { convertToCronTime } from './convertToCronTime';
import { readJobs } from './readJobs';

const extractJobExecutorByType = (type = '') =>
  commandsMap[type as keyof typeof commandsMap]?.executeJob || noop;

export const scheduleJobs = async (): Promise<CronJob[]> =>
  (await readJobs())
    .filter(({ type, jobs }) => Boolean(type) && Boolean(jobs))
    .map(({ type, jobs }) =>
      jobs
        ?.filter(({ time }) => validateTime(time))
        .map(
          (j) =>
            new cron.CronJob(convertToCronTime(j.time as string), () =>
              extractJobExecutorByType(type)(j),
            ),
        ),
    )
    .flat()
    .filter(Boolean) as CronJob[];
