"use client"
import {createSlice,PayloadAction} from "@reduxjs/toolkit"

// interface adType {
// //     title: string,
// //   description: string,
// //   brand: string,
// //   location: string,
// //   img?:string[],
// //   price:number|null,
// //   mainCat:string,
// //   subCat:string,
// //   sub2Cat:string,
// //   userId:string,
//   }

//   interface adState {
//     objects: adType[];
//   }

  
  const initialState: any = {
    objects: []
  };


const ad =createSlice({
      name:"ad",
      initialState,
      reducers:{
        // setAd(state,action:PayloadAction<any>){
        //   console.log("state" ,state)
        //   console.log("action",action)
        // //  state.title=action.payload.title
        // //  state.description=action.payload.description
        // //  state.brand=action.payload.brand
        // //  state.price=action.payload.price
        // //  state.location=action.payload.location
        // //  state.img=action.payload.img

        // },
        setObjects: (state, action: PayloadAction<any>) => {
          
            state.objects = action.payload;
          console.log("action",action)
      console.log("state" ,state)
         
        },
       
        
      }
})


export const { setObjects} = ad.actions;
export default ad.reducer;

