"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ReservationDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const ReservationDrawer = ({ isOpen, onClose }: ReservationDrawerProps) => {
    // Default to today
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState("19:00");
    const [guests, setGuests] = useState("2");

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const times = [];
    for (let h = 12; h <= 23; h++) {
        for (let m of ['00', '30']) {
            const time24 = `${h}:${m}`;
            const ampm = h >= 12 ? 'PM' : 'AM';
            const h12 = h > 12 ? h - 12 : h;
            times.push({ value: time24, label: `${h12}:${m} ${ampm}` });
        }
    }

    const handleReserve = (e: React.FormEvent) => {
        e.preventDefault();
        // OpenTable URL format
        const url = `https://www.opentable.co.uk/restref/client/?restref=459894&datetime=${date}T${time}&partysize=${guests}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* Side Drawer */}
            <div 
                className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-[#2D332E] z-[100] transform transition-transform duration-500 ease-in-out shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex flex-col overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header with Close Button */}
                <div className="flex justify-end p-6 pb-2">
                    <button 
                        onClick={onClose}
                        className="text-white hover:text-gray-300 transition-colors"
                        aria-label="Close drawer"
                    >
                        <X size={32} />
                    </button>
                </div>

                {/* Content */}
                <div className="px-8 sm:px-12 pb-12 flex flex-col flex-1">
                    <h2 className="text-3xl font-serif text-white tracking-wide mb-8">
                        Reservations
                    </h2>

                    {/* OpenTable Widget Card */}
                    <div className="bg-white p-6 sm:p-8 rounded-sm shadow-xl mb-10 text-center">
                        <h3 className="text-xl font-serif text-[#333] mb-6">Make a booking</h3>
                        
                        <form onSubmit={handleReserve} className="flex flex-col gap-4">
                            {/* Date Input */}
                            <div className="relative border border-gray-300 p-3 flex items-center bg-white hover:border-gray-400 transition-colors">
                                <svg className="w-5 h-5 text-gray-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <input
                                    type="date"
                                    required
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full bg-transparent text-[#333] text-[15px] outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer z-10"
                                />
                                <svg className="w-4 h-4 text-gray-400 absolute right-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>

                            {/* Time Input */}
                            <div className="relative border border-gray-300 p-3 flex items-center bg-white hover:border-gray-400 transition-colors">
                                <svg className="w-5 h-5 text-gray-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <select
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full bg-transparent text-[#333] text-[15px] outline-none appearance-none cursor-pointer z-10"
                                >
                                    {times.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                </select>
                                <svg className="w-4 h-4 text-gray-400 absolute right-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>

                            {/* Guests Input */}
                            <div className="relative border border-gray-300 p-3 flex items-center bg-white hover:border-gray-400 transition-colors">
                                <svg className="w-5 h-5 text-gray-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    className="w-full bg-transparent text-[#333] text-[15px] outline-none appearance-none cursor-pointer z-10"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(num => (
                                        <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                                    ))}
                                </select>
                                <svg className="w-4 h-4 text-gray-400 absolute right-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#7a816c] text-white py-3 px-4 text-[16px] hover:bg-[#5b6151] transition-colors mt-2"
                            >
                                Find a Table
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="text-[#f5f5f0] font-serif tracking-wide leading-relaxed px-2 flex flex-col gap-6">
                        <p className="text-[17px]">
                            If you wish to book large parties, have any dietary, allergy requests, or specific time slot please contact us.
                        </p>

                        <div>
                            <p className="text-[17px] opacity-90 mb-1">Please call us on:</p>
                            <a href="tel:+442030514535" className="text-[18px] hover:text-[#CBAC70] transition-colors">
                                +44 20 3051 4535
                            </a>
                        </div>

                        <div>
                            <p className="text-[17px] opacity-90 mb-1">Email us via:</p>
                            <a href="mailto:Info@indianpanoramachelsea.co.uk" className="text-[18px] hover:text-[#CBAC70] transition-colors break-words">
                                Info@indianpanoramachelsea.co.uk
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReservationDrawer;
