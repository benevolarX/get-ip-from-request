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
console.log(`${localhost} is ip ? `, isIp(localhost)); // true
console.log(`${localhost} is ip v4 ? `, isIpv4(localhost)); // true
console.log(`${localhost} is ip v6 ? `, isIpv6(localhost)); // false

const server = createServer((req, res) => {

  // simple use
  // const ip = getIpFromRequest(req)

  // OR custum use
  const myPersonnalGetIpFromRequest = getIpFromRequestBuilder({ headers: ['my-ip-header-want-to-be-check']})

  const ip = myPersonnalGetIpFromRequest(req)
  
  const v4 = isIpv4(ip)
  const v6 = isIpv6(ip)

  const obj = { ip, v4, v6 }
  return res.end(JSON.stringify(obj))
})
```

## Benchmarks
* __Machine:__ Windows 10 - x64 | AMD Ryzen 3 1300X Quad-Core - 3.5GHz | 8GB RAM.
* __Method:__ `require('benchmark').Suite`. (5 rounds to measure min, max & average)
* __Node:__ `v15.10.0`
* __Run:__ Tue, 23 Feb 2021 17:17:01 GMT 2021

|         | Version | ops/sec (average) | +-%       | runs  | ops/sec min   | ops/sec max   |
| :--     | --:     | :-:               | --:       | --:   | --:           | --:           |
| isIpv4  | 1.0.10  | 182,333           | 0.29-1.22 | 86-93 | 175,087       | 184,420       |
| is.ipv4 | 0.9.0   | 186,379           | 0.22-0.47 | 90-94 | 184,396       | 188,372       |
| isIpv6  | 1.0.10  | 5,373             | 0.18-0.24 | 93-96 | 5,256         | 5,407         |
| is.ipv6 | 0.9.0   | 4,889             | 0.15-0.27 | 94-96 | 4,741         | 4,952         |
| isIp    | 1.0.10  | 5,326             | 0.18-0.37 | 90-94 | 5,262         | 5,371         |
| is.ip   | 0.9.0   | 4,557             | 0.14-0.18 | 94-95 | 4,480         | 4,619         |


## Contributing
README generate by Google Translate (sorry for bad english)
## License
[MIT](https://github.com/benevolarX/get-ip-from-request/blob/main/LICENSE)
