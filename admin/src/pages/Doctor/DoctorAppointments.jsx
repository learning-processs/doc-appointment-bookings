import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';

const DoctorAppointments = () => {

  const {dToken, appointments, setAppointments, getAppointments, completeAppointment,cancelAppointment} = useContext(DoctorContext);
  const { calculateAge ,slotDateFormat, currency} = useContext(AppContext);


  useEffect(()=>{
    if(dToken){
      getAppointments();
    }
  },[dToken]);



  return (
   
    <div className='w-full max-w-6xl m-5 '>
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3">
          <p className="">#</p>
          <p className="">Patient</p>
          <p className="">Paymemnt</p>
          <p className="">Age</p>
          <p className="">Date & Time</p>
          <p className="">Fee</p>
          <p className="">Action</p>
        </div>

        {
          appointments.reverse().map((item,index)=>(
            
            <div key={index} className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base
            sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 px-6 border-b hover:bg-gray-50">
                  
              <p className="max-sm:hidden">{index +1}</p>
              <div className="flex items-center gap-2">
                <img src={item.userData.image} alt="" className="w-8 rounded-full" /><p className="">{item.userData.name}</p>
              </div>
              <div className="">
                <p className="text-xs inline border border-primary rounded-full px-2">{item.payment ? 'Online':'CASH'}</p>
              </div>
              <p className='max-sm:hidden'>{item.userData.dob && item.userData.dob !== "Not Selected" ? calculateAge(item.userData.dob) : 'N/A'}</p>
              <p className="">{slotDateFormat(item.slotDate)},{item.slotTime}</p>
              <p className="">{currency}{item.amount}</p>
              {
                item.cancelled 
                ? <p className="text-red-400 text-xs font-medium">Cancelled</p>
                : item.isCompleted 
                  ? <p className="text-green-500 text-xs font-medium">Completed</p> 
                  :<div className="flex">
                    <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt=""  className='w-10 cursor-pointer'/>
                    <img onClick={()=>completeAppointment(item._id)} src={assets.tick_icon} alt="" className='w-10 cursor-pointer' />
                  </div>
              }
              
            </div>
          ))
        }

      </div> 


    </div>
  )
}

export default DoctorAppointments
