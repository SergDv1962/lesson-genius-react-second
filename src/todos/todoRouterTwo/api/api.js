import axios from "axios";

axios.defaults.baseURL = "http://localhost:3030";

export async function getTodos() {
   const response = await axios.get('todos');
   return response.data;
}

export async function getEditTodo(id) {
   const response = await axios.get(`todos/${id}`);
   return response.data;
}

export async function putEditTodo(id, payload) {
   const response = await axios.put(`todos/${id}`, payload);
   return response.data;
}

export async function deleteTodos(id) {
   await axios.delete(`todos/${id}`);
}

export async function addTodo(payload) {
   const response = await axios.post('todos', payload);
   return response.data;
}