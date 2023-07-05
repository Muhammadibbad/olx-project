"use client"
import {createSlice,PayloadAction} from "@reduxjs/toolkit"

interface idType {
    mainCategory: string|null;
    subCategory: string|null;
    sub2Category: string|null,
   
  }



const newCat:idType = {
  mainCategory:null,
  subCategory: null,
  sub2Category:null,
}

const id =createSlice({
      name:"id",
      initialState:newCat,
      reducers:{
        addId(state,action:PayloadAction<{ propertyName: keyof idType; value: string | null }>){
          
          console.log("action",action)
        //  state.mainCategory=action.payload.mainCategory
        //  state.subCateory=action.payload.subCategory
        //  state.sub2Cateory=action.payload.sub2Category

        const { propertyName, value } = action.payload;
        
      state[propertyName] = value;
      console.log("state" ,state)
         
        },
        
        
        
      }
})


export const { addId} = id.actions;
export default id.reducer;

