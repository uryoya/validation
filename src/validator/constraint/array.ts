import {
  Valid,
  Invalid,
} from 'validator/validity';
import {
  PropertyConstraint
} from 'validator/constraint';

export interface ArrayConstraint<T> {
  readonly maxLength?: number;
  readonly minLength?: number;
  readonly items?: PropertyConstraint<T>;
}

export function carray<T>(constraint: ArrayConstraint<T>): PropertyConstraint<T[]> {
  const constraints: PropertyConstraint<T[]>[] = [];
  if (constraint.maxLength !== undefined) {
    constraints.push(__maxLength(constraint.maxLength));
  }
  if (constraint.minLength !== undefined) {
    constraints.push(__minLength(constraint.minLength));
  }
  if (constraint.items !== undefined) {
    constraints.push(__items(constraint.items));
  }

  return (value: T[], key: string) => {
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

function __maxLength<T>(maxLength: number): PropertyConstraint<T[]> {
  return (value: T[], key: string) => {
      if (value.length <= maxLength) {
        return new Valid(value);
      }
      return new Invalid([`'${key}' should length less than ${maxLength}`]);
    };
}

function __minLength<T>(minLength: number): PropertyConstraint<T[]> {
  return (value: T[], key: string) => {
      if (value.length >= minLength) {
        return new Valid(value);
      }
      return new Invalid([`'${key}' should length more than ${minLength}`]);
    };
}

function __items<T>(constraint: PropertyConstraint<T>): PropertyConstraint<T[]> {
  return (values: T[], key: string) => {
    const errors = values.flatMap((value, idx) => {
        const validity = constraint(value, `${key}[${idx}]`)
        if (validity.isInvalid()) {
          return validity.errors;
        }
        return [];
      });
    if (errors.length === 0) {
      return new Valid(values);
    }
    return new Invalid(errors);
  }
}
