"use strict"

const v4seg = '(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])'
const ipv4 = `((?:(?:${v4seg})\\.){3}(?:${v4seg}))`
const hexa = '([0-9A-Fa-f]{1,4})'
const ipv6 = `((((${hexa}:){7}(${hexa}|:))|((${hexa}:){6}(:${hexa}|(${ipv4})|:))|((${hexa}:){5}(((:${hexa}){1,2})|:(${ipv4})|:))|((${hexa}:){4}(((:${hexa}){1,3})|((:${hexa})?:(${ipv4}))|:))|((${hexa}:){3}(((:${hexa}){1,4})|((:${hexa}){0,2}:(${ipv4}))|:))|((${hexa}:){2}(((:${hexa}){1,5})|((:${hexa}){0,3}:(${ipv4}))|:))|((${hexa}:){1}(((:${hexa}){1,6})|((:${hexa}){0,4}:(${ipv4}))|:))|(:(((:${hexa}){1,7})|((:${hexa}){0,5}:(${ipv4}))|:)))(%.+)?)`;

const regexipv4 = new RegExp(`^${ipv4}$`)
const regexipv6 = new RegExp(`^${ipv6}$`, 'i')
const regexip = new RegExp(`(?:^${ipv4}$)|(?:^${ipv6}$)`, 'i')

const isIpv4 = (v) => regexipv4.test(v)
const isIpv6 = (v) => regexipv6.test(v)
const isIp = (v) => regexip.test(v)

const checkHeaders = [
  'x-client-ip',
  'cf-connecting-ip',
  'fastly-client-ip',
  'true-client-ip',
  'x-real-ip',
  'x-cluster-client-ip',
  'x-forwarded',
  'forwarded-for',
  'forwarded'
]

function getIpXForwardedFor(v = null) {
  if (v === null) {
    return null
  }
  if (toString.call(v) !== '[object String]') {
    throw new TypeError(`Expected a string, got "${typeof v}"`)
  }
  return v.split(',').shift().trim()
}

function getIpFromRequestPrivate(req, options = {}) {
  if (req?.headers) {
    if (req.headers?.['x-forwarded-for']) {
      const xForwardedFor = getIpXForwardedFor(req.headers['x-forwarded-for'])
      if (xForwardedFor !== null && isIp(xForwardedFor)) {
        return xForwardedFor
      }
    }
    const listOfHeaders = options?.headers ? [...checkHeaders, options?.headers] : checkHeaders
    for (const index of listOfHeaders) {
      if (req.headers?.[index] && isIp(req.headers[index])) {
        return req.headers[index]
      }
    }
  }
  if (req?.connection) {
    if (req?.connection?.remoteAddress && isIp(req.connection.remoteAddress)) {
      return req.connection.remoteAddress
    }
    if (req?.connection?.socket?.remoteAddress && isIp(req.connection.socket.remoteAddress)) {
      return req.connection.socket.remoteAddress
    }
  }
  if (req?.socket?.remoteAddress && isIp(req.socket.remoteAddress)) {
    return req.socket.remoteAddress
  }
  if (req?.info?.remoteAddress && isIp(req.info.remoteAddress)) {
    return req.info.remoteAddress
  }
  if (req?.requestContext?.identity?.sourceIp && isIp(req.requestContext.identity.sourceIp)) {
    return req.requestContext.identity.sourceIp
  }
  return null;
}

const getIpFromRequest = req => getIpFromRequestPrivate(req)

function getIpFromRequestBuilder(options = {}) {
  return req => getIpFromRequestPrivate(req, options)
}

module.exports = {
  ipv4,
  ipv6,
  isIpv4,
  isIpv6,
  isIp,
  getIpFromRequest,
  getIpFromRequestBuilder
}
