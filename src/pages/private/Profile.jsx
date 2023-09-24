import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Avatar,
  VStack,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

const Profile = ({user, setUser}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState({})


  useEffect(()=>{
    if (user) {
        setValues({
          customer_name: user.customer_name || "",
          customer_email: user.customer_email || "",
          customer_phone: user.customer_phone || "",
          customer_address: {
            city: user.customer_address?.city || "",
            street: user.customer_address?.street || "",
            building: user.customer_address?.building || "",
            apartment: user.customer_address?.apartment || "",
          },
        });
      }

  },[user])



  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  useEffect(()=>{
    
  },[user])

  const handleSaveClick =async () => {
    try{
        const {data} = await axios.put(`https://shope-server.onrender.com/users/customer/update/${user._id}`,values
        
        )
        if(!data.success){
            throw new Error(data.message)
        }


        setUser(data.update_customer);
        setIsEditing(false);
        toast.success(data.message,{
            autoClose:500
        })
        setTimeout(() => {
          window.location.reload();
        }, 1000);

    }catch(error){
        toast.error(error.message,{
            autoClose:1000
        })

    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleNestedChange = (e) => {
    setValues({
      ...values,
      customer_address: { ...values.customer_address, [e.target.name]: e.target.value },
    });
  };
  return (
    <Container maxW="container.lg" py={8}>
      <Heading mb={4}>User Profile</Heading>
      <Box
        p={4}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
      >
        <Avatar
          size="xl"
          src="/person.png"
          mr={{ base: 0, md: 4 }}
          mb={{ base: 4, md: 0 }}
        />
        <VStack align="start" spacing={4}>
          <Text fontSize="xl" fontWeight="bold">
            {isEditing ? (
              <Input
                name="customer_name"
                value={values?.customer_name || " "}
                onChange={handleChange}
                size="lg"
                autoFocus
              />
            ) : (
              user?.customer_name
            )}
          </Text>
          <Text>
          </Text>
         
          <Text>
            Email: {isEditing ? <Input value={values.customer_email} name="customer_email" onChange={handleChange} size="md" /> : values.customer_email}
          </Text>
          <Text>
            Phone Number: {isEditing ? <Input value={values.customer_phone} name="customer_phone" onChange={handleChange} size="md" /> : values.customer_phone}
          </Text>
          <Text>
            city: {isEditing ? <Input value={values.customer_address?.city || ' '} name="city" onChange={handleNestedChange} size="md" /> : values.customer_address?.city}
          </Text>
          <Text>
          Street: {isEditing ? <Input value={values.customer_address?.street || ' '} name="street" onChange={handleNestedChange} size="md" /> : values.customer_address?.street}
          </Text>
          <Text>
          Building: {isEditing ? <Input value={values.customer_address?.building || ' '} onChange={handleNestedChange} name="building" size="md" /> : values.customer_address?.building}
          </Text>
          <Text>
          Apartment: {isEditing ? <Input value={values.customer_address?.apartment || ' '} onChange={handleNestedChange} name="apartment" size="md" /> : values.customer_address?.apartment}
          </Text>
        </VStack>
      </Box>
      {isEditing ? (
        <Button mt={4} colorScheme="teal" onClick={handleSaveClick}>
          Save Profile
        </Button>
      ) : (
        <Button mt={4} colorScheme="teal" onClick={handleEditClick}>
          Edit Profile
        </Button>
      )}
    </Container>
  );
};

export default Profile;
