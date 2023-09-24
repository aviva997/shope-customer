import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formData', formData)
    try{
        const {data} = await axios.post(`https://shope-server.onrender.com/contactUs/add`,formData);
        if(data.success){
            toast.success(data.message,{
                autoClose:1000
            })

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            })
        }
        setSubmitted(true);
    }catch(error){
        toast.error(error.message)
    }
  };

  return (
    <Box p={4} maxWidth="600px" mx="auto">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Subject</FormLabel>
            <Input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </VStack>
      </form>
   
    </Box>
  );
};

export default Contact;
