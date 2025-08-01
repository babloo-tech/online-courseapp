import { createSlice } from "@reduxjs/toolkit";

let videoSlice=createSlice({
  name:'video',
  initialState:{
    videos:[],
    videosCount:0
  },
  reducers:{
    addToSavedList:(state:any,action)=>{
      state.videos.push(action.payload)
      state.videosCount=state.videos.length;
    }
   
  }
})

export const{addToSavedList} =videoSlice.actions
export default videoSlice.reducer;

 



























// import   { createSlice }  from  '@reduxjs/toolkit'


// const initialState = {
//   videos: [ ],                // saved videos list
//   videosCount: 0            // saved videos count
// }

// const  videoSlice = createSlice({
//   name : 'videos',
//   initialState,
//   reducers: {
//      addToSavedList : (state:any, action) => {
//          state.videos.push(action.payload);
//          state.videosCount = state.videos.length;
//       },
//      removeForSavedList: ( ) =>{  
//          // logic to remove data from store
//       }
//   }
// })

// export const { addToSavedList,removeForSavedList } = videoSlice.actions;
// export default videoSlice.reducer;
