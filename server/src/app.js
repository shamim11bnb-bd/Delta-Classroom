import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { corsOptions } from './config/cors.js';
import { resources } from './services/resourceService.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import { resourceRouter } from './routes/resource.routes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-7', legacyHeaders: false, message: { success: false, error: 'অনেক বেশি অনুরোধ করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।' } }));

app.get('/', (_req, res) => res.json({ success: true, name: 'SA Delta Classroom API', status: 'ok', version: '1.0.0' }));
app.get('/health', (_req, res) => res.json({ success: true, status: 'healthy', timestamp: new Date().toISOString() }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
for (const key of Object.keys(resources)) app.use(`/api/${key}`, resourceRouter(key));
app.use(notFound);
app.use(errorHandler);

export default app;
