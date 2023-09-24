import { Box, Button, CircularProgress, Divider, Heading, Input, color } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState , useEffect} from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const ForgetPassword = () => {

    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const customer_token = location.search.split("=")[1];

    const[data1, setData] = useState(false)
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const validId = async ()=>{
        try{

            const {data} = await axios.get(`https://shope-server.onrender.com/emails/forget-password/${id}`,{
                headers: {
                    customer_token: customer_token,
                  },
            })
    
            if (data.status === 201) {
                console.log("user valid");
            } else {
            navigate("/");
            toast.error("Invalid Link");
            }
        }catch(error){
            navigate("/");
            toast.error("Invalid Link");
        }
       
    }
    const setval = (e) => {
        setPassword(e.target.value);
    };

    const sendpassword = async (e) => {
        e.preventDefault();
    
        if (password === "") {
          toast.error("Password is required!", {
            position: "top-center",
            autoClose: 1000
          });
        } else if (password.length < 6) {
          toast.error("Password must be at least 6 characters long!", {
            position: "top-center",
            autoClose:1000
          });
        } else {
          try {
            const { data } = await axios.post(
              `https://shope-server.onrender.com/emails/${id}`,
              {
                password,
                customer_token,
              }
            );
    
            if (data.status === 201) {
              setPassword("");
              setMessage(true);
            } else {
              toast.error("Token Expired, generate new Link!", {
                position: "top-center",
                autoClose: 1000
              });
            }
          } catch (error) {
            toast.error("An error occurred while updating the password!", {
              position: "top-center",
              autoClose: 1000
            });
          }
        }
    };
    useEffect(() => {
        validId();
        setTimeout(() => {
          setData(true);
        }, 3000);
    }, []);

  return (
    <Box>


    {data1 ? (
      <Box 
      bg="gray.300"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      
      >
        {" "}
        <Box 
        minH="65vh" maxW="600px" mx="auto" py={10} px={4} bg="gray.100" borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        >
          <Heading as="h2" size="xl" mb={6}>
            Enter Your <span style={{color:"red"}}> NEW</span> Password
          </Heading>
          <section>
            <div className="form_data">
              <form>
                {message ? (
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    Password Successfully Updated
                  </p>
                ) : null}
                <div className="form_input">
                  <label htmlFor="password">New password</label><br/>
                  <Input
                    my={5}
                    w="50%"
                    type="password"
                    value={password}
                    onChange={setval}
                    name="password"
                    id="password"
                    placeholder="Enter Your new password"
                  />
                </div>

                <Button  
                bg="purple.300"
                fontSize="22px" 
                width="20%" 
                margin="20px auto" 
                p={6} 
                onClick={sendpassword}
               
                sx={
                    { _hover:{
                     background:"black",
                     color:"white"
     
                     }}
                }
                >
                  Send
                </Button>
              </form>
            
            </div>
          </section>
        </Box>
      </Box>
    ) : (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading... &nbsp;
        <CircularProgress />
      </Box>
    )}
  </Box>
  )
}

export default ForgetPassword