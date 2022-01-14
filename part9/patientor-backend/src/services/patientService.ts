import { v4 as uuid } from 'uuid';
import patients from '../../data/patients';
import { NewPatient, Patient, PublicPatient } from '../types';

const getPatients = () => patients;

const getPatientsNoSSN = (): PublicPatient[] =>
	patients.map(p => ({ ...p, ssn: undefined }));

const findById = (id: string): Patient | undefined => {
	const patient = patients.find(p => p.id === id);
	return patient;
};

const addPatient = (patient: NewPatient): Patient => {
	const newPatient: Patient = {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		id: uuid(),
		...patient,
	};
	patients.push(newPatient);
	return newPatient;
};

export default {
	getPatients,
	getPatientsNoSSN,
	findById,
	addPatient,
};
