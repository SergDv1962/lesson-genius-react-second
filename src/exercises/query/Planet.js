import { useQuery } from "react-query";

const useGetPlanet = (planetURL) => {
  return useQuery(
    ["planet", planetURL],
    () => {
      return new Promise((resolve) => setTimeout(resolve, 3000)     //--- L18 штучна затримка
         ).then(() => fetch(planetURL).then((res) => res.json())
      );
    },
    {
      enabled: !!planetURL,
      initialData: {
        name: "initial name",      //--- L18
      },
    }
  );
};

export const Planet = ({ planetUrl }) => {
  const { data, isLoading } = useGetPlanet(planetUrl);
  console.log(data);
  return <div>planet: {isLoading ? "..." : data.name}</div>;
};
