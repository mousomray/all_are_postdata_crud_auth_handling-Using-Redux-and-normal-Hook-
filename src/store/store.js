import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../Auth/authslice" // In this case we use { } because we not do export default only do export
import adddetailslice from "../Allreducers/addslice"
import showdetails from "../Allreducers/showslice"
import singledetails from "../Allreducers/detailslice"
import profiledetails from "../Allreducers/profileslice"




export const store = configureStore({
    reducer: {
        Auth: AuthSlice.reducer, // Reducer for Auth 
        Add: adddetailslice,
        Show: showdetails,
        Details: singledetails,
        Profile: profiledetails
       
    },
});