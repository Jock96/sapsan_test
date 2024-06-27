export const isPropertyExist = <T>(object: any, objectProperty: keyof T): object is T =>
  (object as T)[objectProperty] !== undefined

type KeyOf<T> = keyof T

export const isOfType = <T>(object: any, objectProperties: KeyOf<T>[]): object is T =>
  object === undefined ||
  object === null ||
  isNaN(object) ||
  object === Infinity ||
  object === -Infinity
    ? false
    : objectProperties.every((prop) => isPropertyExist(object, prop))
