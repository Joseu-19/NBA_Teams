import React, { useState } from "react";

const NavBar = ({ logoSrc, navItems }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white md:text-sm shadow-lg md:rounded-xl md:border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0">
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between py-5 md:block">
                    <a href="#">
                        <img className="logoImg" src={logoSrc} alt="Logo" />
                    </a>
                    <div className="md:hidden">
                        <button
                            className="menu-btn text-gray-500 hover:text-gray-900"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={`flex-1 mt-8 md:mt-0 md:flex ${isOpen ? "block" : "hidden"}`}>
                    <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        {navItems.map((item, index) => (
                            <li key={index} className="navItem text-gray-700 hover:text-gray-900">
                                <a href={item.href} className="block">
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
