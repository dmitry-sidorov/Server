const replaceInteger = str => {
  return str.replace(/{"\$(numberInt|numberLong)":"\d+"}/g, result => {
    const num = result.match(/\d+/)[0];
    return num;
  });
};

module.exports = replaceInteger;
