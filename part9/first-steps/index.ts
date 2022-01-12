import express from 'express';
import { calculateBmi } from './src/bmiCalculator';
import { calculateExercises } from './src/exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => res.send('Hello Full Stack!'));

app.get('/bmi', (req, res) => {
	const { height: heightVal, weight: weightVal } = req.query;
	const height = Number(heightVal);
	const weight = Number(weightVal);

	if (!isNaN(height) && !isNaN(weight)) {
		try {
			const bmi = calculateBmi(height, weight);
			return res.json({ weight, height, bmi });
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	}

	return res.status(400).json({ error: 'malformatted parameters' });
});

app.post('/exercises', (req, res) => {
	const { daily_exercises, target } = req.body;

	if (!daily_exercises || !target) {
		return res.status(400).json({ error: 'parameters missing' });
	}

	if (
		!Array.isArray(daily_exercises) ||
		typeof target !== 'number' ||
		daily_exercises.some(day => typeof day !== 'number')
	) {
		return res.status(400).json({ error: 'malformatted parameters' });
	}

	const result = calculateExercises(daily_exercises, target);

	return res.status(200).json({ ...result });
});

const PORT = 3002;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
