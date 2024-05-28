import { useQuery } from "react-query";

const useGetPlanet = (planetURL) => useQuery(
   ['planets', planetURL],
   () => fetch(planetURL).then(res => res.json()),
   {
      enabled: !!planetURL,
   }
) 

const UQuery06planet = ({planetUrl}) => {
   const {data: planets} = useGetPlanet(planetUrl);
   console.log(planets);
   
   return (
      <>
         Planet: <b>{planets?.name}</b>
         {' '}
         Diameter: <b>{planets?.diameter}</b>
      </>
   )
}
 
export default UQuery06planet;