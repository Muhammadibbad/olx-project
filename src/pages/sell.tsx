import React from 'react'
import Link from 'next/link'
import { collection, query, where, getDocs } from 'firebase/firestore';
import {db} from "../firebase/utils"
import {useState,useEffect} from "react"

const Sell = () => {

    const [mainCat,setMainCat]=useState<any>([])
     const [subCat,setSubCat]=useState<any>([])
     const [subCat2,setSubCat2]=useState<any>([])

   

    const fetchSubCat= async (id:any)=>{
        try {
            const collectionRef = collection(db, 'Categories'); // Replace 'your-collection' with the actual collection name
          
            const q = query(collectionRef, where('parentId', '==', id));
             const fetchSubCat:any=[]
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              const data ={ id: doc.id, ...doc.data() } ;
              
              console.log(data)
              // Process the data as needed
               fetchSubCat.push(data)
              
            });
             setSubCat(fetchSubCat);
            setSubCat2([])
         
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }

    const fetchSubCat2= async (id:any)=>{
        try {
            const collectionRef = collection(db, 'Categories'); // Replace 'your-collection' with the actual collection name
          
            const q = query(collectionRef, where('parentId', '==', id));
             const fetchSubCat2:any=[]
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              const data ={ id: doc.id, ...doc.data() } ;
              
              console.log(data)
              // Process the data as needed
               fetchSubCat2.push(data)
              
            });
             setSubCat2(fetchSubCat2);
          
         
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
  
    useEffect(()=>{
        const fetchData1 = async () => {
            try {
              const collectionRef = collection(db, 'Categories'); // Replace 'your-collection' with the actual collection name
              
              const q = query(collectionRef, where('level', '==', 0));
              console.log(q)
               const fetchMainCat:any=[]
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                const data ={ id: doc.id, ...doc.data() } ;
                
                console.log(data)
                // Process the data as needed
                 fetchMainCat.push(data)
                
              });
               setMainCat(fetchMainCat);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
        
       
      fetchData1()
      
    },[])
    
    

  return (
    <div>
    <div className='flex bg-[#F7F8F8] border h-[70px] w-[100%]'>
        <div>
    <Link href="/"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" mt-6 ml-3 w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
</svg>
</Link>
</div>

       <div> 
        <img className='h-[70px] w-[65px] ml-5' src="OLX-Logo-PNG-768x768.jpg" alt="" />
        </div>
    </div>

    <div>
        <h1 className='flex flex-col items-center font-sans text-xl font-bold mt-3 text-[#2B5A5E]'>POST YOUR AD</h1>
    </div>
    <div className='ml-[250px] border mt-3 border-[#002F345B] h-[800px] w-[70%] rounded'>
        <div className='h-[40px] border-b border-[#002F345B]'>
            <h1   className=' border-black font-sans mt-4 text-md text-[#2B5A5E] ml-3 font-bold'>CHOOSE A CATEGORY</h1>
        </div>
        <div className='flex'>
     <div className='  '> 
      {mainCat.map((item:any)  => (
        <div key={item.id} onClick={() => fetchSubCat(item.id)}>
          <div className='flex border w-[370px] h-12 hover:hover:bg-[#C8F8F6] text-[#2B5A5E] hover:text-black font-serif'>
          <div className='mt-2 ml-5 '><button>{item.name} </button></div>
          <div className='mt-2 ml-auto  '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>
</div>
          </div>
          

        </div>
      ))}
      </div>
      <div className=' '>
      {subCat.map((item:any)  => (
        <div className='  ' key={item.id} onClick={() => fetchSubCat2(item.id)}>
          <div className='flex border h-12 w-[370px] hover:hover:bg-[#C8F8F6] text-[#2B5A5E] hover:text-black font-serif'>
          <div className='mt-2 ml-5'><button>{item.name} </button></div>
          <div className='mt-2 ml-auto'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>
</div>
          </div>

        </div>
      ))}
      </div>
      <div className=''>
      {subCat2.map((item:any)  => (
        <div className=''>
        <div className='border h-12 w-[370px] hover:hover:bg-[#C8F8F6] text-[#2B5A5E] hover:text-black font-serif' key={item.id} >
          
          <button className='mt-2 ml-5'>{item.name} 
</button>
          
</div>


        </div>
      ))}
      </div>
      </div> 

    </div>


    </div>
  )
}

export default Sell