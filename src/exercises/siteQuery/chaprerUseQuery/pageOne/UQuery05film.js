import { useQuery } from "react-query";

const useGetFilms = () => useQuery({
      queryKey: ['films'],
      queryFn: () => fetch('http://swapi.dev/api/films')
         .then(res => res.json())
   });
   
const useGetPlanets = () => useQuery({
      queryKey: ['planets'],
      queryFn: () => fetch("https://swapi.dev/api/planets")
         .then(res => res.json())
   });

const UQuery05film = () => {

   const {data: {results = []} = {}} = useGetFilms();
   console.log(results);

   const {data: planet} = useGetPlanets();
   console.log(planet);
   
   
   return ( 
      <>
         
         <ul>
            {results.map((item) => 
               <li key={item.title}>
                  <>
                     {item.title}
                     {item.planets.map((el, ind) => 
                        <p>
                           <a key={ind} href={el} target="_blank" rel="noreferrer">{el}</a>
                        </p>
                        )}
                  </>
               </li>)}
         </ul>
      </>
    );
}
 
export default UQuery05film;