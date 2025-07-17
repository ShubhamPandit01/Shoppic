
import { FaFacebookF, FaInstagram, FaXTwitter, FaGithub, FaYoutube, FaLinkedin} from "react-icons/fa6"


const Footer = () => {

    return (

        <footer className="w-full h-[100px] py-6 px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <p className="mb-4 sm:mb-0 text-xs lg:text-md text-center lg:ml-10">© SHOPPIC All rights reserved. <br /> Made  with ❤️ by SHUBHAM PANDIT</p>
            <div className="flex space-x-5 mr-20 lg:text-2xl text-md text-gray-700 sm:">
                <FaFacebookF className="cursor-pointer hover:text-red-700" />
                <FaInstagram className="cursor-pointer hover:text-red-700" />
                <FaXTwitter className="cursor-pointer hover:text-red-700" />
                <a href="https://github.com/ShubhamPandit01" target="blank"><FaGithub className="cursor-pointer hover:text-red-700" /></a>
                <FaYoutube className="cursor-pointer hover:text-red-700" />
                <a href="https://www.linkedin.com/in/shubhampandit01/" target="blank"><FaLinkedin className="cursor-pointer hover:text-red-700" /></a>
                
            </div>
        </footer>
    )
}

export default Footer


