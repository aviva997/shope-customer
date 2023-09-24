import React, { useState, useEffect, useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import PayButton from "../PayButton";
import { CartContext } from "../../context/CartContext";
import { Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    useOutsideClick,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    Flex,
    HStack,
    Badge,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Image, } from "@chakra-ui/react";


const Cart = () => {


    const{cartShoe, setCartShoe} = useContext(CartContext);
    const [totalShoes, setTotalShoes] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);

    const { isOpen, onOpen, onClose } = useDisclosure();


    const addToCart = (shoe)=>{
        const existShoeIndex = cartShoe.findIndex((c) => c._id === shoe._id);

        if (existShoeIndex !== -1) {
          const updatedCart = [...cartShoe];
          updatedCart[existShoeIndex].quantity += 1;
          setCartShoe(updatedCart);
        } else {
          setCartShoe((prev) => [...prev, { ...shoe, quantity: 1 }]);
        }


    }

    const removeFromCart = (shoe)=>{
        const existShoes = cartShoe.find((c) => c._id === shoe._id);
        if (existShoes) {
          if (existShoes.quantity === 1) {
            setCartShoe((prev) => prev.filter((c) => c._id !== shoe._id));
          } else {
            const updatedCart = cartShoe.map((c) => {
              if (c._id === shoe._id) {
                return { ...c, quantity: c.quantity - 1 };
              }
              return c;
            });
            setCartShoe(updatedCart);
          }
        }

    }

    const deleteFromCart = (item)=>{
        setCartShoe((prev)=> prev.filter((c)=>c._id!== item._id))

    }
    const resetCart = () => {
        setCartShoe([]);
      };

    useEffect(()=>{
        const updateNumber = cartShoe.length;
        setTotalShoes(updateNumber);

        const total_price = cartShoe.reduce( (total, item)=>
            total+ item.quantity * item.product_price
            
        ,0);
        setTotalPrice(total_price.toFixed(3));

        console.log(cartShoe)
    },[cartShoe])


  return (
    <div>
        <Button
        onClick={onOpen}
        sx={{
            _hover: {
              cursor: "pointer",
              border: "2px",
              borderColor: "white",
            },
            border: "none",
          }}
          variant="outline"
        >
        {totalPrice && totalShoes !== 0 ? (
          <Badge 
          fontSize="md"
          colorScheme="red"
          position="absolute"
          top="-8px"
          right="2px"
          zIndex="1"
          
          >
            {totalShoes}
          </Badge>
        ) : null}
            <FaShoppingCart
            fontSize="20px"
             bg="transparent" 
             color="white"
             _hover={{ bg: 'transparent' }} 
            />

        </Button>
        <Modal
        isOpen={isOpen} onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent
              bg="blackAlpha.800"
              color="white"
              maxW="800px"
              mx="auto"

            >
              <Flex justifyContent="center">
                <ModalHeader color="red.200" fontSize="34px">Cart</ModalHeader>
              </Flex>
                 <ModalCloseButton />
                 <ModalBody>
                    {cartShoe.length === 0 ? (
                    <p>Your Cart is Empty</p>
                    ) : (
                    <Table variant="simple">
                        <Thead >
                        <Tr>
                          <Th></Th>
                          <Th color="white" fontSize="lg" fontWeight="bold">
                            Image
                          </Th>
                          <Th color="white" fontSize="lg" fontWeight="bold">
                            Shoes
                          </Th>
                          <Th color="white" fontSize="lg" fontWeight="bold">
                            Price
                          </Th>
                          <Th color="white" fontSize="lg" fontWeight="bold" minW={170}>
                            Quantity
                          </Th>
                          <Th color="white" fontSize="lg" fontWeight="bold">
                            Total
                          </Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        {cartShoe.map((item) => (
                            <Tr key={item._id}>
                            <Td>
                                <Button
                                 onClick={() => {
                                    deleteFromCart(item);
                                }}
                                >
                                X
                                </Button>
                            </Td>
                            <Td>
                                <Image maxW="100%" src={item.product_image}></Image>
                            </Td>
                            <Td>{item.product_name}</Td>
                            <Td>${item.product_price}</Td>
                            <Td>
                                <Button
                                 mx={1}
                                 bg="none"
                                 fontSize="30px"
                                 color='green.500'
                                onClick={() => removeFromCart(item)}
                                >
                                -
                                </Button>
                                <Text mx={1.5} as="b">
                                {item.quantity}
                                </Text>
                                <Button
                                bg="none"
                                fontSize="24px"
                                color='green.500'
                                
                                onClick={() => addToCart(item)}
                                >
                                +
                                </Button>
                            </Td>
                            <Td>
                                ${(item.quantity * item.product_price).toFixed(3)}
                            </Td>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                    )}
                    {cartShoe.length !== 0 && (
                    <Text mt={5} textAlign="center" fontWeight={700}>
                        Cart Total Price : {totalPrice}$
                    </Text>
                    )}
          </ModalBody>
          <Flex p={3} justifyContent="space-between">
            {cartShoe.length !== 0 && (
              <>
             
                 <PayButton cartItem={cartShoe}/>
    
                <Button colorScheme="red" onClick={resetCart}>
                  Delete Cart
                  <AiFillDelete style={{ marginLeft: 2 }} />
                </Button>
              </>
            )}
          </Flex>


            </ModalContent>
        </Modal>
    </div>
  )
}

export default Cart