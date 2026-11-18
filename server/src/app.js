import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { corsOptions } from './config/cors.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();

app.set('trust proxy', 1); // Render sits behind a proxy; needed for correct client IPs / rate limiting
app.disable('x-powered-by');

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' }));
app.use('/api', apiLimiter);

app.get('/api/health', (req, res) => res.json({ success: true, status: 'ok' }));
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
