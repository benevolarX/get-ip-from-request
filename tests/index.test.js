const { test } = require('tape')
const { isIpv4, isIpv6, isIp } = require('../lib/index.js')
const { v4, v4not, v6, v6not } = require('./data.js')

test('ip v4 is true', t => {
    t.plan(v4.length)
    for (const ip of v4) {
        t.ok(isIpv4(ip))
    }
})

test('ip v6 is true', t => {
    t.plan(v6.length)
    for (const ip of v6) {
        t.ok(isIpv6(ip))
    }
})

test('not ip v4 is false', t => {
    t.plan(v4not.length)
    for (const ip of v4not) {
        t.notok(isIpv4(ip))
    }
})

test('not ip v6 is true', t => {
    t.plan(v6not.length)
    for (const ip of v6not) {
        t.notok(isIpv6(ip))
    }
})

test('ip v4 is not ipv6', t => {
    t.plan(v4.length)
    for (const ip of v4) {
        t.notok(isIpv6(ip))
    }
})

test('ip v6 is not ipv4', t => {
    t.plan(v6.length)
    for (const ip of v6) {
        t.notok(isIpv4(ip))
    }
})

test('ip v4 is ip', t => {
    t.plan(v4.length)
    for (const ip of v4) {
        t.ok(isIp(ip))
    }
})

test('ip v6 is ip', t => {
    t.plan(v6.length)
    for (const ip of v6) {
        t.ok(isIp(ip))
    }
})

test('not ip v4 is not ip', t => {
    t.plan(v4not.length)
    for (const ip of v4not) {
        t.notok(isIp(ip))
    }
})

test('not ip v6 is not ip', t => {
    t.plan(v6not.length)
    for (const ip of v6not) {
        t.notok(isIp(ip))
    }
})

test('test localhost', t => {
    t.plan(3)
    const localhost = '127.0.0.1'
    t.ok(isIp(localhost))
    t.ok(isIpv4(localhost))
    t.notok(isIpv6(localhost))
})