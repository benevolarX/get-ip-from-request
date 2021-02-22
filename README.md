[![GitHub license](https://img.shields.io/github/license/benevolarX/get-ip-from-request?style=for-the-badge)](https://github.com/benevolarX/get-ip-from-request/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/get-ip-from-request?style=for-the-badge)](https://www.npmjs.com/package/get-ip-from-request)
[![npm](https://img.shields.io/npm/dw/get-ip-from-request?style=for-the-badge)](https://www.npmjs.com/package/get-ip-from-request)
![npm bundle size](https://img.shields.io/bundlephobia/min/get-ip-from-request?style=for-the-badge)
[![GitHub issues](https://img.shields.io/github/issues/benevolarX/get-ip-from-request?style=for-the-badge)](https://github.com/benevolarX/get-ip-from-request/issues)
# get-ip-from-request
get-ip-from-request is a 0-dependency small configurable tool to get ip from http request and validate ip (v4 & v6)
## Installation
Download [nodejs](https://nodejs.org/) first.
Use [npm](https://www.npmjs.com/package/npm) to install get-ip-from-request.
```bash
npm i get-ip-from-request@latest
```
## Usage
```js
const { createServer } = require('http');
const { isIp, isIpv4, isIpv6, getIpFromRequestBuilder, getIpFromRequest } = require('get-ip-from-request');
const localhost = '127.0.0.1';
console.log(isIp(localhost)); // true
console.log(isIpv4(localhost)); // true
console.log(isIpv6(localhost)); // false

const server = createServer((req, res) => {
  const ip = getIpFromRequest(req)
  const obj = { ip: ip }
  return res.end(JSON.stringify(obj))
})
```
## Contributing
README generate by Google Translate (sorry for bad english)
## License
[MIT](https://github.com/benevolarX/get-ip-from-request/blob/main/LICENSE)
