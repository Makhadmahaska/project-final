import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs';
import cors from 'cors';
import feedbackRoutes from './routes/feedbackRoutes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(
  cors({
    origin: true,
  }),
);
app.use(express.json());

// Routes
app.use('/api/feedback', feedbackRoutes);

const STATIC_DIR = 'static';
if (fs.existsSync(STATIC_DIR)) {
  app.use('/', express.static(STATIC_DIR));
}

app.use((req: Request, res: Response) => {
  res.status(404).type('text').send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
