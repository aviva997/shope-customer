import { Box, Button, ButtonGroup, Center,InputRightElement, Divider, Flex, HStack, Heading, Image, Input, InputGroup, Text, Spinner } from '@chakra-ui/react';
import { Helmet } from "react-helmet";
import {  useContext, useEffect, useState } from 'react';
import useFetchGet from '../../../hooks/useFetchGet';
import { BsSearchHeart } from "react-icons/bs";
import Shoe from './Shoe';
import axios from 'axios';
import ShoesCard from '../../../component/paritials/ShoesCard';
import Pagination from './Pagination';
import { CartContext } from '../../../context/CartContext';
const product_url = `https://shope-server.onrender.com/products/customer/getAll`;

const Home = () => {

    
    const [data, loading, error] = useFetchGet(product_url);
    const [shoes, setShoes] = useState([]);
    const [filterShoes, setFilterShoes] =  useState([]);
    const [categories, setCategories] = useState([]);
    const [filterStatus, setFilterStatus] =  useState(null);
    const [search, setSearch] = useState('');


    const{cartShoe, setCartShoe} = useContext(CartContext)
    const [currentPage, setCurrentPage] = useState(1);
    const shoesPerPage = 4;


    const indexOfLastShoes = currentPage * shoesPerPage;
    const indexOfFirstShoe = indexOfLastShoes - shoesPerPage;
    const currentShoes = filterShoes.slice(indexOfFirstShoe, indexOfLastShoes);
  


    useEffect(()=>{
        const allCat = async ()=>{
            try{
                const {data} = await axios.get(`https://shope-server.onrender.com/categories/customer/getAllCategory`)
                setCategories(data.all_categories)
            
            }catch(error){
                console.log(error)
            }
        } 
        allCat();  
    },[])

    useEffect(()=>{
        if(data){
            const allShoes = data.all_product;
            setShoes(allShoes);
            setFilterShoes(allShoes);
            
        }
    },[data])




    const handleFilterCtegory = (category_id)=>{
        setFilterStatus(category_id);
        if(category_id === null){
            setFilterShoes([...shoes]);
        }else{
           const filterShoes = shoes.filter((s)=> s.categories.some((c)=>c.category === category_id));
           setFilterShoes(filterShoes)
        }
        setCurrentPage(1)

    }

    const onChangeHandle = (e)=>{
        setSearch(e.target.value)
        console.log(typeof e.target.value)

    }

    useEffect(()=>{
        
        const searchRes = filterShoes?.filter((s)=> 
        s.product_name?.toLowerCase().includes(search.toLowerCase())||
        s.product_description?.toLowerCase().includes(search.toLowerCase())
        );


        setFilterShoes(searchRes)
    },[search, shoes])

    const handleChangePage = (page)=>{
        setCurrentPage(page)
    }


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
    


  return (
    <div style={{width:"100%"}}>
        <Helmet>
            <title>Home</title>
            <meta name="description" content="home page" />
        </Helmet>
        <Box
        as='img'
        src ="/shoes_2.png"
        objectFit="cover"
        w="100%"
        h={["20vh","50vh" ]}
        boxShadow="lg"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        >
        </Box>
        <Box py={5} bg="black">
            <Flex   justifyContent="center" alignItems="center" flexDirection="column" px={[2,0]} py={[1, 5]} >
                <Heading py={5}  fontSize={["sm", "2xl"]} color="white" >Shop now</Heading>
                <Divider borderColor="red" w= "10%" borderWidth="5px" />
            </Flex>

        <Flex justifyContent={["center","space-around" ]}alignItems={["none","center"]}  gap={9} padding="20px" flexDirection={["column", "row"]} >
            <Box textAlign="center" width={["100%","20%"]} position="relative" _hover={{ transform: "scale(1.1)" ,  boxShadow: "0 4px 6px white" }} >
                <Image src="/man.jpg" alt="Image 1" maxW="100%" />
                <Heading position="absolute" fontSize="lg" color="white" top="50%" left="50%" transform="translate(-50%, -50%)">
                MEN'S
                </Heading>
            </Box>
            <Box textAlign="center" width={["100%","20%"]}  position="relative" _hover={{ transform: "scale(1.1)" ,  boxShadow: "0 4px 6px white" }} >
                <Image src="/kids.jpg" alt="Image 2" maxW="100%" />
                <Heading position="absolute"  fontSize="lg" color="white" top="50%" left="50%" transform="translate(-50%, -50%)">
                KID'S
                </Heading>
            </Box>
            <Box textAlign="center" width={["100%","20%"]} position="relative" _hover={{ transform: "scale(1.1)" ,  boxShadow: "0 4px 6px white" }} >
                <Image src="/woman.jpg" alt="Image 3" maxW="100%" />
                <Heading position="absolute" fontSize="lg"  color="white" top="50%" left="50%" transform="translate(-50%, -50%)">
                WOMEN'S
                </Heading>
            </Box>
        </Flex>
        </Box>
        <Box bg="blackAlpha.300" width="100%">

        <Box minH="65vh" maxW="90%" mx="auto" py={10} px={4} >

            <Flex justifyContent="center" alignItems="center" flexDirection="column" py={5} >
                    <Heading py={5} >shoes</Heading>
                    <Divider borderColor="red" w="10%" borderWidth="5px" />
            </Flex>
            <HStack  m={[3,7]} justifyContent={["center","space-between"]} flexDirection={["column","row"]} >
                <ButtonGroup my={5} alignItems="center">
                    <Heading lignSelf={"center"} fontSize={["16px","18px"]}>Filter by Category -</Heading>
                    <Button 
                        variant={filterStatus === null ?"solid":"outline"}
                        onClick={()=>handleFilterCtegory(null)}
                        colorScheme='teal'
                     
                    
                    >
                    All
                    </Button>
                    {categories.map((c)=>(
                        <Button
                            key={c._id}
                            variant={filterStatus === c._id ?"solid":"outline"}
                            onClick={()=> handleFilterCtegory(c._id)}
                            colorScheme={c.category_name === "Woman" ?'pink' :c.category_name === "Man"?"facebook":"gray" }
                        >
                            {c.category_name}
                        </Button>
                    ))}


                </ButtonGroup>
                <InputGroup maxW={480}>
                <Input
                bg="black"
                placeholder ="search by shoe name or description"
                color="white"
                value={search}
                onChange={onChangeHandle}

                />
                <InputRightElement>
                    <BsSearchHeart color="white" />
                </InputRightElement>
                </InputGroup>
            </HStack>

            <Flex 
                direction={["column","column","row","row"]} 
                flexWrap="wrap" 
                my={5} 
                justifyContent="space-between"
            >
                {loading && <Spinner/>}
                {error && <span>{error}</span>}
                {currentShoes.map((s)=>(
                    <ShoesCard key={s._id} shoes= {s} addToCart ={addToCart}/>
                ))}


            </Flex>
            <Pagination
            currentPage={currentPage} 
            shoesPerPage={shoesPerPage}
            totalShoes={filterShoes.length}
            onPageChange={handleChangePage}
            
            />

 

    </Box>
    </Box>
    </div>
  )
}

export default Home