interface CoursePartBase {
	name: string;
	exerciseCount: number;
	type: string;
}

interface CourseDescriptiveBase extends CoursePartBase {
	description: string;
}

interface CourseNormalPart extends CourseDescriptiveBase {
	type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
	type: 'groupProject';
	groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptiveBase {
	type: 'submission';
	exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescriptiveBase {
	type: 'special';
	requirements: string[];
}

export type CoursePart =
	| CourseNormalPart
	| CourseProjectPart
	| CourseSubmissionPart
	| CourseSpecialPart;
