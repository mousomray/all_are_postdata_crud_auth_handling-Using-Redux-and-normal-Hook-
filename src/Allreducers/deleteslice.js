import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // createSlice make state slice and createAsyncThunk handle asynconomous function 
import axiosInstance from '../api/api'
import { toast } from "react-toastify"; // For Toast Message

// Call Api for Delete User
export const deleteproduct = createAsyncThunk("deleteproduct", async (id, { rejectWithValue }) => {
    try {
        const apiurl = 'product/remove'
        const response = await axiosInstance.post(apiurl, { id });
        console.log("Fetching delete data", response);
        toast.warning(response?.data?.message)
        return response.data
    } catch (error) {
        console.log("Error Fetching delete data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});

