import { useState } from "react";
import { useQuery } from "react-query";
import UQuery06planet from "./UQuery06planet";

const useGetFilm = (film) =>
  useQuery(
   ['films', film], 
   () => fetch(`http://swapi.dev/api/films?search=${film}`)
      .then((res) => res.json()),
   {
      cacheTime: 2000,
      enabled: !!film,
      staleTime: 6000,
   }
  );

const SearchFilm = ({ film }) => {
   const {data: { results = []} = {}} = useGetFilm(film);
   console.log(results);
   
   return (
      <>
         {results.map(el => 
            <li key={el.title}>
               <>
                  {el.title}
                  {el.planets.map((item, inx) => 
                     <p key={inx}><UQuery06planet planetUrl={item}/></p>)}
                  
               </> 
            </li>)}
      </>
   )
}

const UQuery06cearch = () => {
  const [film, setFilm] = useState("");

  return (
    <>
      <input
        type="text"
        value={film}
        onChange={(e) => setFilm(e.target.value)}
      />
      <SearchFilm film={film}/>
    </>
  );
};

export default UQuery06cearch;
