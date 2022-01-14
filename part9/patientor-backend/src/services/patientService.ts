import patients from '../../data/patients';
import { PatientNoSSN } from '../types';

const getPatients = () => patients;

const getPatientsNoSSN = (): PatientNoSSN[] =>
	patients.map(p => ({ ...p, ssn: undefined }));

export default {
	getPatients,
	getPatientsNoSSN,
};
