import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/HomePage";
import Shop from "./Pages/ShopPage";
import Contact from "./Components/Contact";
import About from "./Components/About";


import {useSelector, useDispatch } from "react-redux";
import { fetchData } from "./Redux/slice/data";
import Cart from "./Components/Cart";
import { FaCartPlus } from "react-icons/fa";
import User from "./Components/User";
import ProductDetail from "./Components/ProductDetail";



function App() {

  const dispatch = useDispatch();
  const { cartItems} = useSelector((state) => state.cart)
  
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="w-full relative">
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user" element={<User />} />
            <Route path="/productDetails" element={<ProductDetail />} />
          </Routes>

          {cartItems.length > 0 && (
            <Link to="/cart">
              <div className="fixed bottom-6 right-6 z-50 sm:block md:block lg:hidden p-4">
                <div className="relative inline-block">
                  <FaCartPlus className="text-4xl text-black hover:text-red-700 cursor-pointer hover:scale-110 transition" />
                  <span className="absolute -top-2 -right-2 text-[10px] bg-red-700 text-white px-1.5 rounded-full">
                    {cartItems.length}
                  </span>
                </div>
              </div>
            </Link>
          )}

          <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;
