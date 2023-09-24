import React, { useContext, useEffect } from 'react'
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Flex, Heading } from '@chakra-ui/react';
const CheckoutSuccess = () => {
    const{cartShoe, setCartShoe} = useContext(CartContext);
    const{user} = useContext(AuthContext);

    useEffect(()=>{
        const continuePlaceOrder = async()=>{
            try{
                const end_point = user ? '/order/add-order-customer':'/order/add-order-guest';
                console.log('endpoint', end_point)
                const {data} = await axios.post(`https://shope-server.onrender.com/orders${end_point}`,{
                    customer:user._id,
                    customer_address: {
                        city:user.customer_address.city,
                        street:user.customer_address.street,
                        building:user.customer_address.building
                    },
                    products:cartShoe.map((p)=>{
                        return {
                            product: p._id,
                            RTP: p.product_price,
                            quantity:p.quantity
                        }
                    })
    
                });
                setCartShoe([]);
                console.log('data', data);
                //alert(`Your order is placed, order number: ${order_status.order_number}`);
    
    
            }catch(error){
                console.log(error)
                 toast.error('you need fill your address in profile');
    
            }
        };
        continuePlaceOrder();

    },[])
  return (
    <Flex
    display="flex"
    justifyContent="center"
    alignItems="center"
    w="100%"
    
    my="90px"
    py={10}
  >
    <Heading w="50%"  textAlign="center">
      Checkout Success
    </Heading>
  </Flex>
  )
}

export default CheckoutSuccess