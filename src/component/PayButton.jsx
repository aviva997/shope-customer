import React, { useContext } from 'react'
import axios from 'axios';
import { Button } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
const url = `https://shope-server.onrender.com/stripe`;

const PayButton = ({cartItem }) => {
    const{user} = useContext(AuthContext);
   

 
    const handleCheckout = async ()=>{

        
        if(user.customer_address === undefined){
            toast.error('you need fill the address firest in profille',{
                autoClose:1000
            })

        }
        else  if(user?.customer_address.building ==='' || user?.customer_address.city=='' || user?.customer_address.street==='' ){
            toast.error('you need fill the address firest in profille',{
                autoClose:1000
            })
        }else{

            try{
                const res = await axios.post(`${url}/create-checkout-session`,{
                    cartItem,
                    userId: user._id
                })
                if(res.data.url){
    
                    window.location.href = res.data.url
                }
            }catch(error){
                console.log(error.message)
    
            }
        }

    }
  return (
    <div>
        <Button colorScheme='teal' onClick={handleCheckout}>
            Check Out
        </Button>
    </div>
  )
}

export default PayButton