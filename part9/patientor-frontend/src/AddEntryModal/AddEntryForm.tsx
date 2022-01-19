import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form, FormikHelpers } from 'formik';

import {
  TextField,
  DiagnosisSelection,
  SelectField,
  EntryTypeOption,
} from '../AddPatientModal/FormField';
import { Entry, HealthCheckRating, UnionOmit } from '../types';
import { useStateValue } from '../state';
import TypeSpecificForm from './TypeSpecificForm';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = UnionOmit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        description: '',
        date: '',
        specialist: '',
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        switch (values.type) {
          case 'HealthCheck':
            console.log(typeof values.healthCheckRating);
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className='form ui'>
            <TypeSelectionForm setFieldValue={setFieldValue} />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            <TypeSpecificForm
              type={values.type}
              setFieldValue={setFieldValue}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;

const entryTypeOptions: EntryTypeOption[] = [
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
];

interface TypeSelectionForm {
  setFieldValue: FormikHelpers<EntryFormValues>['setFieldValue'];
}

const TypeSelectionForm = ({ setFieldValue }: TypeSelectionForm) => {
  return (
    <SelectField
      setFieldValue={setFieldValue}
      label='Entry Type'
      name='type'
      options={entryTypeOptions}
    />
  );
};
