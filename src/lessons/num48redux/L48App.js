import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Loader from '../../loaders/Loader';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import Registration from './components/Registration/Registration';
import './L48App.css';
import { AuthContext } from '../../context/AuthContent';
import { useDispatch } from 'react-redux';
import { fetchUsers } from './redux/users/userSlice';

const Home = lazy(()=>import('./pages/home/Home'))
const About = lazy(()=>import('./pages/about/About'))
const Contact = lazy(()=>import('./pages/contact/Contact'))
const NotFoundPage = lazy(()=>import('./pages/not-found/NotFoundPage'))
const Layout = lazy(()=>import('./components/Layout/Layout'))
const SingleContact = lazy(()=>import('./pages/singleContact/SingleContact'))
const AddContact = lazy(()=>import('./components/AddContact'))
const Login = lazy(()=>import('./pages/login/Login'))

function L48app() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('email')
  );

  const dispatch = useDispatch()

  // const { data: usersList, isFetching } = useQuery({
  //   queryKey: ['userList'],
  //   queryFn: getAllUsers,
  //   refetchOnReconnect: false,
  //   refetchOnWindowFocus: false,
  // });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route 
              path='/' 
              element={<Layout/>}
            >
              <Route index element={<Home/>}/>
              <Route 
                path='/login' 
                element={
                  isAuthenticated ? (
                    <Navigate to='/contact' replace={true}/>
                  ) : (
                    <Login/>
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

export default L48app;
