export interface Diagnose {
	code: string;
	name: string;
	latin?: string;
}

export interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnose['code']>;
}

export interface UnknownBaseEntry {
	// type: unknown;
	description: unknown;
	date: unknown;
	specialist: unknown;
	diagnosisCodes?: unknown;
}

export interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: {
		date: string;
		criteria: string;
	};
}

export interface UnknownHospitalEntry extends UnknownBaseEntry {
	type: 'Hospital';
	discharge: {
		date: unknown;
		criteria: unknown;
	};
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

interface UnknownOccHealthcareEntry extends UnknownBaseEntry {
	type: 'OccupationalHealthcare';
	employerName: unknown;
	sickLeave?: {
		startDate: unknown;
		endDate: unknown;
	};
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

interface UnknownHealthCheckEntry extends UnknownBaseEntry {
	type: 'HealthCheck';
	healthCheckRating: unknown;
}

export type Entry =
	| HealthCheckEntry
	| HospitalEntry
	| OccupationalHealthcareEntry;

export type UnknownEntry =
	| UnknownHospitalEntry
	| UnknownHealthCheckEntry
	| UnknownOccHealthcareEntry;

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Entry[];
}

export type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;

export type NewEntry = UnionOmit<Entry, 'id'>;

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}
