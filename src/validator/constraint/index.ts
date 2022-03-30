import { Validity } from 'validator/validity';
export type PropertyConstraint<T> = (value: T, key: string) => Validity<T>;
export type InterfaceConstraint<T> = {
  [P in keyof T]: PropertyConstraint<T[P]>
};
export * from './number';
export * from './string';
export * from './array';
