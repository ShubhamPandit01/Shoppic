import { useState } from "react";
import { FaPlusCircle, FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, calculateTotal } from "../Redux/slice/Cart";

import { filteredProduct } from "../Redux/slice/data";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [iconHover, setIconHover] = useState(false);

  const navigate = useNavigate()

  const isInCart = cartItems.some(item => item.id === product.id);

  const handleCart = () => {
      if (isInCart) {
        alert('Item already added')
      } else {
        dispatch(addToCart(product));
      }
      dispatch(calculateTotal());
  };

  const handleProductClick= ()=>{
    dispatch(filteredProduct(product.id))
    navigate('/productDetails')
  }

  

  return (
        <div className="relative p-4 shadow-2xl h-[400px] mb-10 rounded-2xl border" >
            <div className="flex flex-col justify-around h-full">
                
                <img src={product.images[0]} alt={product.title} className="rounded-xl h-52 object-cover" onClick={()=>handleProductClick(product.id)}/>

                <div className="space-y-2 mt-4">

                    <h1 className="text-xl font-semibold">{product.title}</h1>
                    <p className="text-lg font-medium text-red-700">Price: ${product.price}</p>

                </div>

                <div
                    className={`absolute bottom-5 z-40 right-5 text-2xl cursor-pointer  hover:scale-125 ${iconHover ? "text-white" : "text-black"}`} onMouseEnter={() => setIconHover(true)} onMouseLeave={() => setIconHover(false)} onClick={handleCart}>

                    {isInCart ? <FaCheckCircle /> : <FaPlusCircle />}
                </div>

                <p className={`absolute bottom-5 right-6 bg-red-700 pr-8 pl-2 text-white text-md rounded-2xl transition-opacityduration-300 ${iconHover ? "opacity-100" : "opacity-0"}`}>
                    
                    {isInCart ? "Added" : "Add to Cart"}
                </p>
            </div>
        </div>
  );
};

export default ProductCard;
