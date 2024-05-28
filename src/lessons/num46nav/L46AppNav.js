import { Suspense, lazy, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
// import Home from './pages/home/Home';
// import About from './pages/about/About';
// import Contact from './pages/contact/Contact';
// import NotFoundPage from './pages/not-found/NotFoundPage';
// import Layout from './components/Layout/Layout';
// import SingleContact from './pages/singleContact/SingleContact';
// import AddContact from './components/AddContact';
// import Login from './pages/login/Login';
import './L46AppNav.css';
import Loader from '../../loaders/Loader';
import { useQuery } from 'react-query';
import { getAllUsers } from './api/api';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import Registration from './components/Registration/Registration';


const Home = lazy(()=>import('./pages/home/Home'))
const About = lazy(()=>import('./pages/about/About'))
const Contact = lazy(()=>import('./pages/contact/Contact'))
const NotFoundPage = lazy(()=>import('./pages/not-found/NotFoundPage'))
const Layout = lazy(()=>import('./components/Layout/Layout'))
const SingleContact = lazy(()=>import('./pages/singleContact/SingleContact'))
const AddContact = lazy(()=>import('./components/AddContact'))
const Login = lazy(()=>import('./pages/login/Login'))

function L46appNav() {
  const [loginUser, setLoginUser] = useState({ username: null, email: null});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: users, isFetching } = useQuery({
    queryKey: ['userList'],
    queryFn: getAllUsers,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: () => {
      console.log(users);
      if (!!users?.find(el => el.email === loginUser.email)) {
        setIsAuthenticated(true);
        return alert('Можете користуватись')
      }
    }
  });

  console.log({ users, loginUser });
  console.log(loginUser.email);
  console.log(isAuthenticated);

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
                  isAuthenticated={isAuthenticated} />}
            >
              <Route index element={<Home/>}/>
              <Route 
                path='/login' 
                element={
                  <Login 
                    setLoginUser={setLoginUser}
                  />}
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

export default L46appNav;
