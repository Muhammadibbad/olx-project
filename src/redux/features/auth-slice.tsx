"use client"
import {createSlice,PayloadAction} from "@reduxjs/toolkit"

interface Person {
    name: string;
    email: string;
    about: string,
    contact: number | null,
    img:string|null
  }
  
const userProfile:Person={
    name: '',
    email: '',
    contact: null,
    about:'',
    img:""
}

const newAd = {
  mainCategory: null,
  sub: null,
  subSub: null,
}

const profile =createSlice({
      name:"profile",
      initialState:userProfile,
      reducers:{
        addProfile(state,action:PayloadAction<any>){
          console.log("state" ,state)
          console.log("action",action)
         state.name=action.payload.name
         state.email=action.payload.email
         state.contact=action.payload.contact
         state.about=action.payload.about
         state.img=action.payload.img
        },
        delProfile(state,action:PayloadAction<any>){
          console.log("state" ,state)
          console.log("action",action)
          state.name=action.payload.name
         state.email=action.payload.email
         state.contact=action.payload.contact
         state.about=action.payload.about
         state.img=action.payload.img
         
        },
        fetchProfile(state,action:PayloadAction<any>){
          console.log("state" ,state)
          console.log("action",action)
          state.name=action.payload.name
         state.email=action.payload.email
         state.contact=action.payload.contact
         state.about=action.payload.about
         state.img=action.payload.img
         
        },
        
      }
})


export const { addProfile,delProfile,fetchProfile} = profile.actions;
export default profile.reducer;

