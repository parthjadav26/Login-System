import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}`, role: req.user.role });
});

export default router;
