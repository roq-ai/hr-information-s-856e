import * as yup from 'yup';

export const employeeDataValidationSchema = yup.object().shape({
  address: yup.string().nullable(),
  phone_number: yup.string().nullable(),
  date_of_birth: yup.date().nullable(),
  gender: yup.string().nullable(),
  position: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
