import { useEffect, useRef, useState} from "react"


const Contact = () => {

  const [isSubmit, setIsSubmit] = useState(false)

  const input = {
    name: useRef(''),
    email: useRef(''),
    contact: useRef(''),
    message: useRef(''),
  }

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])


  function handleSubmit(e){
    e.preventDefault()
    window.scrollTo(0,0)  
    setIsSubmit(!isSubmit)
  }


  return (
    <div>
      
      <div className="container mx-auto md:flex justify-center lg:pt-[100px] pt-[80px] mb-5 ">
          
          <div className={`${isSubmit ? "w-full" : "w-[40%]"} hidden md:block relative`}>
              {isSubmit ? (<img src="https://i.pinimg.com/1200x/19/41/3b/19413b1439415587fac23eeeb4dbc372.jpg" alt="Contact Image" className="object-cover h-[500px] w-full rounded-2xl"/>) : (
                <img src="https://i.pinimg.com/736x/ac/a6/9e/aca69ea8940387034de7e3f8dcfc5835.jpg" alt="Contact Image" className="object-cover rounded-2xl"/>)}

              {isSubmit && (<button className="absolute right-4 top-4 text-lg font-bold bg-red-300 px-3 py-1 rounded-full hover:bg-red-700 hover:scale-110 transition-all" onClick={() => setIsSubmit(false)}>X</button>)}
          </div>


          <form onSubmit={handleSubmit} className={`lg:w-[50%] lg:mx-10 sm:mx-auto p-10 bg-red-50 rounded-3xl shadow-lg sm:w-[90%] md:w-[50%] ${isSubmit? "hidden" : "block"}`} >
            <h1 className="text-3xl text-center font-bold mb-4">Contact <span className="text-red-700 underline">US</span></h1> 
              <label htmlFor="name" className="text-lg font-semibold " >Name: </label><br />
              <input type="text" placeholder="Enter your name" name="name"  ref={input.name} className="p-1 pl-3 mt-2 w-full outline-none focus:ring-2 focus:rounded-xl focus:ring-red-100 focus:bg-white"/><br />
              <br />
              <label htmlFor="email" className="text-lg font-semibold">E-mail: </label><br />
              <input type="email" placeholder="Enter your email" name="email" ref={input.email} className="p-1 pl-3 mt-2 w-full outline-none focus:ring-2 focus:rounded-xl focus:ring-red-100 focus:bg-white"/><br />
              <br />
              <label htmlFor="contact" className="text-lg font-semibold">Contact: </label><br />
              <input type="number" placeholder="Enter your number" name="contact" ref={input.contact} className="p-1 pl-3 mt-2 w-full outline-none focus:ring-2 focus:rounded-xl focus:ring-red-100 focus:bg-white"/><br />
              <br />
              <label htmlFor="message" className="block font-semibold text-lg" >Message:</label>
              <textarea name="message" placeholder="Type your message here..." rows="6" ref={input.message} className=" p-1 pl-3 mt-2 w-full outline-none focus:ring-2 focus:rounded-xl focus:ring-red-100 focus:bg-white mb-3 "
              ></textarea>
              <br />
              <button type="submit" className="h-[40px] w-full bg-red-700 transition-all duration-200 rounded-2xl text-white hover:scale-105 hover:shadow-md shadow-red-700">Send Message</button>
          </form>
      </div>
    </div>
  )
}

export default Contact