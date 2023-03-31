[![GitHub license](https://img.shields.io/github/license/benevolarX/get-ip-from-request?style=for-the-badge)](https://github.com/benevolarX/get-ip-from-request/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/get-ip-from-request?style=for-the-badge)](https://www.npmjs.com/package/get-ip-from-request)
[![npm](https://img.shields.io/npm/dw/get-ip-from-request?style=for-the-badge)](https://www.npmjs.com/package/get-ip-from-request)
[![Downloads](https://img.shields.io/npm/dt/get-ip-from-request.svg?style=for-the-badge)](https://www.npmjs.com/package/get-ip-from-request)
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
| isIpv4  | 1.3.0   | 188,128           | 0.21-0.44 | 88-95 | 186,411       | 190,479       |
| is.ipv4 | 0.9.0   | 185,153           | 0.34-0.95 | 89-94 | 177,981       | 188,817       |
| isIpv6  | 1.3.0   | 6,521             | 0.17-0.55 | 93-96 | 6,417         | 6,587         |
| is.ipv6 | 0.9.0   | 4,970             | 0.15-0.25 | 93-96 | 4,940         | 4,994         |
| isIp    | 1.3.0   | 6,421             | 0.17-0.20 | 92-95 | 6,373         | 6,462         |
| is.ip   | 0.9.0   | 4,593             | 0.16-0.28 | 93-95 | 4,576         | 4,613         |

UPDATE : now request-ip (r-ip) is 0-dependancy lib and use own regex for test ip, let's try this

* __Machine:__ Windows 10 - x64 | AMD Ryzen 3 1300X Quad-Core - 3.5GHz | 16GB RAM.
* __Method:__ `require('benchmark').Suite`. (5 rounds to measure min, max & average)
* __Node:__ `v18.7.0`
* __Run:__ Tue, 23 Aug 2022 11:46:12 GMT 2022

|         | Version | ops/sec (average) | +-%       | runs  | ops/sec min   | ops/sec max   |
| :--     | --:     | :-:               | --:       | --:   | --:           | --:           |
| isIpv4  | 1.4.0   | 183,820           | 0.20-0.38 | 93-95 | 183,044       | 185,076       |
| is.ipv4 | 0.9.0   | 180,423 			| 0.30-0.51 | 91-95 | 180,340       | 182,421       |
| v4(r-ip)|	3.3.0	| 177,566 			| 0.23-0.25 | 90-95 | 169,167		| 182,432		|
| isIpv6  | 1.4.0   | 6,461             | 0.22-0.26 | 93-94 | 6,342         | 6,539         |
| is.ipv6 | 0.9.0   | 4,812             | 0.22-0.27 | 91-94 | 4,717         | 4,884         |
| v6(r-ip)| 3.3.0	| 4,943             | 0.20-0.28 | 93-96 | 4,871         | 5,003         |
| isIp    | 1.4.0  	| 6,298             | 0.17-0.24 | 92-95 | 6,208			| 6,362         |
| is.ip   | 0.9.0   | 4,483             | 0.18-0.31 | 91-94 | 4,415         | 4,535         |
| is(r-ip)| 3.3.0 	| 4,794				| 0.20-0.33 | 90-95 | 4,725         | 4,848         |

UPDATE : now i use same ipv4 regex than request-ip (isIpv4 == v4(r-ip)); so check only ipv6 regex to compare

* __Machine:__ Windows 10 - x64 | AMD Ryzen 5 5500 Hexa-Core - 3.6GHz | 16GB RAM.
* __Method:__ `require('benchmark').Suite`. (5 rounds to measure min, max & average)
* __Node:__ `v18.11.0`
* __Run:__ Fry, 21 Oct 2022 11:39:27 GMT 2022

|         | Version | ops/sec (average) | +-%       | runs  | ops/sec min   | ops/sec max   |
| :--     | --:     | :-:               | --:       | --:   | --:           | --:           |
| *isIpv4*| 1.5.0   | 285,325           | 0.10-0.19 | 93-98 | 284,360       | 286,441       |
| is.ipv4 | 0.9.0   | 285,313 			| 0.10-0.16 | 93-97 | 284,658       | 286,225       |
| v4(r-ip)|	3.3.0	| 284,865			| 0.08-0.11 | 95-97 | 283,924		| 285,792		|
| *isIpv6*| 1.5.0   | 10,796            | 0.16-0.28 | 91-97 | 10,598        | 10,973 		|
| is.ipv6 | 0.9.0   | 8,870             | 0.16-0.37 | 95-98 | 8,420         | 9,084         |
| v6(r-ip)| 3.3.0	| 9,103             | 0.11-0.35 | 94-98 | 8,678         | 9,334         |
| *isIp*  | 1.5.0  	| 10,538            | 0.11-0.15 | 96-98 | 10,410		| 10,664        |
| is.ip   | 0.9.0   | 8,174             | 0.12-0.29 | 96-99 | 7,894         | 8,415         |
| is(r-ip)| 3.3.0 	| 8,822				| 0.11-0.33 | 96-98 | 8,472         | 8,997         |

## 2023 UPDATE : node 19

* __Machine:__ Windows 10 - x64 | AMD Ryzen 5 5500 Hexa-Core - 3.6GHz | 16GB RAM.
* __Method:__ `require('benchmark').Suite`. (5 rounds to measure min, max & average)
* __Node:__ `v19.8.1`
* __Run:__ Fry, 31 Mar 2023 11:26:24 GMT 2023

|         | Version | ops/sec (average) | +-%       | runs  | ops/sec min   | ops/sec max   |
| :--     | --:     | :-:               | --:       | --:   | --:           | --:           |
| *isIpv4*| 1.5.1   | 280,320           | 0.11-1.63 | 89-96 | 276,185       | 281,715       |
| is.ipv4 | 0.9.0   | 280,474 			| 0.11-1.71 | 93-99 | 275,288       | 282,133       |
| v4(r-ip)|	3.3.0	| 280,723			| 0.10-1.44 | 96-98 | 277,047		| 281,789		|
| *isIpv6*| 1.5.1   | 10,619            | 0.15-0.96 | 93-99 | 10,404        | 10,761 		|
| is.ipv6 | 0.9.0   | 8,945 			| 0.14-0.26 | 94-98 | 8,887         | 9,064         |
| v6(r-ip)| 3.3.0	| 9,180             | 0.13-0.42 | 95-98 | 9,079	        | 9,352         |
| *isIp*  | 1.5.1  	| 10,491            | 0.12-0.33 | 94-96 | 10,357		| 10,533        |
| is.ip   | 0.9.0   | 8,132	            | 0.12-5.67 | 90-97 | 7,826         | 8,272         |
| is(r-ip)| 3.3.0 	| 8,861				| 0.13-0.31 | 94-97 | 8,798         | 8,902         |

## Contributing
...
## License
[MIT](https://github.com/benevolarX/get-ip-from-request/blob/main/LICENSE)
