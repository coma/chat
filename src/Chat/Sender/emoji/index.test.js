import emoji from './index';

describe('the emoji replacer', () => {
  it('should replace keywords with emojis', () => {
    expect(emoji('hello (smile)')).toBe('hello 😁');
    expect(emoji('hello (fooooooo)')).toBe('hello (fooooooo)');
  });
});
