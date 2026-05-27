import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, resp) => {
    try {
        const { docId } = req.body;

        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        resp.json({ success: true, message: 'Availabilty Changed..' })

    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });

    }
}


const doctorList = async (req, resp) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        resp.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }
}

// API for doctor login Doctor
const loginDoctor = async (req, resp) => {
    try {

        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return resp.json({ success: false, message: "Invalid Credentials..." })
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (isMatch) {

            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

            resp.json({ success: true, token });
        } else {
            return resp.json({ success: false, message: "Invalid Credentials..." })

        }

    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }
}


// APT to get doctor appointments for docjtor panel

const appointmentsDoctor = async(req, resp) =>{
    try {
        const docId = req.docId;

        if (!docId) {
            return resp.json({ success: false, message: "Doctor ID not found in request." });
        }

        const appointments = await appointmentModel.find({docId});
        resp.json({success:true, appointments});


    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }
}


// API to mark appointment complete for doctor panel

const appointmentComplete = async (req, resp) => {
    try {

        const {docId, appointmentId} = req.body;

        const appointmentData = appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId == docId){
            await appointmentModel.findByIdAndUpdate(appointmentId , {isCompleted:true});
            return resp.json({success:true, message:"Appointment Completed..."});
        }else{
            return resp.json({success:false, message:"Mark Faileds..."});

        }

    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    
    }
}



const appointmentCancel = async (req, resp) => {
    try {

        const {docId, appointmentId} = req.body;

        const appointmentData = appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId == docId){
            await appointmentModel.findByIdAndUpdate(appointmentId , {cancelled:true});
            return resp.json({success:true, message:"Appointment Cancelled..."});
        }else{
            return resp.json({success:false, message:"Cancellation Failed..."});

        }

    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    
    }
}

// API to get dashboard data for docotor panel...

const doctorDashboard = async (req, resp) => {
    try {
        // const{ docId }= req.body || {};
        const docId = req.docId;
       

        const appointments = await appointmentModel.find({docId});

        let earnings = 0;

        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings += item.amount;
            }
        })

        let patients = [];

        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId);
            }
        })

        const dashData = {
            earnings, 
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        resp.json({success:true, dashData});
    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }
}

// API to get doctor Profile to get doctor pannel

const doctorProfile = async (req, resp) => {
    try {

        const docId = req.docId;
        const profileData = await doctorModel.findById(docId).select('-password');
        resp.json({success: true, profileData});
        
    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }
}

// API to update doctor Profile from doctor pannel

const updateDoctorProfile = async (req, resp)=>{
    try {

        const docId = req.docId;
        const { fees, address, available} = req.body;

        await doctorModel.findByIdAndUpdate(docId, {fees, address, available});

        resp.json({success:true, message:"profile Updated..."});
        
    } catch (error) {
        console.log(error);
        resp.json({ success: false, message: error.message });
    }
}



export { changeAvailability, doctorList, loginDoctor ,appointmentsDoctor,appointmentComplete,appointmentCancel,doctorDashboard,updateDoctorProfile,doctorProfile};