import * as yup from 'yup';
import { REGEXP } from '../regexp';

export const logInFormSchema = yup.object({
  email: yup
    .string()
    .required(REGEXP.email.mes.required)
    .test('email', value => {
      if (!value.includes('@'))
        throw new yup.ValidationError(
          REGEXP.email.mes.mismatchSymbol,
          value,
          'email'
        );
      return true;
    })
    .matches(REGEXP.email.reg, REGEXP.email.mes.mismatch),
  password: yup
    .string()
    .required(REGEXP.password.mes.required)
    .min(8, REGEXP.password.mes.mismatchLessSymbols)
    .max(32, REGEXP.password.mes.mismatchMoreSymbols)
    // .matches(REGEXP.password.reg, REGEXP.password.mes.mismatch),
});

// type Role = "admin" | "editor";

export const RegisterFormSchema = yup.object({
  name: yup
    .string()
    .required("Ім'я обов’язковє")
    .max(64),
  role: yup
    .string()
    // .mixed<Role>()
    // .oneOf(["admin", "editor"])
    .required("Роль обов’язкова"),    
  email: yup
    .string()
    .required(REGEXP.email.mes.required)
    .test('email', value => {
      if (!value.includes('@'))
        throw new yup.ValidationError(
          REGEXP.email.mes.mismatchSymbol,
          value,
          'email'
        );
      return true;
    })
    .matches(REGEXP.email.reg, REGEXP.email.mes.mismatch),
  password: yup
    .string()
    .required(REGEXP.password.mes.required)
    .min(8, REGEXP.password.mes.mismatchLessSymbols)
    .max(128, REGEXP.password.mes.mismatchMoreSymbols)
    // .matches(REGEXP.password.reg, REGEXP.password.mes.mismatch),
});