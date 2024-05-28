import { Link } from "react-router-dom";

const PageError = ({erPage}) => {
   console.log(erPage, "hello error");

   return ( 
      <div>
         <h3>Page error</h3>
         <p>{erPage}</p>
         <Link to="/" className="btn btn-return">Back to home</Link>
      </div>
    );
}
 
export default PageError;