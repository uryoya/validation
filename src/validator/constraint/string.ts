import {
  Valid,
  Invalid,
} from 'validator/validity';
import {
  PropertyConstraint
} from 'validator/constraint';

export interface StringConstraint {
  readonly maxLength?: number;
  readonly minLength?: number;
}

export function cstring(constraint: StringConstraint): PropertyConstraint<string> {
  const constraints: PropertyConstraint<string>[] = [];
  if (constraint.maxLength !== undefined) {
    constraints.push(__maxLength(constraint.maxLength));
  }
  if (constraint.minLength !== undefined) {
    constraints.push(__minLength(constraint.minLength));
  }

  return (value: string, key: string) => {
    const errors = constraints
      .map((f) => f(value, key))
      .flatMap((validity) => {
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

function __maxLength(maxLength: number): PropertyConstraint<string> {
  return (value: string, key: string) => {
      if (value.length <= maxLength) {
        return new Valid(value);
      }
      return new Invalid([`'${key}' should length less than ${maxLength}`]);
    };
}

function __minLength(minLength: number): PropertyConstraint<string> {
  return (value: string, key: string) => {
      if (value.length >= minLength) {
        return new Valid(value);
      }
      return new Invalid([`'${key}' should length more than ${minLength}`]);
    };
}
