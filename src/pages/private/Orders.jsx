import { Box, Button, Flex, Heading, Spinner, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Orders = ({user}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    const getOrders = async()=>{
        try{
            setLoading(true);
            const {data} = await axios.get(`https://shope-server.onrender.com/orders/order/get-order-customer/${user._id}`)
            setOrders(data.orders);
            console.log(data.orders)
        }catch(error){
            setError(error.response.data.error);
        }finally{
            setLoading(false)
        }
    }
    getOrders()

  },[])

  return (
    <>
    {loading && <Spinner/>}
    {error && <span>{error}</span>}
    {orders && (
        <Box minH="65vh" maxW="1000px" mx="auto" py={10} px={4}> 
        <Flex justifyContent="center" alignItem="center">
        <Heading mb={6} >{orders[0]?.customer.customer_name} Orders</Heading>

        </Flex>
        <Table>
            <Thead>
                <Tr >
                    <Th fontSize="20px" color="pink.500">Order Number</Th>
                    <Th fontSize="20px" color="pink.500">Date</Th>
                    <Th fontSize="20px" color="pink.500">Total</Th>
                    <Th fontSize="20px" color="pink.500">Statu</Th>
                </Tr>
            </Thead>
            <Tbody>
                {orders.map((o)=>(
                    <Tr key={o._id}>
                        <Td>{o.order_number}</Td>
                        <Td>
                        {new Date(o.createdAt).toLocaleString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                    })}

                    </Td>
                    <Td>{o.total_price}</Td>
                    <Td>
                        {o.status === 1 && <Button colorScheme='green'>New</Button>}
                        {o.status === 2 && <Button colorScheme='purple'>Progress</Button>}
                        {o.status === 3 && <Button colorScheme='yellow'>Done</Button>}
                        {o.status === 4 && <Button colorScheme='red'>canceled</Button>}
                    </Td>

                    </Tr>
                ))}
            </Tbody>
        </Table>

        </Box>
    )}
    </>
  )
}

export default Orders