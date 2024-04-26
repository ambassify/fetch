# fetch
Loads the prefered Fetch API for the environment.

Based on the [unfetch](https://github.com/developit/unfetch) polyfill.

## Installation
```sh
npm install --save @ambassify/fetch
```
## Usage
```js
const fetch = require('@ambassify/fetch');
```
## Environments
### Browser
The browser will load either the native implementation on `window.fetch` or [unfetch](https://github.com/developit/unfetch).

### NodeJS
NodeJS will attempt to retrieve `global.fetch`,
if that is missing it will check if we are actually using node by checking the existence of global `process`.

If `process` is not defined [unfetch](https://github.com/developit/unfetch) will be loaded, otherwise [node-fetch](https://www.npmjs.com/package/node-fetch) will be loaded.

## Contribute
We really appreciate any contribution you would like to make, so don't
hesitate to report issues or submit pull requests.

## License
This project is released under a MIT license.

## About us
If you would like to know more about us, be sure to have a look at [our website](https://www.ambassify.com), or our Twitter accounts [Ambassify](https://twitter.com/Ambassify), [Sitebase](https://twitter.com/Sitebase), [JorgenEvens](https://twitter.com/JorgenEvens).
