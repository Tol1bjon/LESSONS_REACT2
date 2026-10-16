import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../API/API";
import type { TInitialState } from "./Types";



const initialState: TInitialState = {
    user: [],
    error: [],
    loading: false
}


export const getUsers = createAsyncThunk("data/getUsers", async() => {
    try {
        const { data } = await axios.get(API)
        return data
    } catch (error) {
        console.log(error)
    }
})



export const deleteRedux = createAsyncThunk("data/deleteRedux", async(id: any, {dispatch}) => {
    try {
        await axios.delete(`${API}/${id}`)
        dispatch(getUsers())
    } catch (error) {
        console.log(error)
    }
})



export const addUserRedux = createAsyncThunk("data/addUserRedux", async(data: any, {dispatch}) => {
    try {
        await axios.post(API, data)
        dispatch(getUsers())
    } catch (error) {
        console.log(error)
    }
})

export const editUserRedux = createAsyncThunk("data/editUserRedux", async({ id, user }: any, { dispatch }) => {
    try {
        await axios.put(`${API}/${id}`, user)
        dispatch(getUsers())
    } catch (error) {
        console.log(error)
    }
})


export const Redux = createSlice({
    name:"data",
    initialState,
    reducers:{
    },

    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
        })
        .addCase(getUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const { } = Redux.actions

export default Redux.reducer