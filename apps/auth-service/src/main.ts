import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { errorMiddleware } from '../../../packages/error-handler/error-middleware';

const app = express();

// Middleware to handle CORS
app.use(
	cors({
		origin: '[http://localhost:3000]',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true
	})
);

// Express Middleware
app.use(express.json());
// Cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
	res.send({ message: 'Hello API :)' });
});

app.use(errorMiddleware);

const port = process.env.PORT || 6001;

const server = app.listen(port, () => {
	console.log(`Auth service is running at http://localhost:${port}/api`);
});

server.on('error', err => {
	console.log('Server Error:', err);
});
