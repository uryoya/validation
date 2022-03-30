import {
  InterfaceConstraint,
  cstring,
  cnumber,
  carray,
} from 'validator/constraint';
import {
  Validator,
} from 'validator/validator';

// バリデーション対象のinterfaceを定義
interface User {
  name: string;
  age: number;
  // profile?: string; // nullableは未サポート
  favoriteFoods: string[];
}

// バリデーションを定義
const userConstraint: InterfaceConstraint<User> = {
  name: cstring({
    minLength: 1,
    maxLength: 50,
  }),
  age: cnumber({
    min: 10,
  }),
  favoriteFoods: carray({
    minLength: 1,
    items: cstring({
      minLength: 1,
      maxLength: 50,
    }),
  })
};
const userValidator = new Validator(userConstraint);

// バリデーションが通る場合
const result1 = userValidator.validate({
  name: '太郎',
  age: 25,
  favoriteFoods: ['寿司', 'ラーメン'],
});
console.log(result1);

// バリデーションが通らない場合
const result2 = userValidator.validate({
  name: '寿限無寿限無五劫の擦り切れ海砂利水魚の水行末・雲来末・風来末喰う寝る処に住む処藪ら柑子の藪柑子パイポ・パイポ・パイポのシューリンガンシューリンガンのグーリンダイグーリンダイのポンポコピーのポンポコナの長久命の長助',
  age: 0,
  favoriteFoods: [],
 });
console.log(result2);
