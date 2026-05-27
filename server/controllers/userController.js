import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import rezorpay from 'razorpay';
import dotenv from "dotenv";
dotenv.config();


// API to register user
const registerUser = async (req, resp) => {
    try {


        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return resp.json({ success: false, message: "Missing Detials.." })
        }

        if (!validator.isEmail(email)) {
            return resp.json({ success: false, message: "Enter a valid Email..." })
        }

        if (password < 8) {
            return resp.json({ success: false, message: "Enter a Strong Password..." })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        // _id get

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        resp.json({ success: true, token });


    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }
}

// LOGIN 
const loginUser = async (req, resp) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return resp.json({ success: false, message: "Missing Detials.." })
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return resp.json({ success: false, message: "User doesn't exist..." })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return resp.json({ success: true, token })
        } else {
            return resp.json({ success: false, message: "Invalid Credentials.." })

        }

    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }
}

// API  to get userProfile data;

const getProfile = async (req, resp) => {
    try {

        const userId = req.userId;

        const userData = await userModel.findById(userId).select('-password');

        resp.json({ success: true, userData });

    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }
}

// uPDATE USER-PROFILE

const updateProfile = async (req, resp) => {
    try {
        const userId = req.userId;
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;
        if (!name || !phone || !address || !dob || !gender) {
            return resp.json({ success: false, message: "Data Missing..." })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender }, { new: true });

        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            const imageUrl = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }

        resp.json({ success: true, message: "Profile Updated..." })
    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }
}


// API book appointment

const bookAppointment = async (req, resp) => {
    try {
        const { docId, slotDate, slotTime } = req.body;
        const userId = req.userId;

        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData.available) {
            return resp.json({ success: false, message: "Doctor not available..." })
        }

        let slots_booked = docData.slots_booked.toObject ?
            docData.slots_booked.toObject() : { ...docData.slots_booked };

        // checking for slot availability

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return resp.json({ success: false, message: "Slot not available..." })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password').lean();
        if (!userData) {
            return resp.json({ success: false, message: "User not found..." })
        }

        // Delete Doc slotbookdata
        const docData2 = docData.toObject();
        delete docData.slots_booked;


        const appointmentData = {
            userId, docId,userData, docData: docData2, amount:Number(docData.fees), slotDate, slotTime, date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Save new slots data in docData;
        await doctorModel.findByIdAndUpdate(docId, { $set: { slots_booked } });

        resp.json({ success: true, message: "Appointment Booked..." })



    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }
}

// api to get appointment my-appointment page..
const listAppointment = async (req, resp) => {
    try {

        const userId = req.userId; // ?
        const appointments = await appointmentModel.find({ userId });

        resp.json({ success: true, appointments });

    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }
}

// api to cancel-appointment..

const cancelAppointment = async (req, resp) => {

    try {

        const userId = req.userId;
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);
        // Verify appointmentUser ;
        if (appointmentData.userId != userId) {
            return resp.json({ success: false, message: "Unauthorized action..." })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // relesing doc slot;

        const { docId, slotDate, slotTime } = appointmentData;

        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        resp.json({ success: true, message: "Appointment Cancelled..." })

    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }
}


const razorpayInstance = new rezorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// API to make payment of appointment using Razor Pay;
const paymentRazorPay = async (req, resp) => {

    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData || appointmentData.cancelled) {
            return resp.json({ success: false, message: "Appointment Cancelled or Not found" })
        }

        // Creating options for razor payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,

        }

        // creation of an order 
        const order = await razorpayInstance.orders.create(options);

        resp.json({ success:true, order });

    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }
}

// API to verify payment of razorpay;
const verifyRazorpay = async (req, resp) => {
    try {

        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        
        if(orderInfo.status === 'paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt , {payment:true});
            resp.json({success:true, message:"Payment successful..."});

        }else{
            resp.json({ success: false, message:"Payment Failed..." });
        }
        
    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }
}



export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment ,paymentRazorPay , verifyRazorpay};