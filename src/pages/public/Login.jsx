import React, { useState } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,

  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const {user, login} = useContext(AuthContext)
  const [loading, setLoading] = useState(false);


  const [values, setValues] = useState({
    customer_email:"",
    customer_password:""
  })

  const handleChange = (e)=>{
    setValues((prev)=>({...prev, [e.target.name]:e.target.value}))
  };

  const handelSubmit = async(e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      const response = await login(values.customer_email, values.customer_password);
      toast.success(response.message, {
        autoClose:1000
      });
      navigate('/');

    }catch(error){
      toast.error(error.message,{
        autoClose:1000
      })
    }finally{
      setLoading(false)
    }

  }

  return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        onSubmit={handelSubmit}
        as="form"
        flexDir="column"
        maxW="800px" mx="auto" py={10} px={4}
        
      >
        <Box
          p={8}
          maxWidth="800px"
          width={["350px","400px"]}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          bg="gray.100"
        >
          <VStack spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">
            Sign In
            </Text>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="Enter your email" name="customer_email" value={values.customer_email} onChange={handleChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" name="customer_password" value={values.customer_password} onChange={handleChange}/>
            </FormControl>
            <Button  bg="purple.300" fontSize="22px" type="submit" width="40%" margin="20px auto" p={6} 
              sx={
               { _hover:{
                background:"black",
                color:"white"

                }}
              }
            >
              Sign In
            </Button>
            <Link fontSize="sm" alignSelf="flex-end"
            style={{
              fontWeight:"bold",
              color:"blue",
              textDecoration:"underline"
            }}
            
            to="/password-reset">
              Forgot Password?
            </Link>
          </VStack>
        </Box>

        {loading && <span>loading... <Spinner/></span>}
      </Box>
  );
};

export default Login;
