import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3030/';

export const getContactsList = async () => {
   const contacts = await axios.get('contacts');
   return contacts.data;
};

export const addContact =async (payload) => {
   const contacts = await axios.post('contacts', payload);
   return contacts.data;
}

export const deleteContact =async (id) => {
   await axios.delete(`contacts/${id}`);
}


export const getEditContact = async (editContactId) => {
   const contacts = await axios.get(`contacts/${editContactId}`);
   return contacts.data
}

export const editContact =async (id, payload) => {
   const contacts = await axios.put(`contacts/${id}`, payload);
   return contacts.data;
}