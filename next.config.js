const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['react-syntax-highlighter',]);
const optimizedImages = require('next-optimized-images');
 
module.exports = withPlugins([
  [optimizedImages, {
    /* config for next-optimized-images */
  }],

  // your other plugins here
  [withTM],
]);