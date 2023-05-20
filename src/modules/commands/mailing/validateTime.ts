export const validateTime = (timeString = '') =>
  /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/.test(timeString);
