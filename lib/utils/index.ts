export * from '~/lib/utils/math'
export * from '~/lib/utils/images'

export function clientSideOnly<A extends any>(wrapped: A) {
  return function (args: any) {
    if (typeof window === 'undefined') {
      throw new TypeError('Must execute code client side only')
    }
    // @ts-ignore
    return wrapped.call(this as any, args)
  } as A
}
