import { errorMiddleware } from '@packages/error-handler/error-middleware';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import router from './routes/auth.router';

const swaggerDocument = require('./swagger-output.json');

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

// API Documentation - Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.get('/doc-json', (req, res) => {
	res.json(swaggerDocument);
});

// Routes
app.use('/api/auth', router);

app.use(errorMiddleware);

const port = process.env.PORT || 6001;

const server = app.listen(port, () => {
	console.log(`Auth service is running at http://localhost:${port}/api`);
	console.log(`Swagger Docs available at http://localhost:${port}/docs`);
});

server.on('error', err => {
	console.log('Server Error:', err);
});
