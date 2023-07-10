import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Layout from '@/component/Layout'
import Category from "../Category/category"
import Ad from '@/component/Ad'




export default function Home({user}:any) {

  
  return (
    <div>
   <Layout user={user}>

   </Layout>
   <div className='z-40'><Category/></div>
   
   <div className='z-0'><Ad /></div>
   
   </div>
  
  )
}
