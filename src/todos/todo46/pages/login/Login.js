import { Button, Form, Input } from "antd";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";

const Login = ({setLoginUser}) => {
   const client = useQueryClient()
   const onFinish = (values)=>{
      setLoginUser(values);
      client.invalidateQueries();
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
         <Link to={'/registration'} className="btn btn-registr">Registration</Link>
      </>
    );
}
 
export default Login;