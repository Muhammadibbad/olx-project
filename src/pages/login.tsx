import React from 'react'
import {  useGoogleAuth } from '@/firebase/utils'
import { useRouter } from 'next/router';
import { auth} from '@/firebase/utils';
import firebase from 'firebase/compat/app';
import { db } from '@/firebase/utils';
import {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { addProfile,fetchProfile } from '@/redux/features/auth-slice'
import { doc, getDoc } from "firebase/firestore";



const Login = (props:any) => {
    const router=useRouter()
    const {userId}=useGoogleAuth()
    const dispatch = useDispatch<AppDispatch>()
   const userProf  = useSelector((state: any) => state.profile)
    const GoogleProvider=new firebase.auth.GoogleAuthProvider(); 
GoogleProvider.setCustomParameters({prompt:"select_account"})

    const signInWithGoogle=async()=>{
        try{
        const result =await auth.signInWithPopup(GoogleProvider)
         router.push("/")
        console.log(result)
        }catch(error){
      console.log(error)
      
        }
      }
   
    const handleSubmit= async (e:React.SyntheticEvent)=>{
        console.log()
        e.preventDefault()
        
    }
    
    
    
    return (
        <div>
            
            <div className=' ml-96 border-2 border-black mr-96 h-96 mt-56 w-5/12'>
                <div className='flex flex-col items-center text-2xl font-bold mt-32'><h2>Welcome to OLX</h2></div>
            
            <div className="text-white flex flex-col items-center   ">
                <button onSubmit={()=>handleSubmit} onClick={signInWithGoogle} className="underline underline-offset-8 font-semibold mt-28  p-3 px-36 rounded-lg  bg-blue-600 my-2 ml-10">Sign In With Google</button>
            </div>
           
            
            </div>
            
            
        </div>
    )
}

export default Login
