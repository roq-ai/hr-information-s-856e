import * as yup from 'yup';

export const attendanceValidationSchema = yup.object().shape({
  date: yup.date().nullable(),
  check_in: yup.date().nullable(),
  check_out: yup.date().nullable(),
  total_hours: yup.number().integer().nullable(),
  status: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
