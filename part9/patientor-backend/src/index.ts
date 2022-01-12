import express from 'express';
import diagnosesRouter from './routes/diagnoses';
const app = express();

app.get('/api/ping', (_req, res) => {
	res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});
