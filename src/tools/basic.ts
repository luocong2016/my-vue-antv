import type { ComponentPublicInstance } from 'vue'

export type Numeric = number | string

// eslint-disable-next-line
export type ComponentInstance = ComponentPublicInstance<{}, any>

export type Writeable<T> = { -readonly [P in keyof T]: T[P] }

export type RequiredParams<T> = T extends (...args: infer P) => infer R
  ? (...args: { [K in keyof P]-?: NonNullable<P[K]> }) => R
  : never

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const extend = Object.assign

export function get(object: any, path: string): any {
  const keys = path.split('.')
  let result = object

  keys.forEach((key) => {
    result = isObject(result) ? result[key] ?? '' : ''
  })

  return result
}

export function pick<T, U extends keyof T>(
  obj: T,
  keys: ReadonlyArray<U>,
  ignoreUndefined?: boolean
) {
  return keys.reduce((ret, key) => {
    if (!ignoreUndefined || obj[key] !== void 0) {
      ret[key] = obj[key]
    }
    return ret
  }, {} as Writeable<Pick<T, U>>)
}
