import express from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';

const router = express.Router();

router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    const update = await query("UPDATE users SET is_verified = true WHERE email = $1", [email]);

    if (update.rowCount > 0) {
      res.send("Email verified successfully!");
    } else {
      res.send("Verification failed.");
    }
  } catch (error) {
    res.status(400).send("Invalid or expired token.");
  }
});

export default router;
