import { Button, Form, Input } from "antd";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";

const Login = ({ setLoginUser }) => {
   const client = useQueryClient()
   const onFinish = (values) => {
      setLoginUser(values);
      client.invalidateQueries();
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
            <Link to={'/registrate'} className="btn btn-blue">Зареєструватись</Link>
         </div>
      </>
    );
}
 
export default Login;
