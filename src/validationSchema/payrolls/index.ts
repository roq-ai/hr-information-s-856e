import * as yup from 'yup';

export const payrollValidationSchema = yup.object().shape({
  salary: yup.number().integer().nullable(),
  bonus: yup.number().integer().nullable(),
  deduction: yup.number().integer().nullable(),
  net_salary: yup.number().integer().nullable(),
  payment_date: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
});
