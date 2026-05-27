import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const dasysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const naviate = useNavigate();
  const [docInfo, setDocInfo] = useState([]);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  };

  // const getAvailableSlots = async () => {
  //   let today = new Date();

  //   for(let i = 0 ; i < 7 ; i++){
  //     //getting date with idx
  //     let CurrentDate = new Date(today);
  //     CurrentDate.setDate(today.getDate() + i);

  //     // setting end time of the date with idx
  //     let endTime = new Date(CurrentDate);
  //     endTime.setDate(today.getDate()+i);
  //     endTime.setHours(21,0,0,0);

  //     // setting hours
  //     if(today.getDate() === CurrentDate.getDate()){
  //       CurrentDate.setHours(CurrentDate.getHours()>10 ? CurrentDate.getHours() +1 : 10 );
  //       CurrentDate.setMinutes(CurrentDate.getMinutes() > 30 ? 30 : 0);
  //     }else{
  //       CurrentDate.setHours(10);
  //       CurrentDate.setMinutes(0);
  //     }

  //     let timeSlots = [];
  //     while(CurrentDate < endTime){
  //       let formattedTime = CurrentDate.toLocaleTimeString([], {hour : '2-digit' , minute : '2-digit'});
  //       // Add slot to array
  //       timeSlots.push({
  //        datetime : new Date(CurrentDate),
  //        time: formattedTime
  //       })
  //       // Increament by 30 min
  //       CurrentDate.setMinutes(CurrentDate.getMinutes() + 30);
  //     }
  //     setDocSlots(prev => ([...prev , timeSlots]))
  //   }
  // }

  const getAvailableSlots = async () => {
    let today = new Date();
    let allSlots = []; // ✅ collect all data first

    for (let i = 0; i < 7; i++) {
      let CurrentDate = new Date(today);
      CurrentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // ✅ proper today check
      if (today.toDateString() === CurrentDate.toDateString()) {
        CurrentDate.setHours(
          CurrentDate.getHours() > 10 ? CurrentDate.getHours() : 10,
        );

        // ✅ fix minute rounding
        if (CurrentDate.getMinutes() > 0 && CurrentDate.getMinutes() <= 30) {
          CurrentDate.setMinutes(30);
        } else if (CurrentDate.getMinutes() > 30) {
          CurrentDate.setHours(CurrentDate.getHours() + 1);
          CurrentDate.setMinutes(0);
        } else {
          CurrentDate.setMinutes(0);
        }
      } else {
        CurrentDate.setHours(10);
        CurrentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (CurrentDate < endTime) {
        let formattedTime = CurrentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        let day = CurrentDate.getDate();
        let month = CurrentDate.getMonth() + 1;
        let year = CurrentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo?.slots_booked?.[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(CurrentDate),
            time: CurrentDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        }

        CurrentDate.setMinutes(CurrentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots); // ✅ push into array
    }

    setDocSlots(allSlots); // ✅ set ONCE
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return naviate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } },
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        naviate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    getAvailableSlots();
  }, []);

  return (
    docInfo && (
      <div>
        {/*----------------Doctor Details---------------*/}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="">
            <img
              src={docInfo.image}
              alt=""
              className="bg-primary w-full sm:max-w-72 rounded-lg"
            />
          </div>

          <div
            className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2
        sm:mx-0 mt-[20px] sm:mt-0"
          >
            {/* ================doc Info : name, degree, experience */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img src={assets.verified_icon} alt="" className="w-5" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p className="">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/* ================doc About============*/}
            <div className="">
              <p className="flex items-center  gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" className="" />
              </p>
              <p className="">{docInfo.about}</p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee :{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/*----------------Booking Slots---------------*/}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p className="">Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scrll mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer 
              ${slotIndex === index ? "bg-primary text-white" : "border border-gray-200"}`}
                  key={index}
                >
                  <p className="">
                    {item[0] && dasysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="">{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer
              ${item.time === slotTime ? "bg-primary text-white" : "text-gray-200 border border-gray-300"}`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={bookAppointment}
            className="bg-primary px-14 py-3 rounded-full mt-4 text-white text-sm font-light"
          >
            Book an ppointment
          </button>
        </div>

        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
