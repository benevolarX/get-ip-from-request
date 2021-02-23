import { IncomingMessage } from 'http'

declare const ipv4: string

declare const ipv6: string

declare function isIpv4(v?: string): boolean

declare function isIpv6(v?: string): boolean

declare function isIp(v?: string): boolean

declare function getIpFromRequest(req: IncomingMessage): string | null

declare interface getIpFromRequestBuilderOption {
  headers?: string[]
}

declare function getIpFromRequestBuilder(options: getIpFromRequestBuilderOption): (req: IncomingMessage) => string | null
