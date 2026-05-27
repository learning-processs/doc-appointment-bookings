import React, { useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { assets } from '../assets/assets_frontend/assets';

const Profile = () => {

  const {userData ,setUserData ,loadUserProfileData , token, backendUrl,} = useContext(AppContext);

    
 
  // const [userData, setUserData] = useState({
  //   name : "Edward Vincent",
  //   imgage : assets.profile_pic,
  //   email : 'edwardvincent@gmail.com',
  //   phone : '+1 123 456 7890',
  //   address :{
  //     line1 : '57th Cross, Richmond ',
  //     line2 : 'Circle, Church Road, London'
  //   },
  //   Gender : 'Male',
  //   dob : '2000-01-20'
  // })

  const [isEdit , setIsEdit] = useState(true);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async() =>{
    try {
      const formData = new FormData();
      formData.append('name' , userData.name);
      formData.append('phone' , userData.phone);
      formData.append('address' , JSON.stringify(userData.address));
      formData.append('gender' , userData.gender);
      formData.append('dob' , userData.dob);

      image && formData.append('image', image);


      const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData ,{headers:{token}});
      if(data.success){
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  return userData && (
    <div className='max-w-lg flex-col gap-2 text-sm '>
      {
        isEdit
        ? <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img  src={image ? URL.createObjectURL(image) : userData.image} alt="" className="w-36 rounded opacity-75 " />
            <img src={image ? '': assets.upload_icon} alt="" className="w-10 absolute bottom-12 right-12" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="" id="image" hidden />
        </label>
        :<img src={userData.image} alt="" className="w-36 rounded" />

      }
      {
        isEdit
        ? <input type="text" className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' onChange={(e) => setUserData(prev => ({...prev, name : e.target.value}))} value={userData.name} />
        : <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none'/>
      <div className="">
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email : </p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone : </p>
          {
            isEdit
            ? <input type="text" className='bg-gray-100 max-w-52' onChange={e => setUserData(prev => ({...prev, phone : e.target.value}))} value={userData.phone} />
            : <p className="text-blue-400">{userData.phone}</p>
          }
          <p className="font-medium ">Address : </p>
          {
            isEdit
            ? <p className="">
                <input type="text" className='bg-gray-100' onChange={e => setUserData(prev => ({...prev, address : {...prev.address, line1 : e.target.value}}))} value={userData.address.line1} />
                <br />
                <input type="text" className='bg-gray-100' onChange={e => setUserData(prev => ({...prev, address : {...prev.address, line2 : e.target.value}}))} value={userData.address.line2} />
              </p>
            : <p className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
              </p>
          }
        </div>
      </div>
      <div className="">
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender : </p>
          {
            isEdit 
            ? <select className='max-w-20 bg-gray-100 ' value={userData.gender} onChange={(e)=>setUserData(prev =>({...prev, gender:e.target.value }))}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            : <p className="text-gray-400">{userData.gender}</p>
          }
          <p className="font-medium">Birthday : </p>
          {
            isEdit
            ? <input type="date" className='max-w-28 bg-gray-100' value={userData.dob} onChange={(e) =>setUserData(prev =>({...prev, dob : e.target.value}))} />
            : <p className="text-gray-400">{userData.dob}</p>
          }
        </div>
      </div>
      <div className="mt-10">
        {
          isEdit
          ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={updateUserProfileData}>Save information</button>
          : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default Profile
