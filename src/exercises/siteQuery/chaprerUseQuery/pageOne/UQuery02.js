import { useQuery } from "react-query"

function Example() {
const {isFetching, isSuccess, isError} = useQuery({
   queryKey: ['repoData'],
   queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
      res.json(),
      ),
})
console.log(isFetching, isSuccess, isError);

// if (isLoading) return 'Loading...'
// if (error) return 'An error has occurred: ' + error.message
return (
   <div>
      {/* <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong> */}
   </div>
)
}




const UQuery02 = () => {
   return ( 
      <>
         <Example/>
      </>
    );
}
 
export default UQuery02;

