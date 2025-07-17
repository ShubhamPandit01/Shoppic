import { useState, useEffect } from "react"

import imgHero from "../assets/Hero.jpg"
import { useSelector } from "react-redux"


import ProductCard from "../Components/Product.card"
import AllProduct from "../Components/AllProduct"
import Contact from "../Components/Contact"


const Home = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  const {data} = useSelector((state) => state.data)
  const [topProduct, setTopProduct] = useState(['4','39','78','96'])


  function generateId() {
    const newTopProducts = [];
    while (newTopProducts.length < 4) {
      const randomId = Math.floor(Math.random() * 196) + 1;
      if (!newTopProducts.includes(randomId.toString())) {
        newTopProducts.push(randomId.toString());
      }
    }
    setTopProduct(newTopProducts);
  }


  return (
    <div className="w-full">
      <div>
        <img src={imgHero} alt="Image" className="object-cover w-full pt-[80px] lg:h-[80vh]" />
      </div>

      <div className="container mx-auto px-3 flex justify-between">
        <h1 className="lg:text-4xl text-2xl font-bold cursor-pointer">Top <span className="text-red-700 underline">Products</span></h1>
      
        <button className="py-2 bg-red-700 w-[130px] transition-all duration-300 rounded-2xl text-white hover:scale-102" onClick={()=>generateId()}>
          New Products
        </button>
      </div>

      <div className="lg:mt-[30px] container mx-auto grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-5 lg:gap-4 lg:px-0 p-6">
        {
          data?.products?.filter(product => topProduct.includes(product.id.toString()))
            .map((product,index) => (
                <div key={index}> <ProductCard product={product} /></div>
            ))
        }
      </div>

      <div>
        <AllProduct/>
      </div>

      <Contact/>

    </div>
  )
}

export default Home
