import { Button, ButtonGroup, Flex, Spacer, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FaHamburger, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { PiHandbag } from "react-icons/Pi";
import { Link } from "react-router-dom";
import { MdLogin } from 'react-icons/md';
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Cart from "./Cart";

const Navbar =()=>{

    const [isOpen, setIsOpen] = useState(false);
    const {user, logout } = useContext(AuthContext);


    const nav_style = {
        display : [isOpen ? "flex":"none", "flex"],
        p:"15px 35px"
    }

    const button_style = {
        top:[4, 1],
        left :"85%",
        display:["inherit", "none"]
    }
    const changeIsOpen = ()=>{
        setIsOpen(!isOpen)
    }

    const handleLogout = async()=>{
        try{
            const response = await logout();
            toast.success(response.message,{
                autoClose:1000
                
            })
        }catch(error){
            toast.error(error.error)
        }
    }
    console.log(user)
    return (
        <div
        style={{backgroundColor:"black"}}
        >
            <Button onClick={changeIsOpen} sx={button_style}>
                <FaHamburger/>
            </Button>

            <Flex  
            justifyContent="space-between"
            direction={["column","row"]}
            alignItems={["flex-start","center"]}
            p={["5px","15px 35px"]}
          
            >
            
            <ButtonGroup alignItems="center" >
                 
                    <Button
                    as={Link}
                    style={{
                        clipPath:"circle(50% at 50% 50%)",
                        backgroundImage: "url('/logo.png')",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        width: "50px",
                        height: "50px",
                        marginRight:"15px",

                    }}
                    >
    
                    </Button>
                    {user && (
                        <Text color="white">Hello {user.customer_name}!</Text>
                     )}
                </ButtonGroup>

               <Flex sx={nav_style}>

                <ButtonGroup alignItems="center">

                    {!user &&(
                        <Button 
                    
                            sx={{
                                _hover: {
                                    cursor: "pointer",
                                    border: "none",
                                    color:"red.600",
                                },
                                border:"none",
                                marginRight:"15px",
                                color:"white",
                                fontSize:"18px"
                            }}
                            variant="outline"
                        >
                            <Link to="/register">
                            Register
                            </Link>
                        </Button>


                    )}

                    {!user && (
                        <Button
                            sx={{
                                _hover: {
                                    cursor: "pointer",
                                    border: "none",
                                    color:"red.600",
                                },
                                border:"none",
                                marginRight:"15px",
                                color:"white",
                                fontSize:"18px"
                            }}
                            variant="outline"
                            alignItems="center"
                            justifyContent="center"   >
                            <MdLogin style={{marginRight:"10px"}}/>
                            <Link to="/login">
                            Sign In
                            </Link>
                        </Button>
                    )}
                    {user && (
                        <Flex >

                        <Button
                        
                            sx={{
                                _hover: {
                                    cursor: "pointer",
                                    border: "none",
                                    color:"red.600",
                                },
                                border:"none",
                                marginRight:"15px",
                                color:"white",
                                fontSize:"18px",
                               
                            }}
                            
                            variant="outline"
                            alignItems="center"
                            justifyContent="center"  
                            >
                            <Link to="/profile" >
                            <FaUser style={{marginLeft:"10px", fontSize:"18px"}} />
                            </Link>

                        </Button>
                        </Flex>
                    )}
                    {user && (
                        <Button
                            sx={{
                                _hover: {
                                    cursor: "pointer",
                                    border: "none",
                                    color:"red.600",
                                },
                                border:"none",
                                marginRight:"15px",
                                color:"white",
                                fontSize:"18px"
                            }}
                            variant="outline"
                            alignItems="center"
                            justifyContent="center"   >
                            <Link to="/orders">
                            Orders
                            </Link>
                        </Button>
                    )}
                    {user && (
                      <Cart/>
                    )}
                    {user && (
                        <Button
                            sx={{
                                _hover: {
                                    cursor: "pointer",
                                    border: "none",
                                    color:"red.600",
                                },
                                border:"none",
                                marginRight:"15px",
                                color:"white",
                                fontSize:"18px"
                            }}
                            variant="outline"
                            alignItems="center"
                            justifyContent="center"
                            onClick={handleLogout}
                            >
                            logout
                            <FiLogOut style={{marginLeft:"10px" ,fontSize:"18px"}}/>
                        </Button>
                    )}

                </ButtonGroup>
               </Flex>

            </Flex>
        </div>

    )
}

export default Navbar;