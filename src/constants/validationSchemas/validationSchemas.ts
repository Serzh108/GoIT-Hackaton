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
    .max(32, REGEXP.password.mes.mismatchMoreSymbols),
  // .matches(REGEXP.password.reg, REGEXP.password.mes.mismatch),
});

// type Role = "admin" | "editor";

export const RegisterFormSchema = yup.object({
  name: yup.string().required("Ім'я обов’язковє").max(64),
  role: yup
    .string()
    // .mixed<Role>()
    // .oneOf(["admin", "editor"])
    .required('Роль обов’язкова'),
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
    .max(128, REGEXP.password.mes.mismatchMoreSymbols),
  // .matches(REGEXP.password.reg, REGEXP.password.mes.mismatch),
});

export const updateMerchFormSchema = yup.object({
  status: yup.string().required(),
  content: yup.string().max(12).required('Обов’язкове поле'),
  link: yup.string().max(512).required('Обов’язкове поле'),
  locale: yup.string().required(),
});

export const reportFormSchema = yup.object({
  year: yup.string().min(4).max(4).required('Обов’язкове поле'),
  month: yup.string().max(16).required('Обов’язкове поле'),
  url: yup.string().required('Обов’язкове поле'),
  language: yup.string().required(),
});

export const partnerFormSchema = yup.object({
  image: yup.string().required('Обов’язкове поле'),
  logo: yup.string().max(16).required('Обов’язкове поле'),
  link: yup.string().required('Обов’язкове поле'),
  language: yup.string().required(),
});

// export const donationFormSchema = yup.object({
//   image: yup.mixed<FileList>().nullable(),
//   alt: yup.string().max(24).required('Alt текст обов’язковий'),
//   title: yup.string().max(48).required('Заголовок обов’язковий'),
//   desc: yup.string().max(144).required('Опис обов’язковий'),
//   collected: yup
//     .string()
//     .min(0)
//     .required('Зібрана сума обов’язкова')
//     .matches(/^\d+$/, 'Має бути числом'),
//   target: yup
//     .string()
//     .min(0)
//     .required('Цільова сума обов’язкова')
//     .matches(/^\d+$/, 'Має бути числом'),
//   peopleDonate: yup
//     .string()
//     .min(0)
//     .required('Кількість донорів обов’язкова')
//     .matches(/^\d+$/, 'Має бути числом'),
//   peopleDonate_title: yup.string().required('Оберіть текст для донорів'),

//   days: yup.string().min(0).matches(/^\d+$/, 'Має бути числом'),
//   quantity: yup.string().min(0).matches(/^\d+$/, 'Має бути числом'),

//   period: yup.string().required('Оберіть період'),
//   status: yup.string().required('Оберіть статус'),
//   value: yup.string().max(48).required('Тег збору обов’язковий'),
//   importance: yup.string().required('Оберіть важливість'),

//   long_desc: yup
//     .array()
//     .of(
//       yup.object({
//         text: yup.string().required('Це поле обовʼязкове'),
//       })
//     )
//     .min(1, 'Мінімум один абзац')
//     .required('Детальний опис обовʼязковий'),
// });
