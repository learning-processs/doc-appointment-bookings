import express from 'express';
import { bookAppointment, cancelAppointment, getProfile, listAppointment, loginUser, paymentRazorPay, registerUser, updateProfile, verifyRazorpay } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login',loginUser);
userRoute.get('/get-profile',authUser ,getProfile);
userRoute.post('/update-profile',authUser,upload.single('image') ,updateProfile);
userRoute.post('/book-appointment',authUser ,bookAppointment);
userRoute.get('/appointments',authUser ,listAppointment);
userRoute.post('/cancel-appointment',authUser ,cancelAppointment);
userRoute.post('/payment-razorpay',authUser ,paymentRazorPay);
userRoute.post('/verifyRazorpay',authUser ,verifyRazorpay);



export default userRoute;