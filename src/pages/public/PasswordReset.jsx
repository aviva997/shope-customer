import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify';
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    VStack,
    Spinner,
  } from "@chakra-ui/react";
const PasswordReset = () => {

    const {user, forget} =  useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [values, setValue] = useState({
        customer_email:""
    })

    const handleChange = (e)=>{
        setValue({...values , [e.target.name]:e.target.value})
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            setLoading(true)
            const response = await forget(values.customer_email);
            setValue({customer_email:""});
            toast.success(response.message, {
                autoClose:1000
            })


        }catch(error){
            console.log(error)

        }finally{
            setLoading(false)
        }

    }
  return (
    <>

    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="gray.300"
        onSubmit={handleSubmit}
        as="form"
        flexDir="column"
        
      >
        <Box
          p={8}
          maxWidth="800px"
          width="400px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          bg="gray.100"
        >
          <VStack spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">
            Forget Password
            </Text>
            <FormControl  id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
              type="email"
              placeholder="Enter your email address"
              name="customer_email"
              value={values.customer_email}
              onChange={handleChange}
              />
            </FormControl>
            <Button  bg="purple.300" fontSize="22px" type="submit" width="40%" margin="20px auto" p={6} 
              sx={
               { _hover:{
                background:"black",
                color:"white"

                }}
              }
            >
              Send
            </Button>
            
          </VStack>
        </Box>

        {loading && <span>loading... <Spinner/></span>}
      </Box>
  </>
  )
}

export default PasswordReset