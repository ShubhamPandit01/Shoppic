import { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserAlt, FaCartPlus} from "react-icons/fa";
import { useSelector, useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import Hamburger from "./Hamburger";
import LogoutButton from "./Logout";
import { currencyFilter } from "../Redux/slice/data";


const Navbar = () => {
    const dispatch = useDispatch()
    const [cart, setCart] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(false);

    const { cartItems } = useSelector((state) => state.cart);

    function handlePath(){
        if(cart == ''){
            setCart('cart')
        }else setCart('')
    }

    function handleCurrency(e){
        let value = e.target.value
        console.log(e.target.value)
        dispatch(currencyFilter(value))
    }

    const { currentUser } = useSelector((state) => state.user); // for logout



    return (
        <div className="w-full py-3 shadow-xl bg-white fixed z-50">

            <div className="h-[50px] container mx-auto flex items-center justify-between px-4 mb-2">
                <Link to='/' >
                    <img src="https://i.pinimg.com/1200x/1e/1c/3b/1e1c3bc1d63b7e17faf3dfc8d8044bdb.jpg" alt="Shoppic" className="w-[50px] h-[50px] overflow-hidden "/>
                </Link >

                 <div className="text-3xl text-red-700 lg:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                    <GiHamburgerMenu />
                </div>


                <div className="hidden lg:flex justify-center gap-10 py-2 items-center">
                    <select name="currency" id="currency" className="block w-full p-1 border border-gray-300 rounded-md shadow-sm" onClick={(e)=>handleCurrency(e)}>
                        <option value="USD">US Dollar (USD)</option>
                        <option value="INR">Indian Rupee (INR)</option>
                        <option value="EUR">Euro (EUR)</option>
                        <option value="GBP">British Pound (GBP)</option>
                        <option value="JPY">Japanese Yen (JPY)</option>
                    </select>


                    <Link to="/" className="text-lg hover:text-red-700 hover:underline hover:scale-105 transition duration-300">Home</Link>
                    <Link to="/shop" className="text-lg hover:text-red-700 hover:underline hover:scale-105 transition duration-300">Shop</Link>
                    <Link to="/contact" className="text-lg hover:text-red-700 hover:underline hover:scale-105 transition duration-300">Contact</Link>
                    <Link to="/about" className="text-lg hover:text-red-700 hover:underline hover:scale-105 transition duration-300">About</Link>

                    <div className="relative flex items-center gap-5 text-xl ml-6">
                        <Link to={`/${cart? '': 'cart'}`}><FaCartPlus className="text-lg hover:text-red-700 cursor-pointer hover:scale-110 transition" onClick={handlePath} />
                                {cartItems.length > 0 && (
                                    <span className="absolute left-3 bottom-3 text-xs bg-red-700 text-white px-1 rounded-full">
                                        {cartItems.length}
                                    </span>
                                )}
                        </Link>
                        {!currentUser?<Link to={`/${userProfile? '': 'user'}`}><FaUserAlt className="text-lg hover:text-red-700 cursor-pointer hover:scale-110 transition" onClick={()=>setUserProfile(!userProfile)}/></Link>
                        :<LogoutButton/>}
                    </div>

                </div>

            </div>

            <div>
                {menuOpen && <Hamburger setMenuOpen={setMenuOpen}/>}
            </div>

        </div>
    );
    };

export default Navbar;
