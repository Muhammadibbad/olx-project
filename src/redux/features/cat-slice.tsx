"use client"
import {createSlice,PayloadAction} from "@reduxjs/toolkit"

interface catType {
    name?: string|null;
    parentId?: string|null;
    id?: string|null,
   
  }
  interface catState {
    objects: catType[];
  }


  const initialState: catState = {
    objects: []
  };

const cat =createSlice({
      name:"cat",
      initialState,
      reducers:{
        setObjects: (state, action: PayloadAction<Object[]>) => {
          
            state.objects = action.payload;
          console.log("action",action)
      console.log("state" ,state)
         
        },
        
        
        
      }
})


export const { setObjects} = cat.actions;
export default cat.reducer;

