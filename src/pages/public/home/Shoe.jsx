import  { useContext, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Image,
  Text,
  Stack,
  Select,
  VStack,
  HStack,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../../context/CartContext';
const Shoe = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {cartShoe, setCartShoe} = useContext(CartContext)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shoes, setShoes] = useState(null);

  const [qty, setQty] = useState(1);

  const increment = () => {
    setQty(qty + 1);
  };

  const decrement = () => {
    if (qty > 1) setQty(qty - 1);
  };



  



  useEffect(()=>{
    
    const getShoes = async()=>{
      try{
        setLoading(true)
        const{data} = await axios.get(`https://shope-server.onrender.com/products/customer/getProduct/${id}`);
        console.log(data.product);
        setShoes(data.product)

      }catch(error){
        console.log(error)

      }finally{
        setLoading(false)
      }
    }
    
    getShoes()
  },[])

 


  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

 

  const handleAddToCart = (shoe)=>{
    const existShoeIndex = cartShoe.findIndex((c) => c._id === shoe._id);

    if (existShoeIndex !== -1) {
      const updatedCart = [...cartShoe];
      updatedCart[existShoeIndex].quantity += qty;
      setCartShoe(updatedCart);
    } else {
      setCartShoe((prev) => [...prev, { ...shoe, quantity: qty }]);
    }

}


  return (
    <>
    <Helmet>
      {shoes && <title>Shoes - {shoes.product_name}</title>}
      <meta name="description" content="home page" />

    </Helmet>
    {loading && <Spinner/>}
    {error && <span>{error}</span>}
    {
      shoes && (

      <Container 
      margin="0 auto" direction="column" maxW="80%"
      >
        <HStack spacing={8}
            mt={8}
            minH="65vh"
            maxW="100%"
            mx="auto"
            py={10}
            px={4}
        >
          <Image src={shoes.product_image} alt={shoes.product_name} maxH="400px" maxW="400px" />

          <VStack align="start" spacing={4}>
            <Text fontSize="3xl" fontWeight="bold">
              {shoes.product_name}
            </Text>
            <Text fontSize="lg">${shoes.product_price.toFixed(2)}</Text>
            <Text fontSize="md">{shoes.product_description}</Text>
            <Stack direction="row" spacing={4}>
              <Select value={selectedColor} onChange={handleColorChange} w="200px">
                {shoes.product_color.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </Select>
              <Select value={selectedSize} onChange={handleSizeChange} w="200px">
                {shoes.product_size.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
            </Stack>
            <Flex  w="100%" justifyContent="space-between">
              <Flex justifyContent="space-around" alignItems="center" w="30%">
                <Button onClick={increment}>+</Button>
                <Text> {qty} </Text>
                <Button onClick={decrement}>-</Button>
              </Flex>
              <Button colorScheme="teal" onClick={()=>handleAddToCart(shoes)}>
                Add to Cart
              </Button>
            </Flex>

            <Link to={`/#${id}`}>
                Go Back
            </Link>
          </VStack>
        </HStack>
      </Container>
      )
    }
    </>
  );
};

export default Shoe;
