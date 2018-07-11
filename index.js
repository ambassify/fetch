if (
    (
        /**
         * Edge 14's fetch implementation is a buggy mess
         * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8653298/
         */
        global.navigator &&
        global.navigator.userAgent &&
        global.navigator.userAgent.indexOf('Edge/14') > -1
    ) || (
        /**
         * Some browsers have a fetch implementation but only a partial Headers implementation
         * https://developer.mozilla.org/en-US/docs/Web/API/Headers#Browser_compatibility
         */
        !global.Headers ||
        !global.Headers.prototype.entries
    )
) {
    // we have to delete fetch because unfetch has a bug that won't let it act like
    // a ponyfill: https://github.com/developit/unfetch/issues/77
    delete global.fetch;
}

// Based on `unfetch` polyfill
// https://github.com/developit/unfetch/blob/master/packages/isomorphic-unfetch/index.js
module.exports = global.fetch || (
    typeof process=='undefined' ? (require('unfetch').default || require('unfetch')) : require('node-fetch')
);
