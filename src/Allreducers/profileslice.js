import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

// Call Api for profile Slider
export const profile = createAsyncThunk("profile", async (_, { rejectWithValue }) => {
    try {
        const apiurl = 'user/profile-details'
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching profile data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching profile data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const profiledetails = createSlice({
    name: "profiledetails",
    initialState: {
        profiledata: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(profile.pending, (state) => {
                state.loading = true;
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.loading = false;
                state.profiledata = action.payload;
            })
            .addCase(profile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default profiledetails.reducer;