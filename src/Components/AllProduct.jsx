
import { useSelector } from "react-redux";
import ProductCard from "./Product.card";
import { Link } from "react-router-dom";


const AllProduct = () => {
    
    const {data} = useSelector((state)=>state.data)

    return (
        <div className="relative">
             <h1 className="lg:text-4xl text-2xl lg:ml-18 ml-4 font-bold cursor-pointer">All <span className="text-red-700 underline">Products</span></h1>

            <div className="lg:mt-[30px] container mx-auto grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-5 lg:gap-4 lg:px-0 p-6">
                {
                    data?.products?.slice(0,4).map((product, index)=>(
                        <div key={index}><ProductCard product={product}/></div>
                    ))
                }
            </div>

            <Link to="/shop"><button className="absolute bottom-4 right-7 py-2 bg-red-700 w-[100px] transition-all duration-200 lg:ml-18 mt-5 rounded-2xl text-white hover:scale-102 ml-4 ">
                View More
            </button></Link>
        </div>
    )

}

export default AllProduct