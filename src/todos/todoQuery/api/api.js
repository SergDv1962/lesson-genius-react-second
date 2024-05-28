import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3030/'

export async function getTodosList (url) {
   const response = await axios.get(url);
   return response.data
}

export async function addTodo ( payload) {
   const response = await axios.post('todos', payload);
   return response.data
}

export async function deleteTodo (id) {
   const response = await axios.delete(`todos/${id}`);
   return response.data
}

export async function getEditTodo (id, payload) {
   const response = await axios.put(`todos/${id}`, payload);
   return response.data
}