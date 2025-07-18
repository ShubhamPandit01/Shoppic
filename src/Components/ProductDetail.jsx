import { useEffect,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {addToCart, calculateTotal, removeFromCart} from "../Redux/slice/Cart"
import { MdDeleteForever } from "react-icons/md";

const ProductDetail = () => {

    const [isClicked, setIsClicked] = useState(false)
    const { clickedProduct } = useSelector((state) => state.data);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { cartItems} = useSelector((state) => state.cart);

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    if (!clickedProduct) {
        return <p className="text-center pt-30 text-xl">No product selected.</p>;
    }

    const isInCart = cartItems.some(item => item.id === clickedProduct.id);

    const handleBuy = () => {
        if (isInCart) {
            navigate('/cart')
        } else {
            dispatch(addToCart(clickedProduct));
        }
        dispatch(calculateTotal());
    };

    const handleAddToCart = () => {
        if (isInCart) {
            setIsClicked(false)
        } else {
            dispatch(addToCart(clickedProduct));
            dispatch(calculateTotal());
        }

        setIsClicked(true)
    };

    const handleRemoveItem =()=>{
        dispatch(removeFromCart(clickedProduct.id))
        setIsClicked(false)
    }



    return (
        <div className=" w-full lg:pt-[100px] container mx-auto p-6">
        <div className=" container mx-auto flex flex-col lg:flex-row justify-between items-top ">
            <img
            src={clickedProduct.images?.[0]}
            alt={clickedProduct.title}
            className="rounded-xl object-cover h-100 min-h-110 max-w-[40%] self-center"
            />
            <div className="">
            <h1 className="text-4xl font-semibold">{clickedProduct.title}</h1>
            <p className="text-red-700 mt-2">Price: <span className="text-xl">${clickedProduct.price}</span></p>
            <p className="text-gray-700 my-2">{clickedProduct.description}</p>
            <div className="flex justify-between min-w-[50%]">
                <div>
                    <p>Brand: {clickedProduct.brand}</p>
                    <p>Category: {clickedProduct.category}</p>
                    <p>Stock: {clickedProduct.stock}</p>
                    <p>{clickedProduct.warrantyInformation}</p>
                    <p>{clickedProduct.shippingInformation}</p>
                    <p className="text-green-600 font-semibold">{clickedProduct.availabilityStatus}</p>
                </div>

                <div>
                    <img src={clickedProduct.meta.qrCode} alt="QR Code of this product" className="pr-30 h-[100px] "/>
                </div>
            </div>

            <div className="flex items-center gap-4 mt-6 lg:justify-start justify-center">

                <button className="bg-green-300 py-2 px-5 hover:bg-green-700 hover:text-white rounded-lg" onClick={handleBuy}> Buy Now</button>
                <button className="bg-red-400 py-2 px-5 hover:bg-red-700 hover:text-white rounded-lg" onClick={handleAddToCart}> {isClicked ? "Added" : "Add to Cart"}</button>
                {isClicked && <button className="flex items-center justify-center" onClick={handleRemoveItem}><MdDeleteForever className="text-4xl hover:text-red-700" /></button>}
            
            </div>


            <div className="grid grid-cols-3  shadow-md p-4 lg:mt-13">
                    {
                        clickedProduct.reviews?.map((review,index)=>(
                            <div className="text-center px-1" key={index}>
                                <p className="font-semibold">{review.reviewerName}</p>
                                {/* From chat GPT */}
                                <p className="text-[#FDC700] flex gap-2 justify-center ">{[...Array(parseInt(review.rating))].map((_, i) => (
                                    <FaStar key={i} />))}
                                </p>  
                                <p>{review.comment}</p>
                            </div>
                        ))
                    }
            </div>

            </div>
        </div>
        </div>
    );
    };

export default ProductDetail;
