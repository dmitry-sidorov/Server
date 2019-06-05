const parseBSONtoJSON = dataBSON => {
  const leftBracket = '[';
  const rightBracket = ']';
  const data = dataBSON.replace(/\n/g, ',').slice(0, -1);
  const dataJSON = leftBracket + data + rightBracket;
  return dataJSON;
};

module.exports = parseBSONtoJSON;
