import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(()=> JSON.parse(localStorage.getItem('user')) || null);
    const [cookies, setCookie, removeCookie] = useCookies(["customer_token"]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (values) =>{
        try{
            const  {
                customer_name,
                customer_email,
                customer_password,
                customer_phone
            }= values;

            const response = await axios.post(`https://shope-server.onrender.com/users/customer/register`,{
                customer_name,
                customer_email,
                customer_password,
                customer_phone:customer_phone || ''
            })

            if(!response.data.success){
                throw new Error(response.data.message)

            }
            return{
                success:true,
                message:response.data.message
            }

        }catch(error){
            throw new Error(error.response.data.message)
        }
    }

    const login = async (customer_email,customer_password)=>{
        try{
            const {data} = await axios.post(`https://shope-server.onrender.com/users/customer/login`,{
                customer_email,
                customer_password
            })
            
           
            setUser(data)
            setCookie('customer_token', data.customer_token, {path:"/", maxAge:3600 });
            return{
                success: true,
                message:data.message
            }


        }catch(error){
            throw new Error(error.response.data.error);

        }
    }

    const forget = async(customer_email) =>{
        try{

            const response = await axios.post(`https://shope-server.onrender.com/emails/send-password-link`,{
                customer_email
            })

            return {
                success: true,
                message : response.data.message
            }

        }catch(error){
            throw new Error(error.response.data.error || "Error in register user")

        }
    }

    const logout =  async ()=>{
      try{
        await axios.post(`https://shope-server.onrender.com/users/customer/logout`,{
            headers: {
                Authorization: `Bearer ${cookies.customer_token}`
            }
        })

        removeCookie("customer_token");
        localStorage.removeItem("user");
        setUser(null);
        return{
            success: true,
            message: 'Logout successfuly'
        }

      }catch(error){
        throw new Error(error.response.data.error)
      }

    }


    useEffect(()=>{
        const authUser = async()=>{
            if(cookies.customer_token){
                setLoading(true);
                try{
                    const {data} = await axios.get(`https://shope-server.onrender.com/users/customers/auth`, {
                        headers: {
                            Authorization: `Bearer ${cookies.customer_token}`
                          }
                    })

                    setUser(data.Customer);
                    


                }catch(error){
                    console.log('remove cookie')
                    removeCookie("customer_token");
                    setUser(null);
                    setError(error.response.data.error)

                }finally{
                    setLoading(false)
                }
        
            }else{
                setUser(null);

            }
        };

        authUser();
    },[cookies, removeCookie]);
    
   
    useEffect(() => {
        console.log(user)
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          localStorage.removeItem("user");
        }
      }, [user]);

    const value = {
        user,
        setUser,
        register,
        login,
        logout,
        forget,
        loading,
        error
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}