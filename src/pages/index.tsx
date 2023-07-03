import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Layout from '@/component/Layout'
import Category from "../Category/category"



export default function Home({user}:any) {

  
  return (
    <div>
   <Layout user={user}>

   </Layout>
   <Category/>
   </div>
  
  )
}
