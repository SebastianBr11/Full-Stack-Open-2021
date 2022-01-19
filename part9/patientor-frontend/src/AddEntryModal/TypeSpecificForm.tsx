import { Field, FormikHelpers } from 'formik';
import {
  HealthCheckRatingOption,
  SelectField,
  TextField,
} from '../AddPatientModal/FormField';
import { Entry, HealthCheckRating } from '../types';
import { assertNever } from '../utils';
import { EntryFormValues } from './AddEntryForm';

interface TypeSpecificFormProps {
  type: Entry['type'];
  setFieldValue: FormikHelpers<EntryFormValues>['setFieldValue'];
}

const TypeSpecificForm = ({ type, setFieldValue }: TypeSpecificFormProps) => {
  switch (type) {
    case 'HealthCheck':
      return <HealthCheckForm setFieldValue={setFieldValue} />;
    case 'Hospital':
      return <HospitalForm />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareForm />;
    default:
      assertNever(type);
  }
  return null;
};

export default TypeSpecificForm;

interface HealthCheckFormProps {
  setFieldValue: FormikHelpers<EntryFormValues>['setFieldValue'];
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low Risk' },
  { value: HealthCheckRating.HighRisk, label: 'High Risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical Risk' },
];

const HealthCheckForm = ({ setFieldValue }: HealthCheckFormProps) => {
  return (
    <SelectField
      label='Health Check Rating'
      name='healthCheckRating'
      asNumber={true}
      setFieldValue={setFieldValue}
      options={healthCheckRatingOptions}
    />
  );
};

const HospitalForm = () => {
  return (
    <>
      <Field
        label='Discharge Date'
        placeholder='YYYY-MM-DD'
        name='discharge.date'
        component={TextField}
      />
      <Field
        label='Discharge Criteria'
        placeholder='Discharge Criteria'
        name='discharge.criteria'
        component={TextField}
      />
    </>
  );
};

const OccupationalHealthcareForm = () => {
  return (
    <>
      <Field
        label='Employer Name'
        placeholder='Employer Name'
        name='employerName'
        component={TextField}
      />
      <Field
        label='Sick Leave Start Date'
        placeholder='YYYY-MM-DD'
        name='sickLeave.startDate'
        component={TextField}
      />
      <Field
        label='Sick Leave End Date'
        placeholder='YYYY-MM-DD'
        name='sickLeave.endDate'
        component={TextField}
      />
    </>
  );
};
