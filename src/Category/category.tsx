import React from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore';
import {db} from "../firebase/utils"
import {useState} from "react"

const Category = () => {
    
     const [mainCat,setMainCat]=useState<any>([])
     const [subCat,setSubCat]=useState<any>([])
     const [subCat2,setSubCat2]=useState<any>([])
     
    const fetchData1 = async () => {
        try {
          const collectionRef = collection(db, 'Categories'); // Replace 'your-collection' with the actual collection name
          const q = query(collectionRef, where('level', '==', 0));
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
      
      const handleMainCat= async (e:React.SyntheticEvent)=>{
        fetchData1()
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
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    


  return (
    <div className=''>
        <div className='border-b'>
            <div className='flex  ml-[200px] h-11'>
        <div className=' text-[15px] font-serif font-semibold'>
        <button className='mt-3' onClick={handleMainCat}>All categories </button>
        </div>
        <div >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-1 mt-[10px] w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>

        </div>
        </div>
        
    </div> 
    <div>
      {mainCat.map((item:any)  => (
        <div key={item.id} onClick={() => fetchSubCat(item.id)}>
          
          <p>{item.name}</p>
          
          

        </div>
      ))}
      {subCat.map((item:any)  => (
        <div key={item.id} onClick={() => fetchSubCat(item.id)}>
          
          <p>{item.name}</p>
          
          

        </div>
      ))}
    </div>
    </div>
  )
}

export default Category