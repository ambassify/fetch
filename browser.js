var _global_ = (function getGlobal() {
    if (typeof globalThis !== 'undefined')
        return globalThis;

    if (typeof window !== 'undefined')
        return window;

    return {};
})();

/**
 * Edge 14's fetch implementation is a buggy mess
 * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8653298/
 */
if (
    _global_ &&
    _global_.navigator &&
    _global_.navigator.userAgent &&
    _global_.navigator.userAgent.indexOf('Edge/14') > -1
) delete _global_.fetch;

module.exports = _global_.fetch || require('unfetch').default || require('unfetch');
