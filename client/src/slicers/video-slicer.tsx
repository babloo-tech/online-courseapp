
import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    videos: [],
    videosCount: 0
  },
  reducers: {
    addToSavedList: (state:any, action) => {  // addToSavedList in ruducers function
      state.videos.push(action.payload);  // store in videos:[]
      state.videosCount = state.videos.length; // store in videosCount
    }
  }
});

export const { addToSavedList } = videoSlice.actions; // destructored of array
export default videoSlice.reducer;  // import in store as name of videoReducer
