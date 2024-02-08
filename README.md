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
const { createServer } = require("http");
const {
  isIp,
  isIpv4,
  isIpv6,
  getIpFromRequestBuilder,
  getIpFromRequest,
} = require("get-ip-from-request");
const localhost = "127.0.0.1";
console.log(`${localhost} is ip ? `, isIp(localhost)); // true
console.log(`${localhost} is ip v4 ? `, isIpv4(localhost)); // true
console.log(`${localhost} is ip v6 ? `, isIpv6(localhost)); // false

const server = createServer((req, res) => {
  // simple use
  //const ip = getIpFromRequest(req)

  // OR custum use
  const options = { headers: ["my-ip-header-want-to-be-check"] };
  const myPersonnalGetIpFromRequest = getIpFromRequestBuilder(options);

  const ip = myPersonnalGetIpFromRequest(req);

  const v4 = isIpv4(ip);
  const v6 = isIpv6(ip);

  const obj = { ip, v4, v6 };
  return res.end(JSON.stringify(obj));
});
```

## Benchmarks

- **Machine:** Windows 10 - x64 | AMD Ryzen 5 5500 Hexa-Core - 3.6GHz | 16GB RAM.
- **Method:** `require('benchmark').Suite`. (5 rounds to measure min, max & average)
- **Node:** `v18.11.0`
- **Run:** Fry, 21 Oct 2022 11:39:27 GMT 2022

|          | Version | ops/sec (average) |       +-% |  runs | ops/sec min | ops/sec max |
| :------- | ------: | :---------------: | --------: | ----: | ----------: | ----------: |
| _isIpv4_ |   1.5.0 |      285,325      | 0.10-0.19 | 93-98 |     284,360 |     286,441 |
| is.ipv4  |   0.9.0 |      285,313      | 0.10-0.16 | 93-97 |     284,658 |     286,225 |
| v4(r-ip) |   3.3.0 |      284,865      | 0.08-0.11 | 95-97 |     283,924 |     285,792 |
| _isIpv6_ |   1.5.0 |      10,796       | 0.16-0.28 | 91-97 |      10,598 |      10,973 |
| is.ipv6  |   0.9.0 |       8,870       | 0.16-0.37 | 95-98 |       8,420 |       9,084 |
| v6(r-ip) |   3.3.0 |       9,103       | 0.11-0.35 | 94-98 |       8,678 |       9,334 |
| _isIp_   |   1.5.0 |      10,538       | 0.11-0.15 | 96-98 |      10,410 |      10,664 |
| is.ip    |   0.9.0 |       8,174       | 0.12-0.29 | 96-99 |       7,894 |       8,415 |
| is(r-ip) |   3.3.0 |       8,822       | 0.11-0.33 | 96-98 |       8,472 |       8,997 |

## 2023 UPDATE : node 19

- **Machine:** Windows 10 - x64 | AMD Ryzen 5 5500 Hexa-Core - 3.6GHz | 16GB RAM.
- **Method:** `require('benchmark').Suite`. (5 rounds to measure min, max & average)
- **Node:** `v19.8.1`
- **Run:** Fry, 31 Mar 2023 11:26:24 GMT 2023

|          | Version | ops/sec (average) |       +-% |  runs | ops/sec min | ops/sec max |
| :------- | ------: | :---------------: | --------: | ----: | ----------: | ----------: |
| _isIpv4_ |   1.5.1 |      280,320      | 0.11-1.63 | 89-96 |     276,185 |     281,715 |
| is.ipv4  |   0.9.0 |      280,474      | 0.11-1.71 | 93-99 |     275,288 |     282,133 |
| v4(r-ip) |   3.3.0 |      280,723      | 0.10-1.44 | 96-98 |     277,047 |     281,789 |
| _isIpv6_ |   1.5.1 |      10,619       | 0.15-0.96 | 93-99 |      10,404 |      10,761 |
| is.ipv6  |   0.9.0 |       8,945       | 0.14-0.26 | 94-98 |       8,887 |       9,064 |
| v6(r-ip) |   3.3.0 |       9,180       | 0.13-0.42 | 95-98 |       9,079 |       9,352 |
| _isIp_   |   1.5.1 |      10,491       | 0.12-0.33 | 94-96 |      10,357 |      10,533 |
| is.ip    |   0.9.0 |       8,132       | 0.12-5.67 | 90-97 |       7,826 |       8,272 |
| is(r-ip) |   3.3.0 |       8,861       | 0.13-0.31 | 94-97 |       8,798 |       8,902 |

## 2024 UPDATE : node 20

- **Machine:** Windows 10 - x64 | AMD Ryzen 5 5500 Hexa-Core - 3.6GHz | 16GB RAM.
- **Method:** `require('benchmark').Suite`. (5 rounds to measure min, max & average)
- **Node:** `v20.11.0`
- **Run:** Thu, 08 Feb 2024 19:07:34 GMT 2024

|          | Version | ops/sec (average) |       +-% |  runs | ops/sec min | ops/sec max |
| :------- | ------: | :---------------: | --------: | ----: | ----------: | ----------: |
| _isIpv4_ |   2.0.0 |      292,077      | 0.12-1.10 | 96-99 |     289,541 |     293,673 |
| is.ipv4  |   0.9.0 |      294,769      | 0.12-0.36 | 92-97 |     293,186 |     296,060 |
| v4(r-ip) |   3.3.0 |      292,685      | 0.12-0.24 | 90-96 |     291,546 |     293,775 |
| :------- | ------: | :---------------: | --------: | ----: | ----------: | ----------: |
| _isIpv6_ |   2.0.0 |      10,940       | 0.24-0.56 | 95-96 |      10,702 |      11,034 |
| is.ipv6  |   0.9.0 |       9,373       | 0.13-0.63 | 96-98 |       9,262 |       9,501 |
| v6(r-ip) |   3.3.0 |       9,366       | 0.13-0.64 | 96-99 |       9,289 |       9,495 |
| :------- | ------: | :---------------: | --------: | ----: | ----------: | ----------: |
| _isIp_   |   2.0.0 |      10,588       | 0.08-0.48 | 93-97 |      10,373 |      10,734 |
| is.ip    |   0.9.0 |       8,980       | 0.13-1.93 | 90-99 |       8,599 |       9,191 |
| is(r-ip) |   3.3.0 |       8,977       | 0.13-0.92 | 93-99 |       8,710 |       9,206 |

## Contributing

...

## License

[MIT](https://github.com/benevolarX/get-ip-from-request/blob/main/LICENSE)
