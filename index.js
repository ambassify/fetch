var uuid = require('uuid').v4;

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

function getAppName() {
    if (typeof process == 'undefined' && global.location)
        return (global.location && global.location.hostname) || '';

    if (typeof process == 'undefined')
        return 'non-node';

    if (process && process.env && process.env['WORKER_NAME'])
        return process.env['WORKER_NAME'];

    if (process && process.env && process.env['APP_NAME'])
        return process.env['APP_NAME'];

    if (process && process.env && process.env['npm_package_name'])
        return process.env['npm_package_name'];

    if (process && typeof process.cwd == 'function') {
        try {
            var pkg = require(process.cwd() + '/package.json');
            if (pkg && pkg.name)
                return pkg.name;
        }
        catch (e) { /* package not found */ }
    }

    return 'unknown-node';
}

// Based on `unfetch` polyfill
// https://github.com/developit/unfetch/blob/master/packages/isomorphic-unfetch/index.js
function getImplementation() {
    var impl = global.fetch;
    var appName = getAppName();
    var appIdentifier = appName
        .replace(/[^a-z0-9]+/ig, '-')
        .toLowerCase()
        .replace(/(^-)|(-$)/ig, '');

    var headers = {
        'user-agent': 'Ambassify ' + appName + ' - dev@ambassify.com',
        'x-request-id': appIdentifier + '+' + uuid(),
    };

    if (!impl && typeof process == 'undefined')
        impl = require('unfetch').default || require('unfetch');

    if (!impl && typeof process != 'undefined')
        impl = require('node-fetch');

    return function fetch(url, options) {
        options = Object.assign({}, options || {});
        options.headers = Object.assign({}, headers, options.headers || {});

        return impl(url, options);
    };
}

module.exports = getImplementation();
