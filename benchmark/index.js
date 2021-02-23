const Suite = require('benchmark').Suite
const { isIp, isIpv4, isIpv6 } = require('../lib/index.js')
const { ipv4: ISJSipv4, ipv6: ISJSipv6, ip: ISJSip } = require('is_js')
const { v4, v4not, v6, v6not } = require('../tests/data.js')

const suite = new Suite();

suite
  .add('test ip v4 my lib', () => {
    for (const totest of v4) {
      isIpv4(totest)
    }
    for (const totest of v4not) {
      isIpv4(totest)
    }
    for (const totest of v6) {
      isIpv4(totest)
    }
    for (const totest of v6not) {
      isIpv4(totest)
    }
  })
  .add('test ip v4 is.ipv4', () => {
    for (const totest of v4) {
      ISJSipv4(totest)
    }
    for (const totest of v4not) {
      ISJSipv4(totest)
    }
    for (const totest of v6) {
      ISJSipv4(totest)
    }
    for (const totest of v6not) {
      ISJSipv4(totest)
    }
  })
  .add('test ip v6 is.ipv6', () => {
    for (const totest of v4) {
      ISJSipv6(totest)
    }
    for (const totest of v4not) {
      ISJSipv6(totest)
    }
    for (const totest of v6) {
      ISJSipv6(totest)
    }
    for (const totest of v6not) {
      ISJSipv6(totest)
    }
  })
  .add('test ip v6 my lib isIpv6', () => {
    for (const totest of v4) {
      isIpv6(totest)
    }
    for (const totest of v4not) {
      isIpv6(totest)
    }
    for (const totest of v6) {
      isIpv6(totest)
    }
    for (const totest of v6not) {
      isIpv6(totest)
    }
  })
  .add('test ip is IP my lib isIp', () => {
    for (const totest of v4) {
      isIp(totest)
    }
    for (const totest of v4not) {
      isIp(totest)
    }
    for (const totest of v6) {
      isIp(totest)
    }
    for (const totest of v6not) {
      isIp(totest)
    }
  })
  .add('test ip is IP of is.ip', () => {
    for (const totest of v4) {
      ISJSip(totest)
    }
    for (const totest of v4not) {
      ISJSip(totest)
    }
    for (const totest of v6) {
      ISJSip(totest)
    }
    for (const totest of v6not) {
      ISJSip(totest)
    }
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log('---------------')
  })
  // run async
  .run({ 'async': true })
