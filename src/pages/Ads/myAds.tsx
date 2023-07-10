import React from 'react'
import { Timestamp } from 'firebase/firestore';
import Navbar from '@/component/Navbar'
import Category from '@/Category/category'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setObjects } from '@/redux/features/ad-slice';
import { useGoogleAuth } from '@/firebase/utils';
import Image from 'next/image';
import { timeStamp } from 'console';


interface adState {
    objects?: any[];
  }

const myAds = () => {

    // const dispatch = useDispatch<AppDispatch>()
    const allAd  = useSelector((state: any) => state.ad.objects)
    const [ad,setallAd]=useState<any>([])
    const [myad,setmyAd]=useState<any>([])
    const timezone:any=[]
    const {userId}=useGoogleAuth()
    const [timeago,setTimeago]=useState<any>([])
    
    console.log("alAD===",myad)
    
    // interface adType {
    //     title: string,
    //   description: string,
    //   brand: string,
    //   location: string,
    //   img?:string[],
    //   price:number|null,
    //   mainCat:string,
    //   subCat:string,
    //   sub2Cat:string,
    //   userId:string,
    //   }
    
// async function fetchData() {
//   try {
//     const response = await axios.get('/api/fetchData');
//     const documents = response.data.documents;
//     console.log("data ====>",documents);
    
//     dispatch(setObjects(documents))
//   } catch (error) {
//     console.error('Error fetching documents: ', error);
//   }
// }

// useEffect(()=>{
//     fetchData()
// },[])


const convertTime=()=>{
  console.log("running convert time")
  
  myad.map((item:any,index:any)=> {
    
 const seconds=item.timestamp.seconds
 const nanoseconds=item.timestamp.nanoseconds
 
 const firestoreTimestamp = new Timestamp(seconds, nanoseconds);
 const date = firestoreTimestamp.toDate();
   timezone.push(date)


  } )

}


const getTimeago=()=>{

  console.log("running get time ago")
    
  const timeAgo = (timestamp:any)=>{


    
   
      const currentTimestamp = Date.now();
      const timeDifference = currentTimestamp - timestamp;
    
      // Convert time difference to seconds
      const second = Math.floor(timeDifference / 1000);
    
      // Define time intervals in seconds
      const intervals:any = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
      };
    
      // Iterate over intervals to calculate the appropriate time unit
      for (const unit in intervals) {
        if (second >= intervals[unit]) {
          const count = Math.floor(second / intervals[unit]);
          return count === 1 ? `${count} ${unit} ago` : `${count} ${unit}s ago`;
        }
      }
    
      // If the time difference is less than a minute, return "just now"
      return "just now";
    
  }
  
  const timeAgoArray = timezone.map((timestamp:any) => timeAgo(timestamp));
  
  setTimeago(timeAgoArray)

}

useEffect(()=>{
  convertTime(),getTimeago()
},[myad])

useEffect(()=>{
    setallAd(allAd)
    console.log("get my ad is running")
    const getMyAdd =async ()=>{
     
        console.log("ad===>",ad)
        var myAd:any=[]
        myAd= await ad.filter((x:any)=> x.userId === userId )
        console.log("myadd==>",myAd)
        setmyAd(myAd)
    }

    
    getMyAdd()
},[ad])




  return (
    <div>
    <Navbar/>
    <Category/>

     <div>



<div className='grid grid-cols-4  mt-[50px] ml-[130px] h-auto w-[80%]'>

{myad.map((item:any,index:any)=>(
<div className='border border-black h-[350px] w-[300px]  mt-4'>
<div><Image className='h-[180px]' src={item.file[0]} width={350} height={10} alt='Image is missing'/></div>
<div className='mt-1 ml-3'>
<div className='font-sans text-1.4rem font-bold  text-[#2B5A5E]'> <h2>Rs {item.price}</h2> </div>
<div className='font-sans text-[18px] font-size   text-[#678386]'> <h3>{item.title}</h3></div>
<div className='font-custom text-[16px] mt-5 font-size    text-[#5C7A7E]'><h3>{item.location}</h3></div>
<div className='font-custom text-[12px] mt-1 font-size    text-[#5C7A7E]'><h2>{timeago[index]}</h2></div>
</div>

</div>
))}


</div>




   
     </div>

    </div>
    
  )
}

export default myAds