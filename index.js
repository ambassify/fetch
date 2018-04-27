/**
 * Edge 14's fetch implementation is a buggy mess
 * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8653298/
 */
if (
    global.navigator &&
    global.navigator.userAgent &&
    global.navigator.userAgent.indexOf('Edge/14') > -1
) delete global.fetch;

// Based on `unfetch` polyfill
// https://github.com/developit/unfetch/blob/master/packages/isomorphic-unfetch/index.js
module.exports = global.fetch || (
    typeof process=='undefined' ? (require('unfetch').default || require('unfetch')) : require('node-fetch')
);
