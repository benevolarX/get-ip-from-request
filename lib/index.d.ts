/// <reference path="index.js" />

interface HeadersForIp {
  [key: string]: string
}

interface RequestForIp {
  headers: HeadersForIp;
  connection: {
    remoteAddress?: string;
    socket?: {
      remoteAddress?: string
    };
  };
  info?: {
    remoteAddress?: string
  };
  socket?: {
    remoteAddress?: string
  };
}

interface OptionsForIp {
  headers?: string[]
}

/**
 * test if v is ipv4
 * @param {string} v
 */
export function isIpv4(v: string): boolean;
/**
 * test if v is ipv6
 * @param {string} v
 */
export function isIpv6(v: string): boolean;
/**
 * test if v is ip (v4 or v6)
 * @param {string} v
 */
export function isIp(v: string): boolean;
/**
 * get ip from request
 * @param {RequestForIp} req
 * @returns {string|null}
 */
export function getIpFromRequest(req: RequestForIp): string | null;
/**
 * generate custom getIpFromRequest function
 * @param {OptionsForIp} options
 * @return {(req: Request) => string|null}
 */
export function getIpFromRequestBuilder(options?: OptionsForIp): (req: RequestForIp) => string | null;
