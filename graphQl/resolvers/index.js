const authResolver = require('./auth');
const imagesResolver = require('./images');
const labelResolver = require('./label');

const rootResolver = {
  ...authResolver,
  ...imagesResolver,
  ...labelResolver
};

module.exports = rootResolver;
