import { Link, NavLink } from "react-router-dom";
import { assets, footerLinks } from "../assets/assets";

const Footer = () => {

    return (
        <div className="mt-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500 ">
                <div>
                    <img className="w-44 md:w-36" src={assets.logo} alt="Fresh Market Logo" />
                    <p className="max-w-[410px] mt-6">
                        Bringing nature to your doorstep – we deliver fresh fruits, vegetables, and groceries picked daily with care. Eat well, live fresh.
                    </p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <Link to={link.url} className="hover:underline transition">{link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-sub-text">
                © {new Date().getFullYear()}
                <span className="text-primary-dull"> GreenCart</span>
                . All rights reserved.
            </p>
        </div>
    );
};

export default Footer;
