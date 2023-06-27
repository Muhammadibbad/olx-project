import '@/styles/globals.css'
import type { AppProps,AppContext, AppInitialProps, AppLayoutProps } from 'next/app'
import type { NextComponentType } from 'next';
import { ReactNode,useState,useEffect, useRef } from 'react';
import Head from 'next/head'
import {auth} from "../firebase/utils"
import firebase from 'firebase/compat/app';
import {redirect} from 'next/navigation' 
import { useRouter } from 'next/router';
import { ReduxProvider } from '@/redux/features/provider'; 





export default function ({ Component, pageProps }: AppLayoutProps) {
  // var authListener:any=null
  // const [user, setUser] = useState<{id:string|null;}>({id:null});
  // const router=useRouter()
  // useEffect(() => {
  //   authListener=auth.onAuthStateChanged(async (user:any) => {
  //   if(!user){
  //     setUser(user);
  //     // router.push("./")
  //   }
  //   if(user){
  // // //   // const userId=await handleUserProfile(user);
  // // //   //   // userRef?.onSnapshot(snapshot=>{
  // // //   //   //   setUser({
  // // //   //   //     id:snapshot.id,
  // // //   //   //     ...snapshot.data()
  // // //   //   //   })
  // // //   //   // })
  // //   //   // console.log("useRef===>",useRef)
  //   console.log("useRef===>",user.uid)
  //   // setUser(userId)
  //    }
  //   console.log("push==>",user.uid)
  //    setUser(user)
  //   //  router.push("./")
  //   });
  // }, []);





  
  return ( 
    <>
    
      <Head>
        <title>Olx Clone</title>
      </Head>
       <ReduxProvider >
        <Component  {...pageProps}   />
        </ReduxProvider>
    </>)
}

