import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3030/';

export const getContactsList = async () => {
   const contacts = await axios.get('contacts');
   return contacts.data;
}

export const addContact = async (payload) => {
   const contacts = await axios.post('contacts', payload);
   return contacts.data;
}

export const getSingleContact = async (id) => {
   const contact = await axios.get(`contacts/${id}`);
   return contact.data;
}

export const deleteContact = async (id) => {
   await axios.delete(`contacts/${id}`);
}


export const getAllUsers = async () => {
   const contacts = await axios.get('auth');
   return contacts.data;
}

export const addNewUser = async (payload) => {
   const contacts = await axios.post('auth', payload);
   return contacts.data;
}