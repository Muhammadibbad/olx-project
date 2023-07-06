import React from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore';
import {db} from "../firebase/utils"
import {useState} from "react"

const Category = () => {
    
     const [mainCat,setMainCat]=useState<any>([])
     const [subCat,setSubCat]=useState<any>([])
     const [subCat2,setSubCat2]=useState<any>([])
     const [catDown,setCatDown]=useState<any>(false)
     const fetchMainCat:any=[]
     
    const fetchData1 = async () => {
        try {
          const collectionRef = collection(db, 'Categories'); // Replace 'your-collection' with the actual collection name
          
          const q = query(collectionRef, where('level', '==', 0));
          console.log(q)
           
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


      
      const handleMainCat= async (e:React.SyntheticEvent)=>{
         await fetchData1()
        setCatDown(true)
       console.log("boom",mainCat)
    }

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

    const handleCatDown=()=>{
      setCatDown(false)
      setSubCat([])
      setSubCat2([])
    }
    


  return (
    <div className=''>
        <div className='border-b'>
            <div className='flex  ml-[200px] h-11'>
        <div   className=' text-[15px] font-serif font-semibold'>
        <button className='mt-3'   onClick={handleMainCat}>All categories </button>
        </div>
        <div >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-1 mt-[10px] w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>

        </div>
        </div>
        
    </div> 
    <div onMouseLeave={handleCatDown} className=' ml-[200px]  '>
      {catDown && 
      
      <div className='flex'>
     <div className='  '> 
      {mainCat.map((item:any)  => (
        <div key={item.id} onClick={() => fetchSubCat(item.id)}>
          <div className='flex border w-[300px] h-10 hover:hover:bg-[#C8F8F6] text-[#2B5A5E] hover:text-black font-serif'>
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
          <div className='flex border h-10 w-[300px] hover:hover:bg-[#C8F8F6] text-[#2B5A5E] hover:text-black font-serif'>
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
        <div className='' key={item.id}>
        <div className='border h-10 w-[300px] hover:hover:bg-[#C8F8F6] text-[#2B5A5E] hover:text-black font-serif' key={item.id} >
          
          <button className='mt-2 ml-5'>{item.name} 
</button>
          
</div>


        </div>
      ))}
      </div>
      </div> 


      
      }
    

    </div>
    </div>
  )
}

export default Category