import {
  Valid,
  Invalid,
} from 'validator/validity';
import {
  carray,
  InterfaceConstraint,
} from 'validator/constraint';
import { cstring } from '../string';


interface Foo {
  readonly array: string[];
}

test('maxLength', () => {
  const constraintFoo: InterfaceConstraint<Foo> = {
    array: carray<string>({
      maxLength: 3,
    }),
  };
  expect(constraintFoo.array(['a', 'b', 'c'], 'array')).toBeInstanceOf(Valid);
  expect(constraintFoo.array(['a', 'b', 'c', 'd'], 'array')).toBeInstanceOf(Invalid);
});

test('minLength', () => {
  const constraintFoo: InterfaceConstraint<Foo> = {
    array: carray<string>({
      minLength: 1,
    }),
  };
  expect(constraintFoo.array(['a'], 'array')).toBeInstanceOf(Valid);
  expect(constraintFoo.array([], 'array')).toBeInstanceOf(Invalid);
});

test('items', () => {
  const constraintFoo: InterfaceConstraint<Foo> = {
    array: carray({
      items: cstring({
        maxLength: 3,
      })
    }),
  };
  expect(constraintFoo.array(['a', 'ab', 'abc'], 'array')).toBeInstanceOf(Valid);
  expect(constraintFoo.array(['a', 'ab', 'abc', 'abcd'], 'array')).toBeInstanceOf(Invalid);
});
