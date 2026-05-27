
import validator from 'validator';
import bcrypt from 'bcrypt'
import { v2 as Cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';
// API FOR ADDING DOCTOR

const addDoctor = async (req, resp) => {
    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return resp.json({ successs: false, message: "Missing Details" });
        }
        if (!imageFile) {
            return resp.json({ success: false, message: "Image is required" });
        }


        // validate the email
        if (!validator.isEmail(email)) {
            return resp.json({ successs: false, message: "Enter a valid Email.." });
        }

        // validating strong password
        if (password.length < 8) {
            return resp.json({ successs: false, message: "Please enter a Strong password" })
        }

        const existingDoctor = await doctorModel.findOne({ email });

        if (existingDoctor) {
            return resp.json({
                success: false,
                message: "Doctor already exists"
            });
        }

        // Hasing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to Cloudinary
        const imageUpload = await Cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url;

        // Doctor data 
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        resp.json({ success: true, message: "Doctor Added..." })
    } catch (error) {
        console.log(error);
        return resp.json({ success: false, message: error.message });
    }
}

const loginAdmin = async (req, resp) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            resp.json({ success: true, token })

        } else {
            resp.json({ success: false, message: "Invalid Credentials..." })
        }

    } catch (error) {
        console.log(error);
        return resp.json({ success: false, message: error.message });
    }
}


// To get all doctor list for admin pannel

const allDoctors = async (req, resp) => {
    try {

        const doctors = await doctorModel.find({}).select('-password');
        resp.json({ success: true, doctors });

    } catch (error) {
        console.log(error);
        return resp.json({ success: false, message: error.message });
    }
}

// API to get alll appointment list

const appointmentsAdmin = async (req, resp) => {
    try {
        const appointments = await appointmentModel.find({});
        resp.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        return resp.json({ success: false, message: error.message });
    }
}

// API to cancel the appointment...

const appointmentCancel = async (req, resp) => {

    try {

        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

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


// API to get dashboard data for admin panel;
const adminDashboard = async (req, resp) => {
    try {

        const doctors = await doctorModel.find({});
        const user = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: user.length,
            latestAppointments: appointments.reverse().slice(0, 5),
        }

        resp.json({ success: true, dashData })

    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }
}

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard };