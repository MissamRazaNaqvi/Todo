import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserData, fetchVerify } from "../api/todoapis";

// export const getTodos = createAsyncThunk('todo/getTodo', async () => {
//     let { data } = await fetchTodo()
//     return data
// })
export const userVerify = createAsyncThunk('notes/userVerify', async (token) => {
    let { data } = await fetchVerify(token)
    return data
})
export const getUserData = createAsyncThunk('userNotes/getUserData', async (token) => {
    let { data } = await fetchUserData(token)
    return data
})