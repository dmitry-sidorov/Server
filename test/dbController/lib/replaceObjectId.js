const replaceObjectId = str => {
  return str.replace(/{"\$oid":"(\d|\w){24}"}/g, result => {
    const id = result.match(/"(\d+|\w+)"/)[0];
    return `"ObjectId(${id})"`;
  });
};

module.exports = replaceObjectId;
