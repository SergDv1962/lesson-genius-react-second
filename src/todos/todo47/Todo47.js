import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "react-query";
import { Suspense, lazy, useState } from "react";
import Loader from "../../loaders/Loader";
import Layout from "./layout/Layout";
import PageError from "./pages/page-error/PageError";
import Login from "./pages/login/Login";
import PrivateRoutes from "./pages/appTodo/components/PrivateRoutes";
import { getAllUsers } from "./pages/appTodo/api/Api";
import Registration from "./registration/Registration";
import { AuthContext } from "../../context/AuthContent";
import "./Todo47.css";

const Home = lazy(() => import("./pages/home/Home"));
const About = lazy(() => import("./pages/about/About"));
const AppTodo = lazy(() => import("./pages/appTodo/AppTodo"));
const AddTodo = lazy(() => import("./pages/appTodo/components/AddTodo"));
const EditTodo = lazy(() => import("./pages/appTodo/components/EditTodo"));
const NotFoundPage = lazy(() => import("./pages/notfoundpage/NotFoundPage"));

const Todo47 = () => {
  const [erPage, setErPage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
   !!localStorage.getItem('email'));

  const { data: users } = useQuery({
    queryKey: ["userList"],
    queryFn: getAllUsers,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="wrapper">
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                path="/login"
                element={<Login users={users} />}
              />
              <Route index element={<Home />} />
              <Route
                path="/about"
                element={
                  <PrivateRoutes>
                    <About />
                  </PrivateRoutes>
                }
              />
              <Route
                path="/apptodo"
                element={
                  <PrivateRoutes>
                    <AppTodo setErPage={setErPage} />
                  </PrivateRoutes>
                }
              />
              <Route
                path="/apptodo/addtodo"
                element={
                  <PrivateRoutes>
                    <AddTodo />
                  </PrivateRoutes>
                }
              />
              <Route
                path="/apptodo/:editTodoId"
                element={
                  <PrivateRoutes>
                    <EditTodo />
                  </PrivateRoutes>
                }
              />
              <Route path="/registration" element={<Registration />} />
              <Route
                path="/error-page"
                element={<PageError erPage={erPage} />}
              />
              <Route path="/404page" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to={"/404page"} />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthContext.Provider>
    </div>
  );
};

export default Todo47;
