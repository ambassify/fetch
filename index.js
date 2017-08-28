// Based on `unfetch` polyfill
// https://github.com/developit/unfetch/blob/master/packages/isomorphic-unfetch/index.js
module.exports = global.fetch || (
    typeof process=='undefined' ? (require('unfetch').default || require('unfetch')) : require('node-fetch')
);
