import express from 'express';
import { calculateBmi } from './src/bmiCalculator';
const app = express();

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

const PORT = 3002;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
