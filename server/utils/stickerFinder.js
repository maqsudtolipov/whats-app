const stickers = {
  au: {
    dead: 'among-us/dead.gif',
    discuss: 'among-us/discuss.gif',
    done: 'among-us/done.gif',
    embarrassed: 'among-us/embarrassed.gif',
    ghost: 'among-us/ghost.gif',
    hehehe: 'among-us/hehehe.gif',
    itsfine: 'among-us/itsfine.gif',
    kid: 'among-us/kid.gif',
    meeting: 'among-us/meeting.gif',
    no: 'among-us/no.gif',
    run: 'among-us/run.gif',
    seeya: 'among-us/seeya.gif',
    shhhh: 'among-us/shhhh.gif',
    space: 'among-us/space.gif',
    stupid: 'among-us/stupid.gif',
    yes: 'among-us/yes.gif',
  },
};

exports.findSticker = (name) => {
  // URL: folder -- name.gif
  const data = name.slice(1, -1).split('--');

  const sticker = stickers[data[0]][data[1]];

  return sticker;
};
