import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // createSlice make state slice and createAsyncThunk handle asynconomous function 
import axiosInstance from '../api/api'
import { toast } from "react-toastify"; // For Toast Message


// Call Api for create user
export const addproduct = createAsyncThunk("addproduct", async (data, { rejectWithValue }) => {

    try {
        const apiurl = "product/create"
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching Add user data", response);
        toast.success(response?.data?.message)
        return response.data;
    } catch (error) {
        console.log("Error Fetching Add User data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const adddetailslice = createSlice({
    name: "adddetail",
    initialState: {
        addsss: [],
        loading: false,
        error: null,
    },


    extraReducers: (builder) => {
        builder
            // Create User
            .addCase(addproduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(addproduct.fulfilled, (state, action) => {
                state.loading = false;
                state.addsss.push(action.payload);

            })
            .addCase(addproduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    },
});

export default adddetailslice.reducer;





