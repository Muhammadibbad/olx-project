import { Input } from 'postcss'
import React from 'react'
// import {Car} from "../../../public/photo-1605559424843-9e4c228bf1c2.jpg"
import { useState, useEffect } from 'react'
import { db, firestore, storage } from '@/firebase/utils'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { collection, query, addDoc, serverTimestamp,setDoc, where, deleteDoc } from "firebase/firestore";
import { NextPage, GetServerSideProps } from "next";
import { useGoogleAuth } from '@/firebase/utils'
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { addProfile, delProfile } from '@/redux/features/auth-slice'





interface Person {
  name: string;
  email: string;
  about: string,
  img?: string,

  contact: number | null,
}

interface Error {
  name?: string;
  email?: string;
  about?: string,
  contact?: string,
}

const initialState: Person = {
  name: "",
  email: "",
  contact: null,
  about: "",
  

}

const error_data = {
  'name': "Name is required",
  'email': "Email is required",
  'contact': "Contact is required",
  'about': "About is required"
}

const Profile = () => {


  const dispatch = useDispatch<AppDispatch>()
   const userProf  = useSelector((state: any) => state.profile)
   console.log("dash==?>",userProf)
  const [data, setData] = useState<Person>(initialState)
  const { name, email, about, contact} = data
  const [file, setFile] = useState<any>("")
  const [progress, setProgress] = useState<number | null>(null)
  const [error, setError] = useState<any>({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [errors, setErrors] = useState({ name: false, email: false, about: false, contact: false });
   
  const [loading, setLoading] = useState(false)
  const { userId, user } = useGoogleAuth()
  
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    console.log("image==>", selectedFile)
    setFile(selectedFile);
  };

  const validate = () => {
    let errors: Error = {};
    if (!name) {
      setErrors((prev) => ({ ...prev, name: true }))
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: true }))
    }
    if (!about) {
      setErrors((prev) => ({ ...prev, about: true }))
    }
    if (!contact) {
      setErrors((prev) => ({ ...prev, contact: true }))
    }
    return errors
  }



  useEffect(()=>{
    setData(userProf)
  },[userProf])






  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmit(true)

    let errors = validate();
    if (Object.keys(errors as any).length) return setError(errors)


    const dbRef = doc(db, "Profile",`${userId}`);

    try {

      const payload = {
        userId,
        ...data,
        timestamp: serverTimestamp()
      }
        
        const userAdded = await setDoc(dbRef, payload);
        
        const docRef = doc(db, 'Profile', `${userId}`)
         const dataUse = (await getDoc(docRef))
         const getUser={id:dataUse.id, ...dataUse.data()}
        
        
        console.log('get', getUser)
        
       
         dispatch(addProfile(getUser)) 
       alert ("Update Successfull")
      
      
    } catch (error) {

    }



  }


  const delDoc=async()=>{
     const remUser=await deleteDoc(doc(db, "Profile", `${userId}`));
     const newPerson: Person = {
      name: "",
      email: "",
      contact: null,
      about: "",
      img:""
    
     }
    
    
     dispatch(delProfile(newPerson))
    alert("Delete Data")
  }
  






  type YourObjectType = {
    timestamp: any;
    id: string;
    userId?: string;
  };

  // useEffect(()=>{
  const uploadFile = async () => {
    const name = new Date().getTime() + file.name
    const storageRef = ref(storage, file.name)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setProgress(progress)
      switch (snapshot.state) {
        case "paused":
          console.log("upload is paused")
          break
        case "running":
          console.log("upload is running")
          break;
        default:
          break;
      }
    }, (error) => {
      console.log(error)
    },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setData((prev) => ({ ...prev, img: downloadURL }))

        })
      }
    )

  }





  return (
    <div>
      <div className='border border-[#CCD5D6] rounded-md ml-[400px] mt-28 w-[50%] h-[950px]'>
        <div className=" border-b ml-10 mr-10 border-[#CCD5D6]   h-14   ">
          <h1 className='text-[23px] mt-5 font-s font-semibold text-black'>Edit Profile</h1>
        </div>

        <div className=" border-b border-[#CCD5D6] ml-10 mr-10 h-44  text-2xl font-serif flex">
          
          <div className='  mt-10 '><img className=' h-24 w-24 rounded-full' src={userProf.img? userProf.img: "vector-users-icon.webp"} alt="" /></div>

          <div className='mt-16 ml-10'><input onChange={handleImageUpload} type="file" className="absolute  w-40 h-18 opacity-0 border-2" />
            <button className="px-4 py-2  text-white text-[20px] bg-[#002F34] rounded-md ">
              Choose File
            </button>
          </div>
          <div className='mt-16 '><h2 onClick={uploadFile} className='flex flex-col items-center px-4 py-2 cursor-pointer text-[20px] text-white bg-red-500 rounded-md hover:bg-red-600 ml-[20px]'>Upload Image</h2></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='border-b ml-10 mr-10  border-[#CCD5D6] h-28 '>
            <div className=' mt-2 text-xl font-medium font-sans'><h1>Name:</h1>
            </div>

            <div className=' mt-2'><input className='w-[500px] h-10 border border-black  placeholder:px-3 focus:px-3 focus:ring-2 focus: ring-[#C8F8F6] focus:outline-none focus:border-transparent   ' name="name" onChange={handleChange} autoFocus value={name} type="text" placeholder=' Enter Your Name' /></div>
            {errors.name ? error_data['name'] : null}
          </div>
          <div className='border-b ml-10 mr-10  border-[#CCD5D6] h-28 '>
            <div className=' mt-2 text-xl font-medium font-sans'><h1>Email:</h1></div>
            <div className=' mt-2'><input className='w-[500px] h-10 border border-black placeholder:px-3 focus:px-3  focus:ring-2 focus: ring-[#C8F8F6] focus:outline-none focus:border-transparent   ' name="email" onChange={handleChange} value={email} type="text" placeholder=' Enter Your Email' /></div>
            {errors.email ? error_data['email'] : null}

          </div>
          <div className='border-b ml-10 mr-10  border-[#CCD5D6] h-28 '>
            <div className='mt-2 text-xl font-medium font-sans'><h1>About Me:</h1></div>
            <div className=' mt-2'><input className='w-[500px] h-10 border border-black placeholder:px-3 focus:px-3  focus:ring-2 focus: ring-[#C8F8F6] focus:outline-none focus:border-transparent   ' name="about" type="text" onChange={handleChange} value={about} placeholder=' About Yourself' /></div>
            {errors.about ? error_data['about'] : null}

          </div>
          <div className='border-b ml-10 mr-10  border-[#CCD5D6] h-28 '>
            <div className='mt-2 text-xl font-medium font-sans'><h1>Contact No:</h1></div>
            <div className=' mt-2'><input className='w-[500px] h-10 border border-black placeholder:px-3 focus:px-3   focus:ring-2 focus: ring-[#C8F8F6] focus:outline-none focus:border-transparent   ' name="contact" type="number" onChange={handleChange} value={!contact ? "" : contact} placeholder=' Enter Your Contact No' /></div>
            {errors.contact ? error_data['contact'] : null}

          </div>
          <div className='flex ml-10 mr-10  border-b  border-[#CCD5D6] h-28'>
            <div className='mt-10   '><button type="submit" disabled={progress !== null && progress < 100} className=' px-4 py-2 cursor-pointer text-[15px] text-white bg-red-500 rounded-md hover:bg-red-600  '>Save Changes</button>
            </div>
            </div>
            <div className='ml-10 mr-10'>
            <div className='mt-10 flex flex-col items-center  '><h2 onClick={delDoc} className='flex flex-col items-center  px-4 py-2 w-[170px]  text-white text-[15px] bg-[#002F34] rounded-md  '>Delete Account</h2>
            </div>
            </div>
        </form>
        
      </div>
    </div>
  )
}
// export const getServerSideProps :GetServerSideProps= async (context) => {
//   // Fetch data from Firestore

