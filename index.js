import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import passport from 'passport';
import './passport.js';

import loginRoutes from './routes/AuthRoute.js'
import signupRoutes from './routes/AuthRoute.js'
import Forget_passwordRoutes from './routes/AuthRoute.js'
import protectedRoutes from './routes/protected.js';
import googleAuthRoutes from './routes/googleAuth.js';
import verifyEmailRoutes from './routes/verifyEmail.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', googleAuthRoutes);
app.use('/api', verifyEmailRoutes);
app.use('/api', loginRoutes);
app.use('/api', signupRoutes);
app.use('/api', Forget_passwordRoutes);
app.use('/api', protectedRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
