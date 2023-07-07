import React from 'react'
import Ad from "../../component/Ad"
import Navbar from '@/component/Navbar'
import Category from '@/Category/category'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setObjects } from '@/redux/features/ad-slice';
import { useGoogleAuth } from '@/firebase/utils';

interface adState {
    objects?: any[];
  }

const myAds = () => {

    const dispatch = useDispatch<AppDispatch>()
    const allAd  = useSelector((state: any) => state.ad.objects)
    const [ad,setallAd]=useState<any>([])
    const [myad,setmyAd]=useState([])
    const {userId}=useGoogleAuth()
    var myAd:any=[]
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
    
async function fetchData() {
  try {
    const response = await axios.get('/api/fetchData');
    const documents = response.data.documents;
    console.log("data ====>",documents);
    
    dispatch(setObjects(documents))
  } catch (error) {
    console.error('Error fetching documents: ', error);
  }
}

useEffect(()=>{
    fetchData()
},[])

useEffect(()=>{
    setallAd(allAd)
    const getMyAdd =async ()=>{
        console.log("ad===>",ad)
        myAd= await ad.filter((x:any)=> x.userId !== userId )
        console.log("myadd==>",myAd)
    }
    getMyAdd()
},[ad])




  return (
    <div>
    <Navbar/>
    <Category/>
<Ad/>


    </div>
    
  )
}

export default myAds