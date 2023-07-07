import React from 'react'
import {useState,useEffect} from 'react'
import Image from 'next/image'
import Pic from "../../public/photo-1605559424843-9e4c228bf1c2.jpg"



interface Adtype {
    title: string,
    description: string,
    brand: string,
    location: string,
    img?:string[],
    price:number|null,
    
  }
  
  const initialState: Adtype = {
    title: "",
    description: "",
    brand: "",
    location: "",
    price:null,
    img:[]
    
  
  }

const Ad = () => {
    
  const [myAdData,setMyAdData]=useState(initialState)
   
  
  

  return (
    <div>
        <div className='border border-black mt-[50px] ml-[100px] h-auto w-[80%]'>
     <div className='border border-black h-[350px] w-[22%]'>
       <div><Image className='h-[170px]' src={Pic} alt='Image is missing'/></div>
       <div className='mt-1 ml-3'>
       <div className='font-sans text-1.4rem font-bold  text-[#2B5A5E]'> <h2>Rs 30,000</h2> </div>
       <div className='font-sans text-[18px] font-size   text-[#678386]'> <h3>luxury Rooms available for rent daily basis 03087973820...</h3></div>
       <div className='font-custom text-[16px] mt-5 font-size    text-[#5C7A7E]'><h3>location</h3></div>
       <div className='font-custom text-[12px] mt-1 font-size    text-[#5C7A7E]'><h2>2 days ago</h2></div>
       </div>

     </div>
     
     </div>
    </div>
  )
}

export default Ad