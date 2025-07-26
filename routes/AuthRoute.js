import express from 'express';
import { userRegister ,loginUser,HandleForget} from '../controllers/AuthController.js';

const router = express.Router();

router.post("/signup",userRegister);
router.post("/login", loginUser);
router.post("/reset-password", HandleForget);

export default router;
