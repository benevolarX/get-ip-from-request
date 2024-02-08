const regexes = {
  ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
  ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
};

const is_ip_v4 = (t) => regexes.ipv4.test(t);

const is_ip_v6 = (t) => regexes.ipv6.test(t);

const is_ip = (t) => is_ip_v4(t) || is_ip_v6(t);

//export { is_ip_v4, is_ip_v6, is_ip };

module.exports = {
  is_ip_v4,
  is_ip_v6,
  is_ip,
};
