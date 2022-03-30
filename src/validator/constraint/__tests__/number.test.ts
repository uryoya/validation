import {
  Valid,
  Invalid,
} from 'validator/validity';
import {
  cnumber,
  InterfaceConstraint,
} from 'validator/constraint';


interface Foo {
  readonly value: number;
}

test('maxLength', () => {
  const constraintFoo: InterfaceConstraint<Foo> = {
    value: cnumber({
      max: 5,
    }),
  };
  expect(constraintFoo.value(5, 'value')).toBeInstanceOf(Valid);
  expect(constraintFoo.value(4.9999, 'value')).toBeInstanceOf(Valid);
  expect(constraintFoo.value(5.0001, 'value')).toBeInstanceOf(Invalid);
  expect(constraintFoo.value(6, 'value')).toBeInstanceOf(Invalid);
});

test('minLength', () => {
  const constraintFoo: InterfaceConstraint<Foo> = {
    value: cnumber({
      min: 1,
    }),
  };
  expect(constraintFoo.value(1, 'value')).toBeInstanceOf(Valid);
  expect(constraintFoo.value(1.0001, 'value')).toBeInstanceOf(Valid);
  expect(constraintFoo.value(0.9999, 'value')).toBeInstanceOf(Invalid);
  expect(constraintFoo.value(0, 'value')).toBeInstanceOf(Invalid);
});
