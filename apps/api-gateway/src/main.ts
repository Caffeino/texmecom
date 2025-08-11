import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request } from 'express';
import proxy from 'express-http-proxy';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import morgan from 'morgan';

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

// Request logger middleware
app.use(morgan('dev'));
// Express Middleware
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
// Cookie parser middleware
app.use(cookieParser());
app.set('trust proxy', 1);

// Apply rate limiting middleware
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000, // 15min
		// Logged users: 500. The IP rest only 100 req. per window: 15min
		limit: (req: any) => (req.user ? 500 : 100),
		message: { error: 'too many requests, please try again later!' },
		standardHeaders: true,
		legacyHeaders: true,
		keyGenerator: (req: Request) => ipKeyGenerator(req.ip ? req.ip : '')
	})
);

app.get('/gateway-health', (req, res) => {
	res.send({ message: 'Welcome to api-gateway!' });
});

app.use('/', proxy('http://localhost:6001'));

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
