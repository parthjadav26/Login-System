import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  session: false
}), (req, res) => {
  res.send("Google Auth Successful");
});

export default router;
