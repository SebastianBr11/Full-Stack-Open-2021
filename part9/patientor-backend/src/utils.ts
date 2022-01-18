import diagnoseService from './services/diagnoseService';
import {
	Diagnose,
	Entry,
	Gender,
	HealthCheckRating,
	HospitalEntry,
	NewEntry,
	NewPatient,
	UnionOmit,
	UnknownEntry,
	UnknownHospitalEntry,
} from './types';

type Fields = {
	name: unknown;
	dateOfBirth: unknown;
	ssn: unknown;
	gender: unknown;
	occupation: unknown;
	entries: Array<{
		type: unknown;
	}>;
};

const toNewPatient = ({
	name,
	dateOfBirth,
	ssn,
	gender,
	occupation,
	entries,
}: Fields): NewPatient => {
	const newPatient: NewPatient = {
		name: parseName(name),
		dateOfBirth: parseDate(dateOfBirth),
		ssn: parseSSN(ssn),
		gender: parseGender(gender),
		occupation: parseOccupation(occupation),
		entries: parseEntries(entries),
	};
	return newPatient;
};

export const toNewEntry = ({
	date,
	description,
	specialist,
	diagnosisCodes,
	...rest
}: UnknownEntry): NewEntry => {
	const restProps = parseRest(rest);
	const newEntry: NewEntry = {
		date: parseDate(date),
		description: parseDescription(description),
		specialist: parseSpecialist(specialist),
		type: parseType(rest.type),
		diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
	};

	switch (newEntry.type) {
		case 'HealthCheck':
			newEntry.healthCheckRating = parseHealthCheckRating(
				rest.healthCheckRating
			);
			break;
		case 'Hospital':
			newEntry.discharge;
			break;
		case 'OccupationalHealthcare':
			newEntry.employerName = parseEmployerName(rest.employerName);
			newEntry.sickLeave;
		default:
			assertNever(newEntry);
	}
	return newEntry;
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect or missing name');
	}
	return name;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}
	return date;
};

const parseSSN = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error('Incorrect or missing ssn');
	}
	return ssn;
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender);
	}
	return gender;
};

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error('Incorrect or missing occupation');
	}
	return occupation;
};

const parseDescription = (description: unknown): string => {
	if (!description || !isString(description)) {
		throw new Error('Incorrect or missing description');
	}
	return description;
};

const parseSpecialist = (specialist: unknown): string => {
	if (!specialist || !isString(specialist)) {
		throw new Error('Incorrect or missing specialist');
	}
	return specialist;
};

const parseType = (type: unknown): Entry['type'] => {
	if (!type || !isString(type) || !isEntryType(type)) {
		throw new Error('Incorrect or missing type');
	}
	return type;
};

const parseDiagnosisCodes = (
	diagnosisCodes: unknown
): Array<Diagnose['code']> => {
	if (
		!diagnosisCodes ||
		!Array.isArray(diagnosisCodes) ||
		diagnosisCodes.some(d => !isDiagnosisCode(d))
	) {
		throw new Error('Incorrect or missing diagnosis codes');
	}
	return diagnosisCodes;
};

type UnknownRest = UnionOmit<
	UnknownEntry,
	'description' | 'date' | 'specialist' | 'diagnosisCodes' | 'id'
>;
type RestType = UnionOmit<
	Entry,
	'description' | 'date' | 'specialist' | 'diagnosisCodes' | 'id'
>;

const parseRest = (rest: UnknownRest): RestType => {
	if (!rest || !isString(rest.type) || !isEntryType(rest.type)) {
		throw new Error('Incorrect or missing specific parameters');
	}

	const newRest = {};

	switch (rest.type) {
		case 'HealthCheck':
			if (
				!rest.healthCheckRating ||
				!isNumber(rest.healthCheckRating) ||
				!isHealthCheckRating(rest.healthCheckRating)
			) {
				throw new Error('Incorrect or missing health check rating');
			}
			break;
		case 'Hospital':
			if (!isDischarge(rest.discharge)) {
				throw new Error('Incorrect or missing discharge data');
			}
			break;
		case 'OccupationalHealthcare':
			if (!rest.employerName || !isString(rest.employerName)) {
				throw new Error('Incorrect or missing employer name');
			}
	}

	return rest;
};

export const parseEntries = (entries: Fields['entries']): Entry[] => {
	const areCorrect = entries.every(entry => {
		if (!entry) return false;

		switch (entry.type) {
			case 'Hospital':
			case 'OccupationalHealthcare':
			case 'HealthCheck':
				return true;
		}
		return false;
	});
	if (!areCorrect) {
		throw new Error('Incorrect or missing entry details');
	}
	return entries as Entry[];
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
	return (
		typeof num === 'number' || num instanceof Number || !isNaN(Number(num))
	);
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isEntryType = (type: string): type is Entry['type'] => {
	return (
		type === 'Hospital' ||
		type === 'HealthCheck' ||
		type === 'OccupationalHealthcare'
	);
};

const isDiagnosisCode = (code: string): code is Diagnose['code'] => {
	return diagnoseService
		.getDiagnoses()
		.map(d => d.code)
		.includes(code);
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
	return rating >= 0 && rating < 4;
};

const isDischarge = (
	discharge: UnknownHospitalEntry['discharge']
): discharge is HospitalEntry['discharge'] => {
	return (
		!discharge ||
		!discharge.criteria ||
		!discharge.date ||
		!isString(discharge.criteria) ||
		!isString(discharge.date) ||
		!isDate(discharge?.date)
	);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
	return Object.values(Gender).includes(param);
};

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

export default toNewPatient;
