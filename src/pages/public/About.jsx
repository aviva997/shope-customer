import { Box, Heading, Text } from "@chakra-ui/react";


function About() {
  return (
    <Box maxW="800px" mx="auto" py={10} px={4}>
    <Heading as="h2" size="xl" textAlign="center" mb={4}>
      About Us
    </Heading>
    <Text textAlign="center">
      Welcome to Shoes web, your one-stop destination for the latest and trendiest footwear. We are passionate about shoes and committed to providing you with the best selection of footwear that combines style, comfort, and quality.
    </Text>
    <Text textAlign="center" mt={4}>
      Our mission is to help you put your best foot forward. Whether you're looking for sneakers, boots, sandals, or any other type of shoe, we've got you covered. We believe that the right pair of shoes can elevate your style and enhance your daily life.
    </Text>
    <Text textAlign="center" mt={4}>
      At Shoes web, we carefully curate our collection to offer a wide range of options for men, women, and kids. We work with top brands and designers to bring you the latest trends and timeless classics.
    </Text>
    <Text textAlign="center" mt={4}>
      Our team of dedicated shoe enthusiasts is here to assist you in finding the perfect fit and style. We value your satisfaction and are committed to providing exceptional customer service.
    </Text>
    <Text textAlign="center" mt={4}>
      Thank you for choosing Shoes web. We look forward to serving you and helping you step out in style.
    </Text>
  </Box>
  );
}

export default About;
