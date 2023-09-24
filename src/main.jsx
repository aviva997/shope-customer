import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext';
import CartProvider from './context/CartContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <AuthProvider>
      <CartProvider>
      <ToastContainer/>
      <App />

      </CartProvider>

    </AuthProvider>

  </ChakraProvider>
)
