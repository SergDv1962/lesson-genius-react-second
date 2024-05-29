import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3030';

export async function getTodos () {
    const response = await axios.get('todos');
   return response.data
}

export async function addTodo (payload) {
    const response = await axios.post('todos', payload);
    return response.data
}

export async function deleteTodo (id) {
    await axios.delete(`todos/${id}`);
}

export async function editTodo (id, payload) {
    const response = await axios.put(`todos/${id}`, payload);
    return response.data
}

export async function getAllUsers(){
    const response = await axios.get('auth');
    return response.data
}

export async function addUser(payload){
    const response = await axios.post('auth', payload);
    return response.data
}