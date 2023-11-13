import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { useRoqClient } from 'lib/roq';
import * as RoqTypes from 'lib/roq/types';

import { employeeDataValidationSchema } from 'validationSchema/employee-data';
import { UserInterface } from 'interfaces/user';
import { EmployeeDataInterface } from 'interfaces/employee-data';

function EmployeeDataCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const roqClient = useRoqClient();
  const handleSubmit = async (values: EmployeeDataInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await roqClient.employee_data.create({ data: values as RoqTypes.employee_data });
      resetForm();
      router.push('/employee-data');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<EmployeeDataInterface>({
    initialValues: {
      address: '',
      phone_number: '',
      date_of_birth: new Date(new Date().toDateString()),
      gender: '',
      position: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: employeeDataValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Employee Data',
              link: '/employee-data',
            },
            {
              label: 'Create Employee Data',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Employee Data
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.address}
            label={'Address'}
            props={{
              name: 'address',
              placeholder: 'Address',
              value: formik.values?.address,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.phone_number}
            label={'Phone Number'}
            props={{
              name: 'phone_number',
              placeholder: 'Phone Number',
              value: formik.values?.phone_number,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="date_of_birth" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date Of Birth
            </FormLabel>
            <DatePicker
              selected={formik.values?.date_of_birth ? new Date(formik.values?.date_of_birth) : null}
              onChange={(value: Date) => formik.setFieldValue('date_of_birth', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.gender}
            label={'Gender'}
            props={{
              name: 'gender',
              placeholder: 'Gender',
              value: formik.values?.gender,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.position}
            label={'Position'}
            props={{
              name: 'position',
              placeholder: 'Position',
              value: formik.values?.position,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={() => roqClient.user.findManyWithCount({})}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/employee-data')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'employee_data',
    operation: AccessOperationEnum.CREATE,
  }),
)(EmployeeDataCreatePage);
