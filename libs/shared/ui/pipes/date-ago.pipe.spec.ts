import { DateAgoPipe } from './date-ago.pipe';

/**
 * Test file for DateAgoPipe
 *
 * Tests the standalone pipe for relative date formatting
 */
describe('DateAgoPipe', () => {
  let pipe: DateAgoPipe;

  beforeEach(() => {
    pipe = new DateAgoPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for null or undefined', () => {
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should return "just now" for dates less than 60 seconds ago', () => {
    const now = new Date();
    const thirtySecondsAgo = new Date(now.getTime() - 30 * 1000);
    expect(pipe.transform(thirtySecondsAgo)).toBe('just now');
  });

  it('should return "1 minute ago" for 60-119 seconds ago', () => {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 90 * 1000);
    expect(pipe.transform(oneMinuteAgo)).toBe('1 minute ago');
  });

  it('should return "X minutes ago" for multiple minutes', () => {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    expect(pipe.transform(fiveMinutesAgo)).toBe('5 minutes ago');
  });

  it('should return "1 hour ago" for 60-119 minutes ago', () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 90 * 60 * 1000);
    expect(pipe.transform(oneHourAgo)).toBe('1 hour ago');
  });

  it('should return "X hours ago" for multiple hours', () => {
    const now = new Date();
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
    expect(pipe.transform(threeHoursAgo)).toBe('3 hours ago');
  });

  it('should return "1 day ago" for 24-47 hours ago', () => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 30 * 60 * 60 * 1000);
    expect(pipe.transform(oneDayAgo)).toBe('1 day ago');
  });

  it('should return "X days ago" for multiple days', () => {
    const now = new Date();
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
    expect(pipe.transform(fiveDaysAgo)).toBe('5 days ago');
  });

  it('should return "1 week ago" for 7-13 days ago', () => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
    expect(pipe.transform(oneWeekAgo)).toBe('1 week ago');
  });

  it('should return "X weeks ago" for multiple weeks', () => {
    const now = new Date();
    const threeWeeksAgo = new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000);
    expect(pipe.transform(threeWeeksAgo)).toBe('3 weeks ago');
  });

  it('should return "1 month ago" for 30-59 days ago', () => {
    const now = new Date();
    const oneMonthAgo = new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000);
    expect(pipe.transform(oneMonthAgo)).toBe('1 month ago');
  });

  it('should return "X months ago" for multiple months', () => {
    const now = new Date();
    const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
    expect(pipe.transform(sixMonthsAgo)).toBe('6 months ago');
  });

  it('should return "1 year ago" for 365-729 days ago', () => {
    const now = new Date();
    const oneYearAgo = new Date(now.getTime() - 400 * 24 * 60 * 60 * 1000);
    expect(pipe.transform(oneYearAgo)).toBe('1 year ago');
  });

  it('should return "X years ago" for multiple years', () => {
    const now = new Date();
    const twoYearsAgo = new Date(now.getTime() - 800 * 24 * 60 * 60 * 1000);
    expect(pipe.transform(twoYearsAgo)).toBe('2 years ago');
  });

  it('should handle string input', () => {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    expect(pipe.transform(fiveMinutesAgo.toISOString())).toBe('5 minutes ago');
  });

  it('should handle number (timestamp) input', () => {
    const now = new Date();
    const fiveMinutesAgo = now.getTime() - 5 * 60 * 1000;
    expect(pipe.transform(fiveMinutesAgo)).toBe('5 minutes ago');
  });
});