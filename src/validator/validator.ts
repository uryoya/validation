import { Validity, Valid, Invalid } from 'validator/validity';
import { InterfaceConstraint, PropertyConstraint } from 'validator/constraint';

export class Validator<T> {
  constructor(readonly constraint: InterfaceConstraint<T>) {}

  validate(value: T): Validity<T> {
    const errors = Object.keys(value)
      .flatMap((key) => {
        const constraint = Reflect.get(this.constraint, key) as PropertyConstraint<unknown>; // かなり苦し紛れ
        const property = Reflect.get(value as Record<string, unknown>, key) as unknown;
        const validity = constraint(property, key);
        if (validity.isInvalid()) {
          return validity.errors;
        }
        return [];
      });
    if (errors.length === 0) {
      return new Valid(value);
    }
    return new Invalid(errors);
  }
}