//   type YourObjectType = {
//     timestamp: any;
//     id: string;
//     userId?: string;
//   };
//   const {user} = useGoogleAuth;

//   // let list:any=[]
//   // const id=context.params.id
// //   const querySnapshot = await firestore.collection('Profile').get();
// //   const data=querySnapshot.docs.map((doc)=>{
// //     list.push({id:doc.id,...doc.data()})
// //   })
//   // console.log(user)
// const entries = await firestore.collection("Profile").get();
// const profData=entries.docs.map((doc) => {

//   const documentData = doc.data();

//   return {
//     id:doc.id,
//     ...documentData,
//     timestamp: documentData.timestamp.toString(),
//   };
// });

// //  const filteredUsers = profData.filter(filt => (filt as YourObjectType).userId === user.uid  );


// // firestore.collection("Profile").doc(userId).get()
// //   .then((doc) => {
// //     if (doc.exists) {
// //       const documentData = doc.data();
// //       console.log(documentData);
// //     } else {
// //       console.log("Document not found");
// //     }
// //   })
// //   .catch((error) => {
// //     console.error("Error fetching document:", error);
// //   });


//   return {
//     props: {
//       userProf:profData||null
//     },
//     // revalidate: 3600, // Optional: Add revalidation time in seconds if you want to use Incremental Static Regeneration (ISR)
//   };
// }
export default Profile

