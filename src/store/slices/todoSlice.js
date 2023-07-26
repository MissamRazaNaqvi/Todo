import { createSlice } from "@reduxjs/toolkit";
import { getUserData, userVerify } from "../actions/todoAction";

const initialState = {
    // todos: [],
    verify: [],
    userNotes: [],
    showForm: false,
    isSetLogin: false,
    error: null,
    loading: false,
};

export const todosSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        setlogin: (state, action) => {
            state.isSetLogin = action.payload
        },
        setLogout: (state, action) => {
            state.isSetLogin = action.payload
        },
        setShowForm: (state, action) => {
            // console.log('action.payload', action.payload)
            state.showForm = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            /** * Get All Todos */
            // .addCase(getTodos.pending, (state, action) => {
            //     state.loading = true;
            // })
            // .addCase(getTodos.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.todos = action.payload;
            // })
            // .addCase(getTodos.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // })
            .addCase(userVerify.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(userVerify.fulfilled, (state, action) => {
                state.loading = false;
                state.verify = action.payload;
            })
            .addCase(userVerify.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserData.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.userNotes = action.payload;
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export default todosSlice.reducer;
export const { setlogin, setLogout, setShowForm } = todosSlice.actions

