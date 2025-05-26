import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { user, setUser, isShowUserLogin, setIsShowUserLogin } = useAppContext()

    // Auto-close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {

            if (window.innerWidth >= 640) {
                setOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to="/">
                <img className="h-9" src={assets.logo} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/products" >All Product</NavLink>
                <NavLink to="/contact" >Contact</NavLink>
                {user && <NavLink to="/orders" >My Orders</NavLink>}

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt='search-icon' className='w-4 h-4' />
                </div>

                <div className="relative cursor-pointer">
                    <img src={assets.cart_icon} className='w-6 opacity-80' alt="cart-icon" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">3</button>
                </div>

                {!user ? <button className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full" onClick={() => {
                    setIsShowUserLogin(true)
                    setOpen(false)
                }}>
                    Sign In
                </button> : <button className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full" onClick={() => setOpen(false)}>
                    Sign Out
                </button>}
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden hover:cursor-pointer">
                <img src={assets.menu_icon} alt="menu-icon" />
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to="/" className="block" onClick={() => setOpen(false)}>Home</NavLink>

                <NavLink to="/products" className="block" onClick={() => setOpen(false)}>All Product</NavLink>

                {user && <NavLink to="/orders" className="block" onClick={() => setOpen(false)}>My Orders</NavLink>}

                <NavLink to="/contact" className="block" onClick={() => setOpen(false)}>Contact</NavLink>

                {!user ? <button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm" onClick={() => {
                    setIsShowUserLogin(true)
                    setOpen(false)
                }}>
                    Sign in
                </button> : <button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm" onClick={() => setOpen(false)}>
                    Sign out
                </button>}
            </div>
        </nav>
    )
}

export default Navbar
