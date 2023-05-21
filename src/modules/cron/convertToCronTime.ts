export function convertToCronTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':');

  return `${minutes} ${hours} * * *`;
}
