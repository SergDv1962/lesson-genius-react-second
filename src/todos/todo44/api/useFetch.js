import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = 'http://localhost:3030/';

export const useFetch = (url) => {
   const [data, setData] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');

   const fetchData = async () => {
      setIsLoading(true);
      try {
         const response = await axios.get(url);
         setData(response.data);
      } catch (error) {
         console.warn('Something went wrong')
         setError(error.message);
         
      } finally {
         setIsLoading(false);
      }
   }
  useEffect(()=>{
   fetchData()
  },[])
   
   return {data, isLoading, error}
}