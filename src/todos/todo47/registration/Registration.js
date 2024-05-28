import { Button, Form, Input } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { addUser } from "../pages/appTodo/api/Api";
import { useNavigate } from "react-router-dom";

const Registration = () => {
   const client = useQueryClient();
   const navigation = useNavigate();
   const {mutateAsync} = useMutation({
      mutationFn:(payload)=>addUser(payload),
      onSuccess:()=>{
         navigation('/login');
         client.invalidateQueries(['userList'])
      }
   });
   const onFinish = (values)=>{
      mutateAsync(values);
   }
   return ( 
      <>
         <h3>Registration</h3>
         <Form
            onFinish={onFinish}
         >
            <Form.Item
               name="username"
               rules={[{required:true, message:'Please input your name'}]}
            >
               <Input 
                   placeholder="Your Name"
                  type="text"
               />
            </Form.Item>
            <Form.Item
               name='email'
               rules={[{required:true, message:'Please input your email'}]}
            >
               <Input
                  placeholder="Your email"
                  type="email"
               />
            </Form.Item>
            <Form.Item>
               <Button
                  type="primary"
                  htmlType="submit"
               >
                  Registration
               </Button>
            </Form.Item>
         </Form>
         
      </>
    );
}
 
export default Registration;