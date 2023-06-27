import react from "react";
import { BsSearch } from "react-icons/bs"
import Link from "next/link";
import { useState,useEffect } from "react";
import {auth} from "../firebase/utils";
import {useSelector,useDispatch} from "react-redux"
import { useGoogleAuth } from '@/firebase/utils'
import { AppDispatch } from "@/redux/store";
import { fetchProfile,delProfile } from "@/redux/features/auth-slice";
import { db } from "../firebase/utils";

import { doc, getDoc } from "firebase/firestore";


const Navbar = () => {
    
    
  const dispatch=useDispatch<AppDispatch>()
  const [dropdown,setDropdown]=useState(false)
  const { userId, user } = useGoogleAuth()
  console.log("user5===>", user)
 const [data,setData]=useState({})
  const userProf  = useSelector((state: any) => state.profile)
  console.log("nav==>",userProf)
  console.log("data",data)
  

  useEffect(()=>{

    const fetchData=async()=>{
    const docRef = doc(db, 'Profile', `${userId}`)
    const dataUse = await( getDoc(docRef))
    const getUser={id:dataUse.id, ...dataUse.data()}
   
   
   console.log('get===>', getUser)
   
  
    dispatch(fetchProfile(getUser)) 
   
    }
    fetchData()
},[userId])

const handlesignOut=()=>{
    const newPerson = {
        name: "",
        email: "",
        contact: null,
        about: "",
        img:""
      
       }
    auth.signOut()
    dispatch(delProfile(newPerson))
}
  useEffect(()=>{
    setData(userProf)
  },[userProf])

    return (
        <>
            <div>
                <nav className="bg-[#F7F8F8] ">

                    <div className="h-1 inline-flex mx-32 my-20" >
                        <div className="">
                            <input type="text" name="search" className="w-5/6 mx-72 h-11 p-1 " placeholder="Find Cars,Mobile Phones and more .." />
                        </div>
                        <div className=" bg-black text-white px-4 w-10 h-11 mr-10  mx-32">
                            <button className="mt-4 "><BsSearch /></button>
                        </div>
                        {!user &&(
                        <div className="  text-black relative ">
                            <Link href="/login"><button className="underline underline-offset-8 font-semibold decoration-2 my-2 -mr-5 hover:no-underline ">Login</button></Link>
                    
                        </div>
                        )}
                        {user &&(
                        <div className="  text-black h-[80px]  " onClick={()=>setDropdown(true)} onMouseLeave={()=>setDropdown(false)}>
                            <img  className=" my-1 -mr-8 h-10 w-20 rounded-full" src={userProf.img? userProf.img: "vector-users-icon.webp"}/>
                            {dropdown &&
                            <div className="lg:absolute bg-white -ml-32 mt-2" >
                                
                            <ul className=" w-[300px] ">
                                
                                <li className=" border-b-2 flex p-2   hover:text-black ">
                                <div className="flex">
                                    <div> <img  className="mt-5 my-1 -mr-8 h-14 w-24 rounded-full" src={userProf.img? userProf.img: "vector-users-icon.webp"}/></div>
                                   <div className="ml-8 pt-2 space-y-1"> 
                                    <div><h2>Hello,</h2></div>
                                    <div><h2 className="font-bold text-lg text-[#2B5A5E]">{user.displayName}</h2></div>
                                    <div><h2 className="underline text-[#2B5A5E]" ><Link href="/profile/profile">View and Edit Profile</Link></h2></div>
                                    </div>
                                    </div>
                                </li>
                                
                                <li className=" flex p-2 hover:hover:bg-[#C8F8F6] text-[#2B5A5E] hover:text-black h-12 ">
                                    <div className="flex space-x-4 ml-2 ">
                                    <div><svg className="h-6 w-6 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="5" y="3" width="14" height="18" rx="2" />  <line x1="9" y1="7" x2="15" y2="7" />  <line x1="9" y1="11" x2="15" y2="11" />  <line x1="9" y1="15" x2="13" y2="15" /></svg></div>
                                   <div> <a href="">my Ads</a></div>
                                   </div>
                                    </li>
                                <li className="flex p-2 hover:bg-[#C8F8F6] text-[#2B5A5E] hover:text-black  h-12 ">
                                   <div className="flex space-x-4 ml-2">
                                    <div><svg className="h-6 w-6 text-black"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                                     </svg>
                                     </div>
                                    <div className="text-md"> <a href=""><span onClick={handlesignOut}>Sign Out</span></a></div>
                                   </div>
                                    </li>
                            </ul>
                        </div>}
                            
                        </div>
                        
                        )}
                        <div className="  text-black "    >
                            <button className="underline underline-offset-8 font-semibold decoration-2 my-2 ml-10"  >Sell</button>
                            
                           
                            
                        </div>
                    </div>
                </nav>
            </div>
        </>

    )
}

Navbar.defaultProps={
    user:null
}


export default Navbar;

