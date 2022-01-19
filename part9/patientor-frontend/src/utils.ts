import { Entry, UnionOmit } from './types';

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const sanitizeEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  ...rest
}: UnionOmit<Entry, 'id'>): UnionOmit<Entry, 'id'> => {
  switch (rest.type) {
    case 'HealthCheck':
      return {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: rest.type,
        healthCheckRating: rest.healthCheckRating,
      };
    case 'Hospital':
      return {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: rest.type,
        discharge: {
          date: rest.discharge.date,
          criteria: rest.discharge.criteria,
        },
      };
    case 'OccupationalHealthcare':
      return {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: rest.type,
        employerName: rest.employerName,
        sickLeave: rest.sickLeave
          ? {
              startDate: rest.sickLeave.startDate,
              endDate: rest.sickLeave.endDate,
            }
          : undefined,
      };
  }
};
