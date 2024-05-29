import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTodos } from "../../pages/appTodo/api/Api.js";

export const fetchTodos = createAsyncThunk(
   'todos/fetchTodos',
   getTodos
);

// export const addNewUser = createAsyncThunk(
//   'users/addNewUser',
//   addUser
// )

const setError = (state, action) => {
   state.status = false;
   state.error = action.error.message;
 }

export const todosSlice = createSlice({
   name: 'todos',
   initialState: {
      todos: [],
      status: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, setError);
   //  builder.addCase(addNewUser.rejected, setError);
  },

});

export default todosSlice.reducer;