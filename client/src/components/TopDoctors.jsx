import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    let {doctors} = useContext(AppContext);
    const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
        <p className="text-sm sm:w-1/3 text-center">Simply browser through our extensive list if Insted doctors.</p>
        <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
            {
                doctors.slice(0,10).map((item,idx)=>(
                    <div onClick={()=>{navigate(`/appointment/${item._id}`) ; scrollTo(0,0)}} key={idx} className="border border-blue-200 cursor-pointer rounded-xl overflow-hidden
                    hover:translate-y-[-10px] transition-all duration-500">
                        <img className='bg-blue-50' src={item.image} alt="" />
                        <div className="p-4">
                            <div className={`flex items-center gap-2 text-sm text-center ${ item.available ? 'text-green-500' : 'text-gray-500'} `}>
                                <p className={`w-2 h-2 ${ item.available ? 'bg-green-500' : 'bg-gray-500'}  rounded-full`}></p><p className="">{item.available ? 'Available' : 'Not Available'}</p>
                            </div>
                            <p className="text-lf text-gray-900 font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600 ">{item.speciality}</p>
                        </div>
                    </div>
                ))
            }
        </div>
        <button onClick={()=>{navigate('/doctors')}}
        className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>More</button>
    </div>
  )
}

export default TopDoctors
