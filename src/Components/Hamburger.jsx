import { Link } from "react-router-dom"


const Hamburger = ({setMenuOpen}) => {
  return (
    <div className="md:hidden flex flex-col gap-4 text-lg font-semibold items-center pt-5">
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
    </div>
  )
}

export default Hamburger