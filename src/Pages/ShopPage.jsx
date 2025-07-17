
import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Components/Product.card";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";



const ShopPage = () => {

    const {data} = useSelector((state)=>state.data)
    const [category, setCategory] = useState('')
    const [categoryArr, setCategoryArr] = useState([])
    const [productArr, setProductArr] = useState([])

  

    useEffect(() => {

      window.scrollTo(0,0)

      if (data?.products) {
        const newCategorySet = new Set(data?.products?.map((product) => product.category.toUpperCase()));
        setCategoryArr(Array.from(newCategorySet));
      }
    }, [data]);

    function handleSearchInput(e) {

      const input = e.target.value.toLowerCase();

        if (input === "") {
          const allCategories = Array.from(
            new Set(data?.products?.map((product) => product.category.toUpperCase()))
          );
          setCategoryArr(allCategories);
          return;
        }

        const filteredProducts = data?.products?.filter((product) =>
          product.category.toLowerCase().includes(input)
        );

        const filteredCategories = Array.from(
          new Set(filteredProducts?.map((product) => product.category.toUpperCase()))
        );

        setCategoryArr(filteredCategories);
        setProductArr(filteredProducts)
    }



    return (
      <div className="w-full lg:pt-[110px] pt-[80px] mb-10">
        <Link to='/' className="lg:text-4xl text-2xl cursor-pointer ml-3.5 font-bold lg:ml-15 sm:ml-40">
          All <span className="text-red-700 underline">Products</span>
        </Link>

        <div className="container mx-auto lg:flex flex-col lg:flex-row gap-5 lg:mt-5">
          <div className=" rounded-2xl shadow-xl lg:p-6 p-3  lg:w-1/4 w-full sticky lg:top-[140px] top-[100px] h-fit max-h-[calc(100vh-160px)] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-red-700 mb-4 border-b border-red-300 pb-2">
              Category
            </h2>
            <ul className="space-y-3">

                <form className="w-full max-w-md relative">
                    <input
                        type="text"
                        placeholder="Search category"
                        className="w-full px-4 py-2 pl-10 rounded-xl  outline-none text-black"
                        onChange={handleSearchInput}
                    />
                    <FaSearch className="absolute top-3.5 left-3 text-red-700" />
                </form>

                <li className={`hidden lg:block cursor-pointer transition-all duration-200 px-3 py-2 rounded-lg ${category === ""? "bg-red-100 text-red-700 font-bold" : "hover:bg-red-100 hover:text-red-700"}`} onClick={() => setCategory("")}>
                    All
                </li>


                {categoryArr?.map((cat, index) => (
                    <li key={index} className={` hidden lg:block cursor-pointer transition-all duration-200 px-3 py-2 rounded-lg ${ category === cat? "bg-red-100 text-red-700 font-bold" : "hover:bg-red-100 hover:text-red-700"}`}onClick={() => setCategory(cat)}>
                    {cat}
                    </li>
                ))}
            </ul>
          </div>

          <div className="flex-1  rounded-2xl shadow-xl p-6 grid lg:grid-cols-3 gap-6 sm:grid-cols-2 sticky top-[140px] h-fit max-h-[calc(100vh-160px)] overflow-y-auto">
            {
                category
                    ? data?.products
                        ?.filter((product) => product.category.toUpperCase() === category.toUpperCase())
                        .map((product, index) => (
                        <div key={index} className="h-auto">
                            <ProductCard product={product} />
                        </div>
                    ))
                    : productArr.length > 0?
                      productArr.map((product, index) => (
                          <div key={index}>
                          <ProductCard product={product} />
                          </div>
                    ))
                    : data?.products?.map((product, index) => (
                        <div key={index}>
                        <ProductCard product={product} />
                        </div>
                    ))
            }
          </div>
        </div>
      </div>
    );
}


export default ShopPage