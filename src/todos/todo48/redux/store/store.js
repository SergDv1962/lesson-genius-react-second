import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/usersSlice";
import todosSlice from "../features/todosSlice";

export const store = configureStore({
   reducer: {
      users: usersSlice,
      todos: todosSlice,
   }
})