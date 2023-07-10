import React, { useEffect } from 'react'
import Link from 'next/link'
import Logo from '../../../public/OLX-Logo-PNG-768x768.jpg'
import Image from 'next/image'
import { useState } from 'react'
import { useSelector} from 'react-redux'
import { db ,storage,firestore} from '@/firebase/utils'
import { setDoc,getDoc,doc,collection,serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next';
import { IncomingMessage, ServerResponse } from 'http';
import { useGoogleAuth } from '@/firebase/utils'


interface Adtype {
  title: string,
  description: string,
  brand: string,
  location: string,
  img?:string,
  price:number|null,

}

const initialState: Adtype = {
  title: "",
  description: "",
  brand: "",
  location: "",
  price:null,
  

}

const createAd:NextPage = () => {
  

  const [inputValue, setInputValue] = useState('');
  const [displayCat,setdisplayCat]=useState< { [key: string]: any }>({})
   const [adData,setAdData]=useState<Adtype>(initialState)
   const {title,description,brand,location,price}=adData
  const [idData,setIdData]=useState<any>([])
  const router = useRouter();
  const [file, setFile] = useState<any>([])
  const {userId}=useGoogleAuth()
  console.log("dish==",idData)
  console.log("image==",file)
  const idCat  = useSelector((state: any) => state.id)
     console.log("catr==>",adData)
  


     const handleChange = (e: any) => {
      setAdData({ ...adData, [e.target.name]: e.target.value })
    }

     const handleImageUpload =async (event: React.ChangeEvent<HTMLInputElement>) => {
      

      const file = event.target.files?.[0]
      if(!file){
        return
      }
  const storageRef = storage.ref();
  const imageRef = storageRef.child(file.name);
    const imgList:any=[]
  try {
    await imageRef.put(file);
    console.log('Image uploaded successfully!');

    const imageUrl = await imageRef.getDownloadURL();
     console.log(imageUrl)
     
      if(imgList.length<6){
     imgList.push(imageUrl)
     setFile((prevUrls:any) => [...prevUrls, ...imgList])
      }
     
    
    console.log('Image URL stored in Firestore!');
  } catch (error) {
    console.error('Error uploading image:', error);
  }
    };
  
  // async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
  //   const files = event.target.files;
  //   if (!files || files.length === 0) {
  //     return;
  //   }

  //   const storageRef = storage.ref();
  //   const uploadedUrls:any = [];

  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     const imageRef = storageRef.child(file.name);

  //     try {
  //       await imageRef.put(file);
  //       console.log('Image uploaded successfully!');

  //       const url = await imageRef.getDownloadURL();
  //       uploadedUrls.push(url);
       
  //       console.log('Image URL stored in Firestore!');
  //     } catch (error) {
  //       console.error('Error uploading image:', error);
  //     }
  //   }

  //   setFile((prevUrls:any) => [...prevUrls, ...uploadedUrls]); // Append uploaded URLs to the state array
  // }

  
 const handleSubmit=async(e:any)=>{
  e.preventDefault();
  const dbRef = doc(collection(db, "AdDetail"));

  try {

    const payload = {
      file,
      userId,
      mainCat:idCat.mainCategory,
      subCat:idCat.subCategory,
      sub2Cat:idCat.sub2Category,
      ...adData,
      timestamp: serverTimestamp()
      
    }
      
      const userAdded = await setDoc(dbRef, payload);
      
      
       
      
      
      
      
     setAdData(initialState)
      setInputValue("")
     alert ("Update Successfull")
    
    
  } catch (error) {

  }


 }


  const preventMinus = async(event:any) => {
    let value = event.target.value;

    // Remove any negative sign from the input value
    value =await value.replace(/-/g, '');

    // Update the input field value
    setAdData({ ...adData, [event.target.name]: event.target.value })
    setInputValue(value);
  };
  
  // 
         
  type MyObject = {
    id: string;
    name?: string;
  };
  useEffect(()=>{
    setdisplayCat(idCat)
    const fetchData = async () => {
      try {
        const collectionRef = collection(db, 'Categories');
        const idArr:any=[]
        for (const key in idCat) {
          const value = idCat[key];
          
          if (value !== null) {
            const docRef = doc(collectionRef, idCat[key]);      
          
          const dataUse = (await getDoc(docRef))
          const getId:MyObject={id:dataUse.id, ...dataUse.data()}
          idArr.push(getId)
          console.log(idArr)
          
          }
        }
        setIdData(idArr)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  },[idCat])


  


  return (
    <div>
        <div className='flex bg-[#F7F8F8] border h-[70px] w-[100%]'>
        <div>
    <Link href="/sell"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" mt-6 ml-3 w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
</svg>
</Link>
</div>

       <div> 
       <Image
      src={Logo}
      alt="Picture of the author"
      className='h-[60px] w-[65px] ml-5'
       />
        </div>
        {/* <div>
        <img src={file} alt="no image" />
        </div> */}
    </div>

    <div>

    <div>
        <h1 className='flex flex-col items-center font-sans text-xl font-bold mt-3 text-[#2B5A5E]'>POST YOUR AD</h1>
    </div>

    <div className='ml-[250px] border mt-3 border-[#002F345B] h-[1250px] w-[70%] rounded'>

      <div className='border-b border-[#002F345B] h-[90px]'>
        <div className='font-semibold font-sans text-lg mt-4 ml-3'>SELECTED CATEGORY</div>
        <div className='flex font-sans text-sm mt-4 ml-3'>
        {idData.map((item:any)  => (
        <div key={item.id} >
          
          
          <div className=''>/{item.name}</div>
          
          
          

        </div>
      ))}
        </div>
      </div>

      <div className=''>
        <div className='font-sans text-lg font-bold mt-8 ml-6' >INCLUDE SOME DETAILS</div>
        <div>
        
<form onSubmit={handleSubmit}>
  <div className='border-b border-[#002F345B] h-[400px]'>
  <div className='ml-6 mt-3'>
  <label htmlFor="title" className='text-sm font-sans '>Ad title</label> <br />
  <input
    type="text"
    id="title"
    name="title"
    value={title}
    required={true}
    minLength={10}
    maxLength={20}
    onChange={handleChange}
    className='w-[90%] h-[40px] border border-black rounded-md p-2.5 focus:outline-none  focus:ring-0 focus:ring-blue-500 focus:border-blue-500'
  />
  
  </div>
  <div className='ml-6 mt-3 '>
  
  
<label htmlFor="description" className="block mb-2 text-sm  text-gray-900 dark:text-white">Description</label>
<textarea name="description" value={description} onChange={handleChange}  className=" p-2.5 w-[90%] h-[190px] text-sm  text-gray-900  rounded-md border border-black focus:outline-none  focus:ring-0 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write description of your Ad"></textarea>



  </div>

  
  <div className='ml-6 mt-3 '>
      <label htmlFor="brand" className='text-sm font-sans '>Brand</label><br />
      <input
    type="text"
    id="brand"
    name="brand"
    value={brand}
    required={true}
    minLength={10}
    maxLength={20}
    onChange={handleChange}
    className='w-[90%] h-[40px] border border-black rounded-md focus:outline-none p-2.5 focus:ring-0 focus:ring-blue-500 focus:border-blue-500'
  />
    </div>

    </div>

    <div className='border-b border-[#002F345B] h-[150px]'>
      <div className='font-sans text-lg font-bold mt-8 ml-6'><h2>SET A PRICE</h2></div>
      <div className='ml-6 mt-3 '>
      <label htmlFor="price" className='text-sm font-sans '>Price</label><br />
      <input
    type="number"
    id="price"
    name="price"
    
    required={true}
    placeholder='Enter price in Rs'
    minLength={4}
    min={0}
    
    onChange={preventMinus}
    value={inputValue}
    className='w-[90%] h-[40px] border border-black rounded-md focus:outline-none p-2.5 focus:ring-0 focus:ring-blue-500 focus:border-blue-500'
  />
    </div>
    </div>
    <div  className='border-b border-[#002F345B] h-[170px]'>
    <div className='font-sans text-lg font-bold mt-8 ml-6'><h2>UPLOAD UPTO 5 PHOTOS</h2></div>
    <div className='flex'>
      
          {/* file[idx] ? Image: Box */}

    {Array.from({length: 5}).map((_, idx) => (
      <div>{file[idx]?
         <div  className='mt-5 ml-10 h-24 w-24 border-2 border-black'><img className='h-[92px] w-24' src={file[idx]} alt="" />
         
         </div>
         :( <div className='mt-5 ml-10'><input  onChange={handleImageUpload} type="file" className="absolute  w-24 h-24  opacity-0 border-2" />
         <div className=' border-2 border-[#ccd5d6] h-24 w-24 flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="flex flex-col items-center w-8 h-8">
           <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
           <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
           </svg>
         </div>
       </div>)}
         </div>
     
   

))}


          {/* <div className='mt-5 ml-10'><input  type="file" className="absolute  w-24 h-24  opacity-0 border-2" />
<div className=' border-2 border-[#ccd5d6] h-24 w-24 flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="flex flex-col items-center w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
</svg>
</div>
          </div>

          <div className='mt-5 ml-10'><input  type="file" className="absolute  w-24 h-24  opacity-0 border-2" />
<div className=' border-2 border-[#ccd5d6] h-24 w-24 flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="flex flex-col items-center w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
</svg>
</div>
          </div>

          <div className='mt-5 ml-10'><input  type="file" className="absolute  w-24 h-24  opacity-0 border-2" />
<div className=' border-2 border-[#ccd5d6] h-24 w-24 flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="flex flex-col items-center w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
</svg>
</div>
          </div>

          <div className='mt-5 ml-10'><input  type="file" className="absolute  w-24 h-24  opacity-0 border-2" />
<div className=' border-2 border-[#ccd5d6] h-24 w-24 flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="flex flex-col items-center w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
</svg>
</div>
          </div> */}

     
      
     
     
      
    </div>
    </div>
    <div className='border-b border-[#002F345B] h-[150px]'>
      <div className='font-sans text-lg font-bold mt-8 ml-6'><h2>YOUR AD'S LOCATION</h2></div>
    <div className='ml-6 mt-3 '>
      <label htmlFor="location" className='text-sm font-sans '>Location</label><br />
      <input
    type="text"
    id="location"
    name="location"
    value={location}
    required={true}
    minLength={10}
    maxLength={20}
    onChange={handleChange}
    className='w-[90%] h-[40px] border border-black rounded-md focus:outline-none p-2.5 focus:ring-0 focus:ring-blue-500 focus:border-blue-500'
  />
    </div>
    </div>

 <div className=' mt-6 ml-6  '><button type="submit" className=' px-10 py-3 cursor-pointer text-[15px] font-semibold text-white bg-[#002f34] rounded-md   '>POST AD</button>
            </div>
</form>
        </div>
      </div>





    </div>

    </div>

    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   if ((req as IncomingMessage).url === '/Ads/createAd') {
//     (res as ServerResponse).setHeader('Location', '/sell');
//     (res as ServerResponse).statusCode = 302;
//     (res as ServerResponse).end();
//   }

//   return {
//     props: {},
//   };
// };

export default createAd