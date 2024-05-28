import { Link } from "react-router-dom";
import './NotFoundPage.css'

const NotFoundPage = () => {
   return ( 
      <div>
         <h2>404</h2>
         <h3>Page not found</h3>
         <Link to="/" className="btn btn-return">Back to home</Link>
      </div>
    );
}
 
export default NotFoundPage;