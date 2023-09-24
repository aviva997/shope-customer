import { Box, Text, Image, Flex, Badge, Button, VStack, HStack, Spacer, IconButton, Tooltip } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import './shoescard.css'
const ShoesCard = ({shoes, addToCart}) => {

    const { product_name, product_price, product_description, product_color, product_size, product_image } = shoes;
    const navigate = useNavigate();
    const location = useLocation();


   
    useEffect(() => {

      const sectionId = location.hash.substr(1);
  
      if (sectionId) {
  
        const targetSection = document.getElementById(sectionId);
  
        if (targetSection) {
  
          targetSection.scrollIntoView({ behavior: 'smooth' });
          targetSection.className ='card'
  
        }
  
      } else {
  
        window.scrollTo(0, 0);
  
      }
  
    }, [location.hash]);


    
  return (
    <Box
    maxW="2xs" my={10}
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    boxShadow="lg"
    p={4}
    bg="white"
  >
    <div id={shoes._id}>

    <Image 
    src={product_image} 
    alt={product_name} 
    borderRadius="lg" 
    height="200px" 
    width="250px" 
    _hover={{ transform: "scale(1.1)" ,  
    boxShadow: "0 4px 6px gray" }} 
    onClick={()=> {
      navigate(`/shoe/${shoes._id}` , { state: { scrollY: scrollY.current } })
    }}
    
    />

    <Box mt={4}>
      <Text fontSize="xl" fontWeight="semibold">
        {product_name}
      </Text>
      <Text fontSize="md" mt={2} color="gray.600">
        {product_description}
      </Text>
      <Flex justifyContent="space-between" alignItems="center" mt={2}>
        <VStack alignItems="flex-start">
          <Text fontSize="lg" fontWeight="bold">
            ${product_price}
          </Text>
          <HStack spacing={1} mt={1}>
          <Text>  color:</Text>
            {product_color.map((color) => (
              <Tooltip label={color} key={color}>
                <Box
                  w="20px"
                  h="20px"
                  bg={color}
                  borderRadius="full"
                  borderWidth="1px"
                  borderColor="gray.300"
                />
              </Tooltip>
            ))}
          </HStack>
        </VStack>
      </Flex>
      <Text fontSize="sm" mt={2} color="gray.600">
        Available Sizes: 
        {product_size.map((s)=>(
          <Button key={s}
          w="20px"
          h="20px"
          p={3}
          mr={1}
          bg="gray.400"
          color="white"


          >{s}</Button>
        ))}
        
      </Text>
    </Box>

    <Flex mt={4} alignItems="center" justifyContent="space-between"> 

      <Button
        bg="black"
        color="white"
        leftIcon={<FaShoppingCart />}
        ml={2}
        onClick={()=>{addToCart(shoes)}}
      >
        Add to Cart
      </Button>
    </Flex>
    </div>
  </Box>
  )
}

export default ShoesCard