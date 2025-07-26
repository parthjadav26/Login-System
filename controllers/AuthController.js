import { createUser,getUser,Forget_password } from "../services/AuthService.js";

// SignUp
export const userRegister = async (req, res) => {
  try {
    const { username, email, password ,confirmPassword,role} = req.body;
    console.log(req.body);
    if (!username || !email || !password || !confirmPassword || !role) {
      return res.status(400).send('All fields are required.');
    } if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match.');
    }
    const user = await createUser(username, email, password,role);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Login

export const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await getUser(email, username, password);

    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Forget-Password

export const HandleForget = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const result = await Forget_password(email, password);

        if (result.success) {
            res.status(200).json({ message: "Password reset successfully" });
        } else {
            res.status(404).json({ error: result.message || "User not found" });
        }

    } catch (error) {
        console.error("Error in HandleForget:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
