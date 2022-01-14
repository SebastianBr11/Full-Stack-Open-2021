import { CoursePart } from '../types';
import { assertNever } from '../utils';

interface PartProps {
	part: CoursePart;
}

const Part = ({ part }: PartProps) => {
	switch (part.type) {
		case 'normal':
			return (
				<PartBase part={part}>
					<i>{part.description}</i>
				</PartBase>
			);
		case 'groupProject':
			return (
				<PartBase part={part}>
					project exercises {part.groupProjectCount}
				</PartBase>
			);
		case 'submission':
			return (
				<PartBase part={part}>
					<i>{part.description}</i> <br /> submit to{' '}
					{part.exerciseSubmissionLink}
				</PartBase>
			);
		case 'special':
			return (
				<PartBase part={part}>
					<i>{part.description}</i>
					<br />
					required skills: {part.requirements.join(', ')}
				</PartBase>
			);
		default:
			return assertNever(part);
	}
};

interface PartBaseProps {
	children?: React.ReactNode;
	part: CoursePart;
}

const PartBase = ({ part, children }: PartBaseProps) => (
	<div>
		<p>
			<b>
				{part.name} {part.exerciseCount}
			</b>
			<br />
			{children}
		</p>
	</div>
);

export default Part;
