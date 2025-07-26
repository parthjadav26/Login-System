import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { query } from './db.js';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const name = profile.displayName;

      const userResult = await query("SELECT * FROM users WHERE email = $1", [email]);

      if (userResult.rows.length === 0) {
        await query(
          "INSERT INTO users (name, email, role, password, is_verified) VALUES ($1, $2, $3, $4, $5)",
          [name, email, 'user', '', true]
        );
      }

      return done(null, profile);
    } catch (err) {
      return done(err, null);
    }
  }
));

// Session support (optional)
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
