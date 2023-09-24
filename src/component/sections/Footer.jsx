import { Box, Flex, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box as="footer" bg="gray.900" color="white" py={8}>
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
    <VStack align="center">
        <Heading size="md">About</Heading>
        <Flex align="center">
          <Link to="about" ml={2}  >
            About us
          </Link>
        </Flex>
        <Flex align="center">
          <Link to="terms" ml={2} >
            Terms
          </Link>
        </Flex>
      </VStack>

      <VStack align="center"> 
        <Heading size="md">Social</Heading>
        <Flex align="center">
          <FaFacebook />
          <Link ml={2}  >
            Facebook
          </Link>
        </Flex>
        <Flex alignItems="center">
          <FaTwitter />
          <Link ml={2} >
            Twitter
          </Link>
        </Flex>
        <Flex align="center">
          <FaInstagram />
          <Link ml={2} >
            Instagram
          </Link>
        </Flex>
      </VStack>

      <VStack align="center">
        <Heading size="md">Services</Heading>
        <Flex align="center">
          <Link to="contact" ml={2}  >
             contact us
          </Link>
        </Flex>
        <Flex align="center">
          <Link to="terms" ml={2} >
            Chain stores
          </Link>
        </Flex>
      </VStack>


    
    </SimpleGrid>
  </Box>
  );
};

export default Footer;
