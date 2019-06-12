const replaceObjectId = str => {
  return str.replace(/{"\$oid":"(\d|\w){24}"}/g, result => {
    return result.match(/"(\d+|\w+)"/)[0];
  });
};

module.exports = replaceObjectId;
