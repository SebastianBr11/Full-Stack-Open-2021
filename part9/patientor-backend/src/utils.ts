import diagnoseService from './services/diagnoseService';
import {
	Diagnose,
	Entry,
	Gender,
	HealthCheckRating,
	HospitalEntry,
	NewEntry,
	NewPatient,
	OccupationalHealthcareEntry,
	UnionOmit,
	UnknownEntry,
	UnknownHospitalEntry,
	UnknownOccHealthcareEntry,
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
	if (!rest.type || !isString(rest.type) || !isEntryType(rest.type))
		throw new Error('Wrong entry type');
	const restProps = parseRest(rest);
	const newEntry: NewEntry = {
		date: parseDate(date),
		description: parseDescription(description),
		specialist: parseSpecialist(specialist),
		diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
		...restProps,
	};
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

const parseDiagnosisCodes = (
	diagnosisCodes?: unknown[]
): Array<Diagnose['code']> | undefined => {
	if (!diagnosisCodes) return diagnosisCodes;
	if (!Array.isArray(diagnosisCodes) || !areDiagnosisCodes(diagnosisCodes)) {
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
	if (
		!rest ||
		!isString(rest.type) ||
		!isEntryType(rest.type) ||
		!isRest(rest)
	) {
		throw new Error('Incorrect or missing specific parameters');
	}
	return rest;
};

const isRest = (rest: UnknownRest): rest is RestType => {
	switch (rest.type) {
		case 'HealthCheck':
			if (
				(!rest.healthCheckRating && rest.healthCheckRating !== 0) ||
				!isNumber(rest.healthCheckRating) ||
				!isHealthCheckRating(rest.healthCheckRating)
			) {
				console.log(rest.healthCheckRating);
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

			if (!isSickLeave(rest.sickLeave)) {
				throw new Error('Incorrect or missing sick leave');
			}
	}
	return true;
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

const areDiagnosisCodes = (
	codes: unknown[]
): codes is Array<Diagnose['code']> => {
	const possibleCodes = diagnoseService.getDiagnoses().map(d => d.code);
	return codes.every(code => isString(code) && possibleCodes.includes(code));
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
	return rating >= 0 && rating < 4;
};

const isDischarge = (
	discharge: UnknownHospitalEntry['discharge']
): discharge is HospitalEntry['discharge'] => {
	console.log(discharge);
	return !(
		!discharge ||
		!discharge.criteria ||
		!discharge.date ||
		!isString(discharge.criteria) ||
		!isString(discharge.date) ||
		!isDate(discharge.date)
	);
};

const isSickLeave = (
	sickLeave: UnknownOccHealthcareEntry['sickLeave']
): sickLeave is OccupationalHealthcareEntry['sickLeave'] => {
	return !(
		!sickLeave ||
		!sickLeave.startDate ||
		!sickLeave.endDate ||
		!isString(sickLeave.startDate) ||
		!isString(sickLeave.endDate) ||
		!isDate(sickLeave.startDate) ||
		!isDate(sickLeave.endDate)
	);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
