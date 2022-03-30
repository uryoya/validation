import { Validity, Valid, Invalid } from 'validator/validity';
import { InterfaceConstraint } from 'validator/constraint';

export class Validator<T extends Object> {
  constructor(readonly constraint: InterfaceConstraint<T>) {}

  validate(value: T): Validity<T> {
    const errors = Object.keys(this.constraint)
      .flatMap((key) => {
        const constraint = Reflect.get(this.constraint, key);
        const property = Reflect.get(value, key);
        const validity: Validity<T> = constraint(property, key);
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
