[![GitHub license](https://img.shields.io/github/license/benevolarX/get-ip-from-request?style=for-the-badge)](https://github.com/benevolarX/get-ip-from-request/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/get-ip-from-request?style=for-the-badge)](https://www.npmjs.com/package/get-ip-from-request)
[![npm](https://img.shields.io/npm/dw/get-ip-from-request?style=for-the-badge)](https://www.npmjs.com/package/get-ip-from-request)
[![Downloads](https://img.shields.io/npm/dt/get-ip-from-request.svg?style=flat)](https://www.npmjs.com/package/get-ip-from-request)
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
  //const ip = getIpFromRequest(req)

  // OR custum use
  const options = { headers: ['my-ip-header-want-to-be-check'] }
  const myPersonnalGetIpFromRequest = getIpFromRequestBuilder(options)
  
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

* __Machine:__ Windows 10 - x64 | AMD Ryzen 3 1300X Quad-Core - 3.5GHz | 8GB RAM.
* __Method:__ `require('benchmark').Suite`. (5 rounds to measure min, max & average)
* __Node:__ `v15.10.0`
* __Run:__ Wed, 24 Feb 2021 12:36:42 GMT 2021

|         | Version | ops/sec (average) | +-%       | runs  | ops/sec min   | ops/sec max   |
| :--     | --:     | :-:               | --:       | --:   | --:           | --:           |
| isIpv4  | 1.1.0   | 183,923           | 0.20-0.28 | 92-95 | 182,022       | 185,032       |
| is.ipv4 | 0.9.0   | 183,512           | 0.27-0.33 | 89-94 | 180,761       | 185,693       |
| isIpv6  | 1.1.0   | 5,792             | 0.16-0.19 | 93-96 | 5,706         | 5,864         |
| is.ipv6 | 0.9.0   | 4,919             | 0.14-0.16 | 90-97 | 4,774         | 4,980         |
| isIp    | 1.1.0   | 5,716             | 0.17-0.26 | 93-96 | 5,628         | 5,764         |
| is.ip   | 0.9.0   | 4,572             | 0.16-0.28 | 93-96 | 4,468         | 4,615         |

* __Machine:__ Windows 10 - x64 | AMD Ryzen 3 1300X Quad-Core - 3.5GHz | 16GB RAM.
* __Method:__ `require('benchmark').Suite`. (5 rounds to measure min, max & average)
* __Node:__ `v17.5.0`
* __Run:__ Wed, 16 Feb 2022 15:44:26 GMT 2022

|         | Version | ops/sec (average) | +-%       | runs  | ops/sec min   | ops/sec max   |
| :--     | --:     | :-:               | --:       | --:   | --:           | --:           |
| isIpv4  | 1.2.2   | 188,128           | 0.21-0.44 | 88-95 | 186,411       | 190,479       |
| is.ipv4 | 0.9.0   | 185,153           | 0.34-0.95 | 89-94 | 177,981       | 188,817       |
| isIpv6  | 1.2.2   | 6,521             | 0.17-0.55 | 93-96 | 6,417         | 6,587         |
| is.ipv6 | 0.9.0   | 4,970             | 0.15-0.25 | 93-96 | 4,940         | 4,994         |
| isIp    | 1.2.2   | 6,421             | 0.17-0.20 | 92-95 | 6,373         | 6,462         |
| is.ip   | 0.9.0   | 4,593             | 0.16-0.28 | 93-95 | 4,576         | 4,613         |

## Contributing
...
## License
[MIT](https://github.com/benevolarX/get-ip-from-request/blob/main/LICENSE)
