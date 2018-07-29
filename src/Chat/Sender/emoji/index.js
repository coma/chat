import list from './list';

const regex = /\(([a-z]+)\)/;

export default text => text.replace(regex, (part, keyword) => {
  const emoji = list.find(emoji => emoji.keywords.includes(keyword));
  return emoji ? emoji.char : part;
});
