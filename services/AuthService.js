import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';
import dotenv from 'dotenv';
import { sendResetEmail } from '../utils/sendResetEmail.js';
dotenv.config();

// SignUp
export const createUser = async (username, email, password, role) => {
    try {
        const userExists = await query("SELECT * FROM users WHERE email = $1", [email]);

        if (userExists.rows.length > 0) {
            console.log("User already exists");
            return { success: false, message: "User already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create JWT token
        const token = jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const result = await query(
            "INSERT INTO users (name, email, role, password) VALUES ($1, $2, $3, $4)",
            [username, email, role, hashedPassword] 
        );

        if (result.rowCount > 0) {
            console.log("User Created Successfully");
            return { success: true, token };
        } else {
            return { success: false, message: "Error creating user" };
        }

    } catch (error) {
        console.error("Error in createUser:", error);
        throw error;
    }
};


// Login
export const getUser = async (email, username, password) => {
  try {
    const userResult = await query(
      "SELECT * FROM users WHERE LOWER(email) = LOWER($1) OR name = $2",
      [email, username]
    );

    if (userResult.rows.length === 0) {
      return { success: false, message: "User not found" };
    }

    const user = userResult.rows[0];
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return { success: false, message: "Password incorrect" };
    }

    const jwtToken = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    delete user.token;

    return { success: true, user, token: jwtToken };
  } catch (error) {
    console.error("Error during user lookup:", error);
    throw error;
  }
};

// Forget-Password
export const Forget_password = async (email) => {
  const userExists = await query("SELECT email FROM users WHERE email = $1", [email]);

  if (userExists.rowCount === 0) {
    return { success: false, message: "Email not found" };
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });
  await sendResetEmail(email, token);

  return { success: true, message: "Reset email sent" };
};
