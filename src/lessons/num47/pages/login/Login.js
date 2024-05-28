import { Button, Form, Input } from "antd";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContent";

const Login = ({ usersList }) => {
   const { setIsAuthenticated } = useContext(AuthContext);
   const [loginsUser, setLoginsUser] = useState({});
   const navigate = useNavigate();

   const onFinish = (values) => {
      const user = usersList.find((user) => user.email === values.email)
      
      setLoginsUser(user);
      if (user.email.toLowerCase()===values.email.toLowerCase()) {
         localStorage.setItem('email', values.email);
         setIsAuthenticated(true);
         navigate('/contact', { replace: true });
      }
   }   
   
   return ( 
      <>
         <h3>Login</h3>
         <div>
            <Form
               name='normal_login'
               initialValues={{ remembe: true }}
               onFinish={onFinish}
               style={{ width: '100% '}}
            >
               <Form.Item
                  name='username'
                  rules={[{required: true, message: 'Pleese input your Username!'}]}
               >
                  <Input placeholder='Username'/>
               </Form.Item>
               <Form.Item
                  name='email'
                  rules={[{required: true, message: 'Pleese input your Password!'}]}
               >
                  <Input type='email' placeholder='email'/>
               </Form.Item>
               <Form.Item>
                  <Button
                     type="primary"
                     style={{ width: '100%' }}
                     htmlType='submit'
                     className="Login-form-button"
                  >
                     Log in
                  </Button>
               </Form.Item>
            </Form>
            {!loginsUser && (
               <p>Такого юзера не існує, ви маєте спочатку зареєструватись</p>
            )}
            <Link to={'/registrate'} className="btn btn-blue">Зареєструватись</Link>
         </div>
      </>
    );
}
 
export default Login;
