import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { MdDeleteForever } from "react-icons/md";
import { removeFromCart, calculateTotal } from "../Redux/slice/Cart"

const Cart = () => {

    const { cartItems, total } = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(calculateTotal());
    }, [cartItems])

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id))
    }

    return (
        <div className="min-h-screen w-full pt-[90px] px-3 ">   
            <h1 className="text-3xl lg:text-4xl font-bold mb-6">
                My <Link to="/shop" className="text-red-700 cursor-pointer">Cart</Link>
            </h1>

            <div className="flex flex-col lg:flex-row gap-5 justify-center">

                <div className="w-full lg:w-[65%] flex flex-col gap-3 px-3 py-5 shadow-xl max-h-[calc(100vh-200px)] overflow-y-auto relative">
                    {
                        cartItems.length > 0 ? (
                            cartItems.map((product) => (
                                <div key={product.id} className="flex flex-col sm:flex-row sm:items-center gap-4 border-b pb-4">
                                    <img src={product.images[0]} alt={product.title} className="w-[100px] h-[100px] object-cover" />
                                    <div className="flex flex-col gap-1">
                                        <h1 className="text-lg font-semibold">{product.title}</h1>
                                        <p className="text-gray-700 font-medium">${product.price}</p>
                                    </div>
                                    <button 
                                        className="sm:absolute sm:right-10 text-3xl hover:text-red-700 self-end sm:self-auto"
                                        onClick={() => handleRemoveItem(product.id)}
                                    >
                                        <MdDeleteForever />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="h-[200px] flex justify-center items-center text-center">
                                <div>
                                    <h1 className="text-2xl lg:text-4xl">Cart is Empty</h1>
                                    <Link to='/shop'>
                                        <button className="w-full bg-red-700 hover:bg-red-500 py-2 rounded-xl mt-7 text-lg lg:text-xl text-white transition-all duration-200">
                                            Continue Shopping
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                </div>


                <div className="w-full lg:w-[25%] shadow-xl px-4 py-5 h-fit">
                    <div className="flex justify-between text-gray-700 mb-4">
                        <div>
                            <p>Subtotal:</p>
                            <p>Shipping:</p>
                            <p>Tax:</p>
                            <p className="font-bold mt-2">Total:</p>
                        </div>
                        <div className="text-end">
                            <p>${total.price ? total.price.toFixed(2) : "0.00"}</p>
                            <p>$4.00</p>
                            <p>18%</p>
                            <p className="font-bold mt-2">${total.finalAmount ? total.finalAmount.toFixed(2) : "0.00"}</p>
                        </div>
                    </div>

                    <button className="w-full bg-red-700 hover:bg-red-500 py-2 rounded-xl text-lg text-white transition-all duration-200">
                        Checkout
                    </button>
                </div>
            </div>


            <Link to="/" className="fixed top-[100px] right-5 z-50">
                <button className="bg-red-700 px-4 py-1 rounded-full text-white font-bold hover:bg-red-500 hover:scale-105 transition-all duration-200">
                    X
                </button>
            </Link>
        </div>
    )
}

export default Cart
