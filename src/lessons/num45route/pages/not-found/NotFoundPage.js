import { Link } from "react-router-dom";

const NotFoundPage = () => {
   const notFoundStyle = {
      width: '100%',
      height: 'calc(100vh - 70px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   }
   return ( 
      <div style={notFoundStyle}>
        <div>
            <h1>This page Not Found</h1>
            <Link to='/'>Press to go home page</Link>
         </div>
         
      </div>
    );
}
 
export default NotFoundPage;