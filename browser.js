/**
 * Edge 14's fetch implementation is a buggy mess
 * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8653298/
 */
if (window.navigator.userAgent.indexOf('Edge/14') > -1)
    delete window.fetch;

module.exports = window.fetch || require('unfetch').default || require('unfetch');
