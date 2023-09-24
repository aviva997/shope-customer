import { Box, Heading, Text } from "@chakra-ui/react";

const TermsAndConditions = () => {
  return (
    <Box  maxW="800px" mx="auto" py={10} px={4}>
      <Heading as="h2" size="xl" textAlign="center" mb={4}>
        Terms and Conditions
      </Heading>
      <Text>
        By using and shopping on [Your Shoe Shop Name] website, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before making any purchases or using our services.
      </Text>
      <Text mt={4}>
        <strong>1. Ordering and Payment:</strong> When you place an order on our website, you agree to provide accurate and complete information. Payment must be made using the provided payment methods. Orders are subject to acceptance and availability.
      </Text>
      <Text mt={4}>
        <strong>2. Pricing and Availability:</strong> Prices for our products are subject to change without notice. We reserve the right to modify or discontinue products or services without prior notice. We do not guarantee the availability of any product at any time.
      </Text>
      <Text mt={4}>
        <strong>3. Shipping and Delivery:</strong> We will make every effort to ensure your order is delivered promptly and accurately. However, we are not responsible for delays or errors caused by third-party delivery services.
      </Text>
      <Text mt={4}>
        <strong>4. Returns and Exchanges:</strong> Please refer to our Return and Exchange Policy for information on returning or exchanging products.
      </Text>
      <Text mt={4}>
        <strong>5. Privacy and Security:</strong> We take your privacy and security seriously. Please review our Privacy Policy to understand how we collect, use, and protect your information.
      </Text>
      <Text mt={4}>
        <strong>6. Intellectual Property:</strong> All content on our website, including text, images, logos, and trademarks, is the property of [Your Shoe Shop Name]. You may not use, reproduce, or distribute our content without permission.
      </Text>
      <Text mt={4}>
        <strong>7. Governing Law:</strong> These terms and conditions are governed by the laws of [Your Jurisdiction]. Any disputes or claims arising from the use of our website will be subject to the jurisdiction of the courts in [Your Jurisdiction].
      </Text>
      <Text mt={4}>
        <strong>8. Contact Information:</strong> If you have any questions or concerns about these terms and conditions, please contact us at [Your Contact Email].
      </Text>
      <Text mt={4}>
        By using our website, you acknowledge that you have read, understood, and agreed to these terms and conditions. We reserve the right to update or change these terms at any time without notice, so please check this page periodically for updates.
      </Text>
    </Box>
  );
};

export default TermsAndConditions;
