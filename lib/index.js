// @ts-nocheck
"use strict";

/**!
 * get-ip-from-request
 *
 * @copyright 2021-2022 benevolarX
 * @copyright 2023-2024 victor-auffret
 * @license MIT
 */

const regexipv4 =
  /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;

const regexipv6 =
  /^(?:(((([\dA-F]{1,4}:){7}([\dA-F]{1,4}|:))|(([\dA-F]{1,4}:){6}(:[\dA-F]{1,4}|((?:(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))\.){3}(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5])))|:))|(([\dA-F]{1,4}:){5}(((:[\dA-F]{1,4}){1,2})|:((?:(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))\.){3}(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5])))|:))|(([\dA-F]{1,4}:){4}(((:[\dA-F]{1,4}){1,3})|((:[\dA-F]{1,4})?:((?:(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))\.){3}(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))))|:))|(([\dA-F]{1,4}:){3}(((:[\dA-F]{1,4}){1,4})|((:[\dA-F]{1,4}){0,2}:((?:(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))\.){3}(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))))|:))|(([\dA-F]{1,4}:){2}(((:[\dA-F]{1,4}){1,5})|((:[\dA-F]{1,4}){0,3}:((?:(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))\.){3}(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))))|:))|(([\dA-F]{1,4}:){1}(((:[\dA-F]{1,4}){1,6})|((:[\dA-F]{1,4}){0,4}:((?:(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))\.){3}(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))))|:))|(:(((:[\dA-F]{1,4}){1,7})|((:[\dA-F]{1,4}){0,5}:((?:(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))\.){3}(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))))|:)))(%.+)?))$/i;

/**
 * test if v is ipv4
 * @param {string} v
 */
const isIpv4 = (v) => regexipv4.test(v);
/**
 * test if v is ipv6
 * @param {string} v
 */
const isIpv6 = (v) => regexipv6.test(v);
/**
 * test if v is ip (v4 or v6)
 * @param {string} v
 */
const isIp = (v) => regexipv4.test(v) || regexipv6.test(v);

const checkHeaders = [
  "x-client-ip",
  "cf-connecting-ip",
  "fastly-client-ip",
  "true-client-ip",
  "x-real-ip",
  "x-cluster-client-ip",
  "x-forwarded",
  "forwarded-for",
  "forwarded",
];

/**
 * get client ip from XForwardedFor header
 * @param {string|null} v
 * @returns {string|null}
 */
function getIpXForwardedFor(v = null) {
  if (v === null) {
    return null;
  }
  if (toString.call(v) !== "[object String]") {
    throw new TypeError(`Expected a string, got "${typeof v}"`);
  }
  // @ts-ignore
  return v.split(",").shift().trim();
}

/**
 * custum call for get ip from request
 * @param {http.IncomingMessage} req
 * @param {getIpFromRequestBuilderOption} options
 * @returns {string|null}
 */
function getIpFromRequestPrivate(req, options = {}) {
  if (req?.headers) {
    if (req.headers?.["x-forwarded-for"]) {
      const xForwardedFor = getIpXForwardedFor(req.headers["x-forwarded-for"]);
      if (xForwardedFor !== null && isIp(xForwardedFor)) {
        return xForwardedFor;
      }
    }
    const listOfHeaders = options?.headers
      ? [...checkHeaders, options?.headers]
      : checkHeaders;
    for (const index of listOfHeaders) {
      if (req.headers?.[index] && isIp(req.headers[index])) {
        return req.headers[index];
      }
    }
  }
  if (req?.connection) {
    if (req?.connection?.remoteAddress && isIp(req.connection.remoteAddress)) {
      return req.connection.remoteAddress;
    }
    if (
      req?.connection?.socket?.remoteAddress &&
      isIp(req.connection.socket.remoteAddress)
    ) {
      return req.connection.socket.remoteAddress;
    }
  }
  if (req?.socket?.remoteAddress && isIp(req.socket.remoteAddress)) {
    return req.socket.remoteAddress;
  }
  if (req?.info?.remoteAddress && isIp(req.info.remoteAddress)) {
    return req.info.remoteAddress;
  }
  if (
    req?.requestContext?.identity?.sourceIp &&
    isIp(req.requestContext.identity.sourceIp)
  ) {
    return req.requestContext.identity.sourceIp;
  }
  return null;
}

/**
 * get ip from request
 * @param {http.IncomingMessage} req
 * @returns {string|null}
 */
const getIpFromRequest = (req) => getIpFromRequestPrivate(req);

/**
 * generate custom getIpFromRequest function
 * @param {*} options
 * @return {(req: http.IncomingMessage) => string|null}
 */
function getIpFromRequestBuilder(options = {}) {
  return (req) => getIpFromRequestPrivate(req, options);
}

module.exports = {
  isIpv4,
  isIpv6,
  isIp,
  getIpFromRequest,
  getIpFromRequestBuilder,
};
