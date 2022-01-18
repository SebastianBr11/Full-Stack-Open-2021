import { State } from './state';
import { AddPatient, Diagnosis, Patient } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'UPDATE_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSE_LIST';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_ENTRY';
      payload: AddPatient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSE_LIST':
      return {
        ...state,
        diagnoses: {
          ...state.diagnoses,
          ...action.payload.reduce(
            (acc, diagnose) => ({ ...acc, [diagnose.code]: diagnose }),
            {}
          ),
        },
      };
    case 'ADD_ENTRY':
      const patient = state.patients[action.payload.patientId];
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patientId]: {
            ...patient,
            entries: [...patient.entries, action.payload.entry],
          },
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload,
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload,
  };
};

export const updatePatient = (payload: Patient): Action => {
  return {
    type: 'UPDATE_PATIENT',
    payload,
  };
};

export const setDiagnoseList = (payload: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSE_LIST',
    payload,
  };
};

export const addEntry = (payload: AddPatient): Action => {
  return {
    type: 'ADD_ENTRY',
    payload,
  };
};
