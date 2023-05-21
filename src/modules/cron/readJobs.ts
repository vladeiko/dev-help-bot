import { commandsMap } from '../commands/commandsMap';
import { type JobObject } from './JobObject';

interface JobFile {
  type?: string;
  jobs?: JobObject[];
}

export const readJobs = async (): Promise<JobFile[]> => {
  const keys = Object.keys(commandsMap) as (keyof typeof commandsMap)[];

  const jobs = await Promise.all(
    keys.map(async (_) => (await import(`../../../data/${_}.json`)).default as JobFile),
  );

  return jobs;
};
