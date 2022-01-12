type ParseArgsEx = (args: Array<string>) => {
	dailyHours: number[];
	dayTarget: number;
};

const parseArgumentsEx: ParseArgsEx = args => {
	if (args.length < 4) throw new Error('Not enough arguments');
	const dailyHours = args.slice(3);

	if (
		!isNaN(Number(args.at(2))) &&
		dailyHours.every(day => !isNaN(Number(day)))
	) {
		return {
			dailyHours: dailyHours.map(day => Number(day)),
			dayTarget: Number(args.at(2)),
		};
	}

	throw new Error('Provided values were not numbers!');
};

interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}
type CalcExercises = (dailyHours: number[], dayTarget: number) => Result;

type GetRating = (average: number, dayTarget: number) => number;
type GetRatingDesc = (rating: number) => string;

const calculateExercises: CalcExercises = (dailyHours, dayTarget) => {
	const periodLength = dailyHours.length;
	const trainingDays = dailyHours.filter(day => day !== 0).length;
	const success = dailyHours.every(day => day >= dayTarget);
	const average =
		dailyHours.reduce((acc, val) => acc + val, 0) / dailyHours.length;
	const rating = getRating(average, dayTarget);
	const ratingDescription = getRatingDescription(rating);

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target: dayTarget,
		average,
	};
};

const getRating: GetRating = (average, dayTarget) => {
	const percentage = average / dayTarget;
	if (percentage >= 1) {
		return 3;
	} else if (percentage > 0.75) {
		return 2;
	}
	return 1;
};

const getRatingDescription: GetRatingDesc = rating => {
	switch (rating) {
		case 3:
			return 'Very well done';
		case 2:
			return 'not too bad but could be better';
		case 1:
			return 'not very good';
		default:
			return 'invalid rating';
	}
};

try {
	const { dailyHours, dayTarget } = parseArgumentsEx(process.argv);
	console.log(calculateExercises(dailyHours, dayTarget));
} catch (error) {
	if (error instanceof Error) {
		console.log(error.message);
	}
}
