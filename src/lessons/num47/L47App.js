import { Suspense, lazy, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loader from '../../loaders/Loader';
import { getAllUsers } from './api/api';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import Registration from './components/Registration/Registration';
import './L47App.css';
import { AuthContext } from '../../context/AuthContent';

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
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route 
              path='/' 
              element={
                <Layout 
                  isFetching={isFetching} />}
            >
              <Route index element={<Home/>}/>
              <Route 
                path='/login' 
                element={
                  isAuthenticated ? (
                    <Navigate to='/contact' replace={true}/>
                  ) : (
                    <Login usersList={usersList} />
                  )
                  }
              />
              <Route path='/about' element={
                <PrivateRoutes>
                  <About/>
                </PrivateRoutes>
                }
              />
              <Route 
                path='/contact' 
                element={
                  <PrivateRoutes>
                    <Contact/>
                  </PrivateRoutes>
                }
              />
              <Route path='/contact/:id' element={
                <PrivateRoutes>
                  <SingleContact/>
                </PrivateRoutes>
                }
              />
              <Route path='/contact/addcontact' element={
                <PrivateRoutes>
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
      </AuthContext.Provider>
    </div>
  );
}

export default L47app;
