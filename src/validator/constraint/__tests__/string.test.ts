import {
  Valid,
  Invalid,
} from 'validator/validity';
import {
  cstring,
  InterfaceConstraint,
} from 'validator/constraint';


interface Foo {
  readonly text: string;
}

test('maxLength', () => {
  const constraintFoo: InterfaceConstraint<Foo> = {
    text: cstring({
      maxLength: 5,
    }),
  };
  expect(constraintFoo.text('abcde', 'text')).toBeInstanceOf(Valid);
  expect(constraintFoo.text('abcdef', 'text')).toBeInstanceOf(Invalid);
});

test('minLength', () => {
  const constraintFoo: InterfaceConstraint<Foo> = {
    text: cstring({
      minLength: 1,
    }),
  };
  expect(constraintFoo.text('a', 'text')).toBeInstanceOf(Valid);
  expect(constraintFoo.text('', 'text')).toBeInstanceOf(Invalid);
});
