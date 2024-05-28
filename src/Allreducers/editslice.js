import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // createSlice make state slice and createAsyncThunk handle asynconomous function 
import axiosInstance from '../api/api'
import { toast } from "react-toastify"; // For Toast Message

export const updateproduct = createAsyncThunk("updateproduct", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `product/update`
        const response = await axiosInstance.post(apiurl, id);
        if (response && response?.data?.status === 200) {
            console.log("Fetching update data", response);
            toast.success(response?.data?.message)
        } else {
            toast.error(response?.data?.message);
        }
        return response.data;
    } catch (error) {
        console.log("Error Fetching update data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});


