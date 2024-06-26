import { useQuery } from "react-query"

function Example() {
const { isLoading, error, data, status } = useQuery({
   queryKey: ['repoData'],
   queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
      res.json(),
      ),
})
console.log(status);

if (isLoading) return 'Loading...'
if (error) return 'An error has occurred: ' + error.message
return (
   <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
   </div>
)
}




const UQuery01 = () => {
   return ( 
      <>
         <Example/>
      </>
    );
}
 
export default UQuery01;

