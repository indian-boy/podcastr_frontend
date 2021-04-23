/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function RemoveEmptiesFromObject(data: any): any {
  return Object.fromEntries(
    Object.entries(data).filter(([key, value]) => value !== null || value !== undefined)
  )
}

export function RemoveEmptiesFromObjectRecursively(obj: any): any {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v != null)
      .map(([k, v]) => [k, v === Object(v) ? RemoveEmptiesFromObjectRecursively(v) : v])
  )
}
