import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewUser, fetchUsers } from "../redux/features/usersSlice";

const Registration = () => {
   const dispatch = useDispatch();
   const navigation = useNavigate();

   const onFinish = (values)=>{
      dispatch(addNewUser(values));
      dispatch(fetchUsers());
      navigation('/login');
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