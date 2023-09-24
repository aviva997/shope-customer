import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  Text
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import {AuthContext} from '../../context/AuthContext';
import {toast} from 'react-toastify';
const Register = () => {

  const navigate = useNavigate();
  const {user, register} = useContext(AuthContext);
  const [values, setValues ] = useState({
    customer_name:"",
    customer_email:"",
    customer_password:"",
    customer_password_confirm:"",
  
  })

  const handleChange = (e)=>{
    setValues((prev)=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      if(values.customer_password !== values.customer_password_confirm){
        throw new Error('Password dont match');
      }
      const response = await register(values);
      toast.success(response.message, {
        autoClose:1000,
      });
      navigate('/login')

    }catch(error){
      toast.error(error.message,{
        autoClose:1000,
      })

    }

  }


  console.log(user)

  return (
    <Flex alignItems="center" justifyContent="center" mt={10} as="form" onSubmit={handleSubmit}  maxW="800px" mx="auto" py={10} px={4}>
      <Box width="70%" p={8} boxShadow="lg"  bg="gray.100" mt={10} >
        <Box>
          <Heading width={["none","35%"]}  margin="20px auto">Register</Heading>
        <VStack spacing={4} alignItems="stretch">
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="customer_name" placeholder="Your Name" width="60%" value={values.customer_name} onChange={handleChange}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="customer_email" placeholder="Your Email" width="60%" value={values.customer_email} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="customer_password" placeholder="Password"  width="60%" value={values.customer_password}  onChange={handleChange}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" name="customer_password_confirm" placeholder="Confirm Password" width="60%" value={values.customer_password_confirm}  onChange={handleChange}/>
          </FormControl>
          <Button  bg="purple.300" fontSize="22px" type="submit" width="60%" margin="20px auto" p={6}
            sx={
              { _hover:{
               background:"black",
               color:"white"

               }}
             }
          >
            Register
          </Button>
          <Text>
          already have an account?{" "}
          <Link style={{
            fontWeight:"bold",
            color:"blue",
            textDecoration:"underline"
          }} to="/login">
            Login
          </Link>
        </Text>
        </VStack>
        </Box>
      
      </Box>
    </Flex>
  );
};

export default Register;
