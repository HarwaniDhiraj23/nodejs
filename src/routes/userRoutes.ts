// ************** use if user use row query ************************
// import express from 'express';
// import { addUser, deleteUserById, getUsers, loginUser, updateUserById } from '../controller/userController';
// import { validateRequest } from '../middlewares/validateRequest';
// import { createUserSchema, getUserByIdSchema, loginSchema, updateUserSchema } from '../validators/user.validator';
// import { authenticate } from '../middlewares/authentication';
//
// const router = express.Router();
//
// router.post("/logIn", validateRequest({ body: loginSchema }), loginUser)
// router.get('/getUsers', authenticate, getUsers);
// router.post('/addUser', authenticate, validateRequest({ body: createUserSchema }), addUser)
// router.delete('/deleteUser/:id', authenticate, authenticate, validateRequest({ params: getUserByIdSchema }), deleteUserById)
// router.put('/updateUser/:id', authenticate, validateRequest({ params: getUserByIdSchema, body: updateUserSchema }), updateUserById)
//
// export default router;
//*****************************************************************************


import express from 'express';
import { loginUser, register, verifyUser } from '../controller/userController';
import { validateRequest } from '../middlewares/validateRequest';
import { createUserSchema, loginSchema, verifyOtpSchema } from '../validators/user.validator';
import rateLimit from 'express-rate-limit';

const router = express.Router();
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Only allow 5 login attempts per IP
    message: 'Too many login attempts, please try again after 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
});

router.post('/register', validateRequest({ body: createUserSchema }), register);
router.post('/verifyOtp', validateRequest({ body: verifyOtpSchema }), verifyUser);
router.post('/login', loginLimiter, validateRequest({ body: loginSchema }), loginUser)

export default router;