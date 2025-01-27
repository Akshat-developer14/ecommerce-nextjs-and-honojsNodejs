import { Hono } from 'hono';
import { logoutController, userAccountDetailsController, userLoginWithEmailController, userRegistrationController, verifyUserEmailController } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/auth.js';

const userRoute = new Hono();

userRoute.post('/register', userRegistrationController);

userRoute.post('/verify-user/:id', verifyUserEmailController);

userRoute.post('/login', userLoginWithEmailController);

userRoute.get('/get-user-account-details', isAuthenticated, userAccountDetailsController);

userRoute.get('/logout', logoutController)



export default userRoute;
