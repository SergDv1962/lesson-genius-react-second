import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

import { Provider } from 'react-redux'
import { store } from './lessons/num48redux/store/store';

import './index.css';


// import App from './App';
// import Lessons from './lessons/Lessons';
// import Exercises from './exercises/Exercises';
// import HW from './homewoks/HW';
// import MyExercises from './myexercies/MyExercices';
import Todos from './todos/Todos';
// import ExerciseQuery from './exercises/query/ExerciseQuery';
// import Mutation from './exercises/mutation/Mutation';
// import SiteQuery from './exercises/siteQuery/SiteQuery';

export const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
//<React.StrictMode>
  <>
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* <App /> */}
        {/* <Exercises/> */}
        {/* <Lessons/> */}
        {/* <HW/> */}
        {/* <MyExercises/> */}
        <Todos/>
        {/* <ExerciseQuery/> */}
        {/* <Mutation/> */}
        {/* <SiteQuery/> */}
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>
    
  </>
//</React.StrictMode> 
  
  
);

