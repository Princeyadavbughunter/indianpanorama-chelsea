"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ReservationForm from "@/components/Resrvetion/form";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: "RESERVATIONS", href: "/reservation" },
        {
            name: "MENUS",
            submenu: [
                { name: "Main Menu", href: "https://reed-mackerel-4ymk.squarespace.com/s/Indian-Panorama-Chelsea-Main-Menu.pdf", external: true },
                { name: "Lunch", href: "https://static1.squarespace.com/static/68fa2bcde29fd26b01a84413/t/68fa9d3239cca44b985ddc8f/1761254706568/Lunch+Menu.pdf", external: true },
                { name: "Drinks", href: "/menu/drinks menu 02.2026.pdf", external: true },
                { name: "Private Dining", href: "https://reed-mackerel-4ymk.squarespace.com/s/Indian-Panorama-Chelsea-Private-Dining-FINAL.pdf", external: true },
                { name: "Takeaway", href: "/menu/A4 Long Takeaway Menu 02.2026-1.pdf", external: true }
            ]
        },
        { name: "GROUP BOOKINGS", href: "/group" },
        { name: "BLOG", href: "/blog" },
        { name: "FAQ", href: "/faq" },
    ];

    return (
        <header
            className="absolute top-0 left-0 right-0 z-50 flex items-center border-b px-3 md:px-0"
            style={{
                width: "100%",
                height: "94px",
                background: "linear-gradient(0deg, rgba(22, 29, 24, 0.9), rgba(22, 29, 24, 0.9))",
                borderBottom: "1px solid #CBAC70",
            }}
        >
            <div className="relative w-full h-full flex items-center justify-between">
                {/* Logo Section */}
                <div
                    className="flex items-center ml-0 md:ml-[45px]"
                    style={{
                        height: "58px",
                    }}
                >
                    <Link href="/">
                        <Image
                            src="/images/logo2.png"
                            alt="Logo"
                            width={140}
                            height={58}
                            className="object-contain h-[58px] w-auto brightness-110"
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav
                    className="hidden lg:flex items-center justify-end"
                    style={{
                        marginRight: "45px",
                        height: "56px",
                        gap: "20px"
                    }}
                >
                    {navItems.map((item) => (
                        item.submenu ? (
                            <div key={item.name} className="relative group">
                                <button
                                    className="flex items-center justify-center hover:text-white transition-colors duration-300 font-serif cursor-pointer"
                                    style={{
                                        height: "46px",
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        color: "#e2d6c1",
                                        letterSpacing: "0.15em",
                                    }}
                                >
                                    {item.name}
                                </button>
                                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <div className="bg-[#161d18] flex flex-col min-w-[180px] shadow-lg border border-[#CBAC70]/30 rounded">
                                        {item.submenu.map((sub) => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                target={sub.external ? "_blank" : undefined}
                                                rel={sub.external ? "noopener noreferrer" : undefined}
                                                className="px-4 py-3 hover:bg-[#CBAC70]/10 hover:text-[#CBAC70] transition-colors duration-300 font-serif border-b border-[#CBAC70]/10 last:border-0"
                                                style={{ color: "#e2d6c1", fontSize: "15px", letterSpacing: "0.05em" }}
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={item.name}
                                href={item.href!}
                                className="flex items-center justify-center hover:text-white transition-colors duration-300 font-serif"
                                style={{
                                    height: "46px",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    color: "#e2d6c1",
                                    letterSpacing: "0.15em",
                                }}
                            >
                                {item.name}
                            </Link>
                        )
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none z-50 mr-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-8 h-0.5 bg-[#CBAC70] transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-8 h-0.5 bg-[#CBAC70] transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`block w-8 h-0.5 bg-[#CBAC70] transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Navigation Drawer */}
            <div
                className={`fixed top-[94px] left-0 right-0 z-40 bg-[#161d18] flex flex-col items-start justify-start transition-all duration-500 ease-in-out lg:hidden rounded-b-[30px] overflow-hidden ${isMenuOpen ? 'max-h-[60vh] opacity-100 border-b border-[#CBAC70]' : 'max-h-0 opacity-0'
                    }`}
                style={{
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}
            >
                <nav className="flex flex-col items-start space-y-6 pl-10 py-10 w-full">
                    {navItems.map((item) => (
                        item.submenu ? (
                            <div key={item.name} className="flex flex-col items-start w-full">
                                <span
                                    className="text-lg font-serif tracking-widest transition-colors mb-3"
                                    style={{ color: "#CBAC70" }}
                                >
                                    {item.name}
                                </span>
                                <div className="flex flex-col space-y-3 pl-4 border-l border-[#CBAC70]/30 w-full mb-2">
                                    {item.submenu.map((sub) => (
                                        <Link
                                            key={sub.name}
                                            href={sub.href}
                                            target={sub.external ? "_blank" : undefined}
                                            rel={sub.external ? "noopener noreferrer" : undefined}
                                            className="text-[16px] font-serif tracking-wider hover:text-[#CBAC70] transition-colors"
                                            style={{ color: "#e2d6c1" }}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={item.name}
                                href={item.href!}
                                className="text-lg font-serif tracking-widest hover:text-[#CBAC70] transition-colors"
                                style={{ color: "#e2d6c1" }}
                                onClick={() => {
                                    setIsMenuOpen(false);
                                }}
                            >
                                {item.name}
                            </Link>
                        )
                    ))}
                </nav>
            </div>

        </header>
    );
};

export default Header;
