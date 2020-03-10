import {Button, DateInput, TextInput, TimeInput} from '@ui';
import {FormikProps, withFormik} from 'formik';
import React from 'react';
import {HelperText} from 'react-native-paper';
import styled from 'styled-components/native';
import * as Yup from 'yup';

const EventSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  date: Yup.string().required('Required'),
  time: Yup.string(),
});

interface FormValueProps {
  title: string;
  date: string;
  time: string;
}

type SubmitProps = FormValueProps;

interface EventFormProps {
  onSubmit: (values: SubmitProps) => void;
}

const InnerEventForm = (
  props: EventFormProps & FormikProps<FormValueProps>,
) => {
  const {
    values,
    handleChange,
    handleSubmit,
    touched,
    errors,
    handleBlur,
  } = props;

  return (
    <>
      <TextInput
        placeholder="Title"
        onChangeText={handleChange('title')}
        value={values.title}
        onBlur={handleBlur('title')}
        error={touched.title && errors.title}
        touched={touched.title}
        errors={errors}
      />
      {touched.title && errors.title && (
        <HelperText type="error">{errors.title}</HelperText>
      )}

      <DateInput
        placeholder="Date"
        onChangeText={handleChange('date')}
        value={values.date}
        onBlur={handleBlur('date')}
        error={touched.date && errors.date}
      />
      {touched.date && errors.date && (
        <HelperText type="error">{errors.date}</HelperText>
      )}

      <TimeInput
        placeholder="All Day"
        onChangeText={handleChange('time')}
        value={values.time}
        onBlur={handleBlur('time')}
        error={touched.time && errors.time}
      />
      {touched.time && errors.time && (
        <HelperText type="error">{errors.time}</HelperText>
      )}

      <StartButton mode="contained" onPress={handleSubmit}>
        Start
      </StartButton>
    </>
  );
};

const initialValues: FormValueProps = {
  title: '',
  date: '',
  time: '',
};
const EventForm = withFormik<EventFormProps, FormValueProps>({
  mapPropsToValues: () => initialValues,
  handleSubmit: (values: FormValueProps, {props}) => {
    const {onSubmit} = props;
    onSubmit(values);
  },
  validationSchema: EventSchema,
})(InnerEventForm);

const StartButton = styled(Button)`
  margin: 12px 0px 0px 0px;
`;

export default EventForm;
