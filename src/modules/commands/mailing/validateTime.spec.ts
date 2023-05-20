import { validateTime } from './validateTime';

describe('validateTime', () => {
  it('should return true if string 24-hour format time', () =>
    expect(validateTime('23:59')).toBeTruthy());

  it('should return false if string is not 24-hour format time', () =>
    expect(validateTime('39:77')).toBeFalsy());

  it('should return false if string is not 24-hour format time', () =>
    expect(validateTime('some text')).toBeFalsy());
});
