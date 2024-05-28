import { Suspense, lazy, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Loader from '../../loaders/Loader';
import { useQuery } from 'react-query';
import { getAllUsers } from './api/api';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import Registration from './components/Registration/Registration';
import './L47App.css';

const Home = lazy(()=>import('./pages/home/Home'))
const About = lazy(()=>import('./pages/about/About'))
const Contact = lazy(()=>import('./pages/contact/Contact'))
const NotFoundPage = lazy(()=>import('./pages/not-found/NotFoundPage'))
const Layout = lazy(()=>import('./components/Layout/Layout'))
const SingleContact = lazy(()=>import('./pages/singleContact/SingleContact'))
const AddContact = lazy(()=>import('./components/AddContact'))
const Login = lazy(()=>import('./pages/login/Login'))

function L47app() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('email')
  );

  const { data: usersList, isFetching } = useQuery({
    queryKey: ['userList'],
    queryFn: getAllUsers,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="App">
      <div>
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route 
              path='/' 
              element={
                <Layout 
                  isFetching={isFetching} 
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated} />}
            >
              <Route index element={<Home/>}/>
              <Route 
                path='/login' 
                element={
                  isAuthenticated ? (
                    <Navigate to='/contact' replace={true}/>
                  ) : (
                    <Login
                    usersList={usersList} 
                    setIsAuthenticated={setIsAuthenticated}
                  />
                  )
                  }
              />
              <Route path='/about' element={
                <PrivateRoutes isAuthenticated={isAuthenticated}>
                  <About/>
                </PrivateRoutes>
                }
              />
              <Route 
                path='/contact' 
                element={
                  <PrivateRoutes isAuthenticated={isAuthenticated}>
                    <Contact/>
                  </PrivateRoutes>
                }
              />
              <Route path='/contact/:id' element={
                <PrivateRoutes isAuthenticated={isAuthenticated}>
                  <SingleContact/>
                </PrivateRoutes>
                }
              />
              <Route path='/contact/addcontact' element={
                <PrivateRoutes isAuthenticated={isAuthenticated}>
                  <AddContact/>
                </PrivateRoutes>
                }
              />
              <Route path='/registrate' element={<Registration/>}/>
              <Route path='404page' element={<NotFoundPage/>}/>
              <Route path='*' element={<Navigate to={'404page'}/>}/>
            </Route>
          </Routes>
        </Suspense>
        
      </div>
    </div>
  );
}

export default L47app;
