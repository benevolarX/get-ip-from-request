const exp = {
  ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
  ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
};

function ipv4(value) {
  return exp.ipv4.test(value);
}
function ipv6(value) {
  return exp.ipv6.test(value);
}
function ip(value) {
  return ipv4(value) || ipv6(value);
}

// export { ipv4, ipv6, ip };
module.exports = {
  ipv4,
  ipv6,
  ip,
};
