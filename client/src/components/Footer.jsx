import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm]">
       {/* -------left------- */}
      <div className="">
        <img src={assets.logo} alt="" className="mb-5 w-40" />
        <p className="w-full md:w-2/3 text-gray-600 leading-6">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit vitae, 
            nulla, dolor quidem eius excepturi inventore adipisci harum totam, commodi vero nam molestiae doloremque laboriosam. Dolor quae culpa possimus enim.</p>
      </div>

      {/* -------center -------*/}
      <div className="">
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
            <li className="">Home</li>
            <li className="">About</li>
            <li className="">contact us</li>
            <li className="">Privacy policy</li>
        </ul>
      </div>

      {/* -------right------- */}
      <div className="">
         <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
            <li className="">+1-212-456-7890</li>
            <li className="">anhre@gmail.com</li>
        </ul>
      </div>
      </div>
      <div className="">
        <hr className="" />
        <p className=" py-5 text-sm text-center">Copyright 2026@ Prescripto  - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
