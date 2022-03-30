export type Validity<T> = Valid<T> | Invalid

export class Valid<T> {
  constructor(readonly value: T) {}
  isInvalid(): this is Invalid {
    return false;
  }
}

export class Invalid {
  constructor(readonly errors: string[]) {}
  isInvalid(): this is Invalid {
    return true;
  }
}
