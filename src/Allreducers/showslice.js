import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

// Call Api for show Slider
export const show = createAsyncThunk("show", async (data, { rejectWithValue }) => {
    try {
        const apiurl = 'product/list'
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching show data", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching show data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const showdetails = createSlice({
    name: "showdetails",
    initialState: {
        showdata: [],
        totalpage: "", // Make For Pagination 
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(show.pending, (state) => {
                state.loading = true;
            })

            .addCase(show.fulfilled, (state, action) => {
                state.loading = false;
                state.showdata = action.payload.data;
                state.totalpage = action.payload.totalPages; // For Pagination
            })

            .addCase(show.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default showdetails.reducer;