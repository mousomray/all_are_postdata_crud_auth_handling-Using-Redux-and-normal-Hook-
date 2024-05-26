import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

// Call Api for single Slider
export const single = createAsyncThunk("single", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `product/detail/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching single data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching single data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const singledetails = createSlice({
    name: "singledetails",
    initialState: {
        singledata: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(single.pending, (state) => {
                state.loading = true;
            })
            .addCase(single.fulfilled, (state, action) => {
                state.loading = false;
                state.singledata = action.payload;
            })
            .addCase(single.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default singledetails.reducer;