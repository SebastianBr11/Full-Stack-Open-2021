import { CoursePart } from '../types';

interface TotalProps {
	courseParts: CoursePart[];
}

const Total = ({ courseParts }: TotalProps) => {
	return (
		<p>
			Number of exercises{' '}
			{courseParts.reduce((acc, part) => acc + part.exerciseCount, 0)}
		</p>
	);
};

export default Total;
