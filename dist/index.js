var __commonJS = (callback, module) => () => {
  if (!module) {
    module = {exports: {}};
    callback(module.exports, module);
  }
  return module.exports;
};

// lib/index.js
var require_lib = __commonJS((exports, module) => {
  "use strict";
  /**!
   * get-ip-from-request
   *
   * @copyright 2021-2022 benevolarX
   * @license MIT
   */
  var regexipv4 = /^(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])(?:\.(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/;
  var regexipv6 = /^(?:(((([\dA-Fa-f]{1,4}:){7}([\dA-Fa-f]{1,4}|:))|(([\dA-Fa-f]{1,4}:){6}(:[\dA-Fa-f]{1,4}|((?:(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))\.){3}(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5])))|:))|(([\dA-Fa-f]{1,4}:){5}(((:[\dA-Fa-f]{1,4}){1,2})|:((?:(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))\.){3}(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5])))|:))|(([\dA-Fa-f]{1,4}:){4}(((:[\dA-Fa-f]{1,4}){1,3})|((:[\dA-Fa-f]{1,4})?:((?:(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))\.){3}(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))))|:))|(([\dA-Fa-f]{1,4}:){3}(((:[\dA-Fa-f]{1,4}){1,4})|((:[\dA-Fa-f]{1,4}){0,2}:((?:(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))\.){3}(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))))|:))|(([\dA-Fa-f]{1,4}:){2}(((:[\dA-Fa-f]{1,4}){1,5})|((:[\dA-Fa-f]{1,4}){0,3}:((?:(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))\.){3}(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))))|:))|(([\dA-Fa-f]{1,4}:){1}(((:[\dA-Fa-f]{1,4}){1,6})|((:[\dA-Fa-f]{1,4}){0,4}:((?:(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))\.){3}(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))))|:))|(:(((:[\dA-Fa-f]{1,4}){1,7})|((:[\dA-Fa-f]{1,4}){0,5}:((?:(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))\.){3}(?:([\d]|[1-9][\d]|1[\d]{2}|2[0-4][\d]|25[0-5]))))|:)))(%.+)?))$/i;
  var isIpv4 = (v) => regexipv4.test(v);
  var isIpv6 = (v) => regexipv6.test(v);
  var isIp = (v) => regexipv4.test(v) || regexipv6.test(v);
  var checkHeaders = [
    "x-client-ip",
    "cf-connecting-ip",
    "fastly-client-ip",
    "true-client-ip",
    "x-real-ip",
    "x-cluster-client-ip",
    "x-forwarded",
    "forwarded-for",
    "forwarded"
  ];
  function getIpXForwardedFor(v = null) {
    if (v === null) {
      return null;
    }
    if (toString.call(v) !== "[object String]") {
      throw new TypeError(`Expected a string, got "${typeof v}"`);
    }
    return v.split(",").shift().trim();
  }
  function getIpFromRequestPrivate(req, options = {}) {
    if (req?.headers) {
      if (req.headers?.["x-forwarded-for"]) {
        const xForwardedFor = getIpXForwardedFor(req.headers["x-forwarded-for"]);
        if (xForwardedFor !== null && isIp(xForwardedFor)) {
          return xForwardedFor;
        }
      }
      const listOfHeaders = options?.headers ? [...checkHeaders, options?.headers] : checkHeaders;
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
      if (req?.connection?.socket?.remoteAddress && isIp(req.connection.socket.remoteAddress)) {
        return req.connection.socket.remoteAddress;
      }
    }
    if (req?.socket?.remoteAddress && isIp(req.socket.remoteAddress)) {
      return req.socket.remoteAddress;
    }
    if (req?.info?.remoteAddress && isIp(req.info.remoteAddress)) {
      return req.info.remoteAddress;
    }
    if (req?.requestContext?.identity?.sourceIp && isIp(req.requestContext.identity.sourceIp)) {
      return req.requestContext.identity.sourceIp;
    }
    return null;
  }
  var getIpFromRequest = (req) => getIpFromRequestPrivate(req);
  function getIpFromRequestBuilder(options = {}) {
    return (req) => getIpFromRequestPrivate(req, options);
  }
  module.exports = {
    isIpv4,
    isIpv6,
    isIp,
    getIpFromRequest,
    getIpFromRequestBuilder
  };
});
export default require_lib();
