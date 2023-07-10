import React, { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import Category from '@/Category/category'
import Navbar from '@/component/Navbar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Image from 'next/image'
import { Timestamp } from 'firebase/firestore'


const Product = (props:any) => {
    const allAd  = useSelector((state: any) => state.ad.objects)
console.log("make",allAd)
   const router=useRouter()
    const product=router.query.product
    const [cat,setCat]=useState<any>("")
    const [item,setItem]=useState<any>([])
    const timezone:any=[]
    
    const [timeago,setTimeago]=useState<any>([])
   

    const fetchCat = async ( name:any) => {
        try {
          const response = await axios.get(`/api/fetchCat?name=${name}`);
          const data = await response.data.fetchSubCat;
          console.log("Make Data",data.id)
          setCat(data.id)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      const sortAd=()=>{
        const sort:any=[]
        allAd.map((item:any)=>{
           if(item.mainCat === cat || item.subCat === cat || item.sub2Cat){
               sort.push(item)
           }
        })
        console.log("thats",sort)
        setItem(sort)
      }

      useEffect(()=>{
        
        sortAd(),convertTime(),getTimeago()
      },[cat])


      useEffect(()=>{
        
        fetchCat(product)
      },[])


      const convertTime=()=>{
        console.log("running convert time")
        
        allAd.map((item:any,index:any)=> {
          
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
      

  return (
    <div>   
        <div><Navbar/></div>
         <div><Category/></div>
    <div className='font-semibold font-custom  text-[25px] ml-[130px] mt-[40px]'><h2 >{product}</h2></div>
    <div className='grid grid-cols-4  mt-[20px] ml-[130px] h-auto w-[80%]'>

{item.map((item:any,index:any)=>(
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

  )
}

export default Product