interface Headers {
  [key: string]: string
}

interface Request {
  headers: Headers;
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

interface Options {
  headers?: string[]
}

/**
 * test if v is ipv4
 * @param {string} v
 */
export declare function isIpv4(v: string): boolean;
/**
 * test if v is ipv6
 * @param {string} v
 */
export declare function isIpv6(v: string): boolean;
/**
 * test if v is ip (v4 or v6)
 * @param {string} v
 */
export declare function isIp(v: string): boolean;
/**
 * get ip from request
 * @param {Request} req
 * @returns {string|null}
 */
export declare function getIpFromRequest(req: Request): string | null;
/**
 * generate custom getIpFromRequest function
 * @param {Options} options
 * @return {(req: Request) => string|null}
 */
export declare function getIpFromRequestBuilder(options?: Options): (req: Request) => string | null;
