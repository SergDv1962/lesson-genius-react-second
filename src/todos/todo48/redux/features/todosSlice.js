import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteTodo, getTodos } from "../../pages/appTodo/api/Api.js";
import axios from "axios";
import { useDate } from "../../pages/appTodo/components/customs/useDate.js";

export const fetchTodos = createAsyncThunk(
   'todos/fetchTodos',
   getTodos
);

export const deleteTodos = createAsyncThunk(
   'todos/deleteTodos',
   deleteTodo
);

export const addNewTodos = createAsyncThunk(
  'todos/addNewTodos',
  async function ({title, info}, {rejectWithValue, dispatch}) {
   try {
      const payload = {
         title: title,
         description: info,
         checked: "false",
         creationDate: useDate(),
      };
      const response = await axios.post('http://localhost:3030/todos', payload);
      const data = response.data;
      dispatch(addTodoNew(data))
   } catch (error) {
      return rejectWithValue(error.message)
   }
  }
);

export const editTodos = createAsyncThunk(
   'todos/editTodos',
   async function ({editTodoId, payload}, {rejectWithValue}) {
      try {
         const response = await axios.put(`http://localhost:3030/todos/${editTodoId}`, payload);
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      } 
   }
);

export const toggleCheckbox = createAsyncThunk(
   'todos/toggleCheckbox',
   async function ({id, payload}, {rejectWithValue}) {
      try {
         console.log(id, payload)
         const response = await axios.put(`http://localhost:3030/todos/${id}`, payload);
         return response.data
      } catch (error) {
         rejectWithValue(error.message)
      }
   }
)

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
   reducers: {
      addTodoNew: (state, action) => {
         state.todos.push(action.payload)
      },
   },
   extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, setError);
    builder.addCase(deleteTodos.rejected, setError);
    builder.addCase(addNewTodos.rejected, setError);
    builder.addCase(editTodos.rejected, setError);
  },

});

const { addTodoNew } = todosSlice.actions;

export default todosSlice.reducer;