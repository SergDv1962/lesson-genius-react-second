
import { Route, Routes } from "react-router-dom";
import Films from "./Films";
import FilmPage from "./FilmPage";


const ExerciseQuery = () => {
   
   return ( 
      <div>
        <Routes>
          <Route path={'/:filmId'} element={<FilmPage/>}/>
          <Route path={'/'} element={<Films/>}/>
        </Routes>
      </div>
    );
}
 
export default ExerciseQuery;