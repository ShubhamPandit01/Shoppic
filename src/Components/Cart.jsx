import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import {
  addToCart,
  removeFromCart,
  calculateTotal,
  increaseQuantity,
  decreaseQuantity,
} from "../Redux/slice/Cart";

const Cart = () => {
  const { cartItems, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems, dispatch]);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    cartItems.forEach((item) => dispatch(removeFromCart(item.id)));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="min-h-screen w-full pt-[90px] px-3">
      <h1 className="text-3xl lg:text-4xl font-bold mb-6">
        My <Link to="/shop" className="text-red-700 cursor-pointer">Cart</Link>
      </h1>

      <div className="flex flex-col lg:flex-row gap-5 justify-center">

        <div className="w-full lg:w-[65%] flex flex-col gap-3 px-3 py-5 shadow-xl max-h-[calc(100vh-200px)] overflow-y-auto relative">
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <div key={product.id} className="flex flex-col sm:flex-row sm:items-center gap-4 border-b pb-4">
                <img
                  src={product.images?.[0] || "https://i.pinimg.com/736x/e2/6c/ab/e26cab770fe12397e13ee258429c6250.jpg"}
                  alt={product.title}
                  className="w-[100px] h-[100px] object-cover"
                />
                <div className="flex flex-col gap-1">
                  <h1 className="text-lg font-semibold">{product.title}</h1>
                  <p className="text-gray-700 font-medium">${product.price}</p>
                </div>

                <div className="sm:absolute sm:right-10 flex items-center gap-6 mt-2 sm:mt-0">
                  <div className="w-[70px] border flex items-center">
                    <button
                      className="w-[30%] h-6 font-bold px-1 hover:text-xl bg-red-50"
                      onClick={() => handleDecreaseQuantity(product.id)}
                    >
                      -
                    </button>
                    <p className="w-[40%] font-bold text-center">{product.quantity}</p>
                    <button
                      className="w-[30%] h-6 font-bold bg-red-50 px-1 hover:text-xl"
                      onClick={() => handleIncreaseQuantity(product)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-3xl hover:text-red-700"
                    onClick={() => handleRemoveItem(product.id)}
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="h-[200px] flex justify-center items-center text-center">
              <div>
                <h1 className="text-2xl lg:text-4xl">Cart is Empty</h1>
                <Link to="/shop">
                  <button className="w-[200px] bg-red-700 hover:bg-red-500 py-2 rounded-xl mt-7 text-lg text-white transition-all duration-200">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          )}
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
              <p>${total.price?.toFixed(2)}</p>
              <p>$4.00</p>
              <p>18%</p>
              <p className="font-bold mt-2">${total.finalAmount?.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex justify-around">
            <button className="w-[130px] px-3 py-1 bg-red-700 rounded-lg text-white hover:bg-red-500 transition-all duration-200">
              Checkout
            </button>
            {cartItems.length > 0 && (
              <button
                className="w-[130px] px-3 py-1 bg-red-700 rounded-lg text-white hover:bg-red-500 transition-all duration-200"
                onClick={handleClearCart}
              >
                Clear cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
