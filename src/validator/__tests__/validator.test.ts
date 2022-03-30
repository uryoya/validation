import {
  Valid,
  Invalid,
} from 'validator/validity';
import {
  InterfaceConstraint,
  cstring,
  cnumber,
  carray,
} from 'validator/constraint';
import {
  Validator,
} from 'validator/validator';

interface Foo {
  readonly text: string;
  readonly value: number;
  readonly array: number[];
}

test('validator', () => {
  const constraintFoo: InterfaceConstraint<Foo> = {
    text: cstring({
      minLength: 1,
      maxLength: 5,
    }),
    value: cnumber({
      min: 0,
      max: 1024,
    }),
    array: carray({
      minLength: 1,
      items: cnumber({
        max: 100,
      }),
    }),
  };

  const validFoo: Foo = {
    text: 'aaaa',
    value: 512,
    array: [-100],
  };
  const invalidFoo: Foo = {
    text: '123456',
    value: -1,
    array: [100, 101]
  };

  expect(new Validator(constraintFoo).validate(validFoo)).toBeInstanceOf(Valid);
  const actual = new Validator(constraintFoo).validate(invalidFoo);
  expect(actual).toBeInstanceOf(Invalid);
  expect((actual as Invalid).errors.length).toBe(3);
});
