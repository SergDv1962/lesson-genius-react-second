import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3030/';

export async function getContacts () {
   const response = await axios.get('contacts');
   return response.data;
};

export async function getInfoContact (id) {
   const response = await axios.get(`contacts/${id}`);
   return response.data
}