import {
  Valid,
  Invalid,
} from 'validator/validity';
import {
  PropertyConstraint
} from 'validator/constraint';

export interface NumberConstraint {
  readonly max?: number;
  readonly min?: number;
}

export function cnumber(constraint: NumberConstraint): PropertyConstraint<number> {
  const constraints: PropertyConstraint<number>[] = [];
  if (constraint.max !== undefined) {
    constraints.push(__max(constraint.max));
  }
  if (constraint.min !== undefined) {
    constraints.push(__min(constraint.min));
  }

  return (value: number, key: string) => {
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

function __max(max: number): PropertyConstraint<number> {
  return (value: number, key: string) => {
      if (value <= max) {
        return new Valid(value);
      }
      return new Invalid([`'${key}' should less than ${max}`]);
    };
}

function __min(min: number): PropertyConstraint<number> {
  return (value: number, key: string) => {
      if (value >= min) {
        return new Valid(value);
      }
      return new Invalid([`'${key}' should more than ${min}`]);
    };
}
