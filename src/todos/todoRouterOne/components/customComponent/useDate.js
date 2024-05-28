const useDate = () => {
   const d = new Date();
   const date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`
   return date;
}
 
export default useDate;