import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p >ABOUT <span className="text-gray-700 font-medium">US</span> </p>
      </div>

      <div className="my-10  flex flex-col md:flex-row gap-12">
        <img src={assets.about_image} alt="about_img" className="w-full md:max-w-[360px]" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
        <p className="">Welcome To Prescripto, Your Trusted Partner in Managing Your Healthcare Needs Conveniently and Efficiently.
          At prescripto, We Understand The Challanges Individuals Face When It Comes To Scheduling Doctor
          Appointments And Managing Their Health Reocrs.
        </p>
       
        <p className="">Prescripto is Committed To Excellence in Healthcare Technology. We Continuously Strive To Ehance Our
          Plateform, Intefrating The Latest Advancements To Imporve User Experience And Deliver Superior Service.
          Whether You've Booking Your First Appointment Or Managinh Ongoing Care, Prescripto is Here To Support You 
          Every Step of The Way.
        </p>
        <div className="flex flex-col gap-1">
          <b className="">Our Vision</b>
          <p className="">Our Vision At Prescripto Is To Create A Seamless Healthcare Experience For Every User. We Aim to Bridge The
          Gap Between Patients And Healthcare Providers, making it Easier For You To Access The Care You Need, When You Need it.
          </p>
        </div>
        </div>
      </div>

      <div className=" text-xl my-4 ">
        <p className="">WHY  <span className="text-gray-700 font-semibold">CHOOSE US</span> </p>
      </div>
      <div className="flex flex-col  md:flex-row mb-20">
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all cursor-pointer">
            <b className="">EFFICIENCY : </b>
            <p className="">Streamlined Appointment Scheduling That Fits into Your Busy Lifestyle.</p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all cursor-pointer">
            <b className="">CONVENIENCE :</b>
            <p className="">Access To A Network Of Trusted Healthcare Professionals In Your Area.</p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all cursor-pointer">
            <b className="">PERSONALIZATION : </b>
            <p className="">Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.</p>
          </div>
        </div>
    </div>
  )
}

export default About
