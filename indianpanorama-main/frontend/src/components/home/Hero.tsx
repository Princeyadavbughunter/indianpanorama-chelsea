"use client";

import Image from "next/image";
import { useState } from "react";

const CustomOpenTableWidget = () => {
    // Default to today
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState("19:00");
    const [guests, setGuests] = useState("2");

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
        <form onSubmit={handleReserve} className="w-full max-w-[500px] mx-auto flex flex-col gap-[8px] sm:gap-[10px] font-sans">
            {/* Top Row: Date and Time */}
            <div className="flex flex-row gap-[8px] sm:gap-[10px] w-full">
                {/* Date Input */}
                <div className="relative flex-1 bg-white h-[46px] sm:h-[50px] flex items-center px-3 sm:px-4 shadow-sm">
                    <svg className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] text-[#2d333f] mr-2 sm:mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-transparent text-[#2d333f] text-[13px] sm:text-[15px] font-medium outline-none focus:ring-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer z-10 tracking-tighter sm:tracking-normal"
                    />
                    <div className="pointer-events-none absolute right-2 sm:right-4 hidden sm:block">
                        <svg className="w-[14px] h-[14px] text-[#2d333f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>

                {/* Time Input */}
                <div className="relative flex-1 bg-white h-[46px] sm:h-[50px] flex items-center px-3 sm:px-4 shadow-sm">
                    <svg className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] text-[#2d333f] mr-2 sm:mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-transparent text-[#2d333f] text-[13px] sm:text-[15px] font-medium outline-none appearance-none cursor-pointer z-10"
                    >
                        {times.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                    <div className="pointer-events-none absolute right-2 sm:right-4">
                        <svg className="w-[12px] sm:w-[14px] h-[12px] sm:h-[14px] text-[#2d333f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            </div>

            {/* Guests Input */}
            <div className="relative w-full bg-white h-[46px] sm:h-[50px] flex items-center px-3 sm:px-4 shadow-sm">
                <svg className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] text-[#2d333f] mr-2 sm:mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-transparent text-[#2d333f] text-[14px] sm:text-[15px] font-medium outline-none appearance-none cursor-pointer z-10"
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute right-3 sm:right-4 z-0">
                    <svg className="w-[12px] sm:w-[14px] h-[12px] sm:h-[14px] text-[#2d333f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-black text-white h-[46px] sm:h-[50px] font-semibold tracking-wide text-[15px] sm:text-[16px] hover:bg-gray-900 transition-colors duration-300 shadow-sm"
            >
                Find a table
            </button>
        </form>
    );
};

const Hero = () => {
    return (
        <section
            className="relative w-full overflow-hidden mt-[94px] h-[500px] md:h-[700px] lg:h-[872px]"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero.png"
                    alt="Hero Background"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-6 md:px-20">
                <CustomOpenTableWidget />
            </div>
        </section>
    );
};

export default Hero;
