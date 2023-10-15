const stickers = {
  au: {
    space: 'among-us/space.gif',
    shhhh: 'among-us/shhhh.gif',
  },
};

exports.findSticker = (name) => {
  // URL: folder -- name.gif
  const data = name.slice(1, -1).split('--');

  const sticker = stickers[data[0]][data[1]];

  return sticker || undefined;
};
