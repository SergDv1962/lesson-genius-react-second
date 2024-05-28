import { Button, Form, Input } from "antd";
import { useContext, useState } from "react";
// import { useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContent";

const Login = ({ users }) => {
   // const client = useQueryClient()
   const { setIsAuthenticated } = useContext(AuthContext)
   const [loginUser, setLoginUser] = useState({});
   const navigate = useNavigate();

   const onFinish = (values)=>{
      const user = users.find(user=>user.email===values.email);
      setLoginUser(user);
      if (user.email.toLowerCase()===values.email.toLowerCase()) {
         localStorage.setItem('email', values.email);
         setIsAuthenticated(true);
         navigate('/')
      }
      // client.invalidateQueries();
   }
   return ( 
      <>
         <h3>Log in</h3>
         <br/>
         <Form
            name='normal_login' 
            initialValues={{remembe: true}}
            onFinish={onFinish}
            style={{width:'100%', backgroundColor:'grey', padding:'8px', marginBottom:'8px'}}>
            <Form.Item 
               name='username'
               rules={[{required:true, message:'Please input your Username!'}]}
            >
               <Input type='text' placeholder="username"/>
            </Form.Item>
            <Form.Item 
               name='email'
               rules={[{required:true, message:'Please input your email!'}]}
            >
               <Input type='email' placeholder="email"/>
            </Form.Item>
            <Form.Item>
               <Button
                  type="primary"
                  htmlType="submit"
               >Log in</Button>
            </Form.Item>
         </Form>
         {!loginUser && (
            <p>Такого юзера не існує, ви маєте спочатку зареєструватись</p>
         )}
         <Link to={'/registration'} className="btn btn-registr">Registration</Link>
      </>
    );
}
 
export default Login;