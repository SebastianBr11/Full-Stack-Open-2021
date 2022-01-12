type BmiCalc = (height: number, weight: number) => string;

type ParseArgsBMI = (args: Array<string>) => { height: number; weight: number };

const parseArgumentsBMI: ParseArgsBMI = args => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3]),
		};
	}

	throw new Error('Provided values were not numbers!');
};

const calculateBmi: BmiCalc = (height, weight) => {
	const bmi = weight / (height / 100) ** 2;
	if (bmi < 18.5) {
		return 'Underweight';
	} else if (bmi < 25) {
		return 'Normal (healthy weight)';
	} else if (bmi < 30) {
		return 'Overweight';
	}
	return 'Obese';
};

try {
	const { height, weight } = parseArgumentsBMI(process.argv);
	console.log(calculateBmi(height, weight));
} catch (error: unknown) {
	if (error instanceof Error) {
		console.log(error.message);
	}
}
