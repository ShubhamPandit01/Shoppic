import { Link } from "react-router-dom";
import { useEffect } from "react";


const About = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    // From Chat GPT
    <div className="bg-gray-100 py-12 px-6 md:px-20 lg:pt-[100px] sm:pt-[130px]">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-6">
        <h2 className="lg:text-4xl text-3xl font-bold text-center text-gray-800">
          About <Link to="/" className="text-red-700 underline">SHOPPIC</Link >
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed text-justify">
          Welcome to <strong>Shoppic</strong> – your one-stop online destination for trendy fashion, quality products, and seamless shopping experience. 
          Based in <strong>Delhi, India</strong>, we pride ourselves on offering a curated selection of stylish apparel, accessories, and lifestyle products tailored for modern shoppers.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed text-justify">
          Our mission is to make online shopping effortless, enjoyable, and reliable. Whether you're updating your wardrobe or searching for the perfect gift, 
          <strong> Shoppic</strong> is committed to delivering top-notch quality, fast shipping, and customer-first service.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed text-justify">
          Backed by a passionate team and a strong network, we believe in innovation, trust, and customer satisfaction. 
          Thank you for choosing <strong>Shoppic</strong> – where fashion meets convenience.
        </p>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Contact Information</h3>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Phone:</strong> +91 8802389087</li>
            <li><strong>Email:</strong> shubhampandit75572@gmail.com</li>
            <li><strong>Address:</strong> Delhi, India</li>
          </ul>
          <br />
          <br />
          <p className="text-md font-semibold">Made with ❤️ by SHUBHAM PANDIT</p>
        </div>
      </div>
    </div>
  );
};

export default About;
