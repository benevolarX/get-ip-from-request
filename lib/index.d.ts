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
 * @param {http.IncomingMessage} req
 * @returns {string|null}
 */
export function getIpFromRequest(req: any): string | null;
/**
 * generate custom getIpFromRequest function
 * @param {*} options
 * @return {(req: http.IncomingMessage) => string|null}
 */
export function getIpFromRequestBuilder(options?: any): (req: any) => string | null;
