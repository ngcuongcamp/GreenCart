import { useEffect, useState } from "react";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg bg-primary text-white hover:bg-primary-dull transition-all duration-300  cursor-pointer ${visible ? "opacity-100" : "opacity-0 pointer-events-none "
                }`}
            aria-label="Scroll to top"
        >
            <FaRegArrowAltCircleUp size={20} />
        </button>
    );
};

export default ScrollToTopButton;
