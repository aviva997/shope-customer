import { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import PrivateRoutes from "./utils/PrivateRoutes";
import ForgetPassword from "./pages/public/ForgetPassword";
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import PasswordReset from "./pages/public/PasswordReset";
import Root from "./pages/Root";
import Home from "./pages/public/home/Home";
import About from "./pages/public/About";
import TermsAndConditions from "./pages/public/TermsAndConditions";
import Profile from "./pages/private/Profile";
import Orders from "./pages/private/Orders";
import CheckoutSuccess from "./component/CheckoutSuccess";
import Shoe from "./pages/public/home/Shoe";
import Contact from "./pages/public/Contact";
function App() {

  const {user, setUser} = useContext(AuthContext)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root/>}>
        <Route index element={<Home/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="password-reset" element={<PasswordReset/>}/>
        <Route path="forget-password/:id" element={<ForgetPassword/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/terms" element={<TermsAndConditions/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/checkout-success" element={<CheckoutSuccess/>}/>
        <Route path="/shoe/:id" element={<Shoe/>}/>
        <Route element={<PrivateRoutes user={user}/>}>
          <Route path="profile" element={<Profile user={user} setUser={setUser}/>}/>
          <Route path="orders" element={<Orders user={user}/>}/>
        </Route>


      </Route>
    )
  )

  return (
    <div className="App">
      
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
