import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { FaRegPlusSquare, FaListUl } from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";

const SellerLayout = () => {
    const { setIsSeller } = useAppContext();

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: <FaRegPlusSquare size={20} /> },
        { name: "Product List", path: "/seller/product-list", icon: <FaListUl size={20} /> },
        { name: "Orders", path: "/seller/orders", icon: <HiOutlineBadgeCheck size={24} /> },
    ];

    const signOut = async () => {
        setIsSeller(false);
    };

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <Link to="/">
                    <img className="h-9" src={assets.logo} alt="logo" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>
                        Hi! <span className="text-primary font-bold">Admin</span>
                    </p>
                    <button
                        onClick={() => signOut()}
                        className="rounded-full text-sm px-4 cursor-pointer bg-primary text-white py-1.5"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="flex">
                <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                    {sidebarLinks.map((item, index) => (
                        <NavLink
                            to={item.path}
                            key={item.name}
                            end={item.path === "/seller"}
                            className={({ isActive }) =>
                                `flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px] ${isActive
                                    ? "bg-primary/10 border-primary text-primary"
                                    : "hover:bg-gray-100/90 border-transparent"
                                }`
                            }
                        >
                            {item.icon}
                            <p className="md:block hidden text-center">{item.name}</p>
                        </NavLink>
                    ))}
                </div>
                <Outlet />
            </div>
        </>
    );
};

export default SellerLayout;