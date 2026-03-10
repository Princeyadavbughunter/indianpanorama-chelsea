import React from 'react';

const Text = () => {
    return (
        <section className="w-full bg-[#f4f1ea] py-16 px-4 md:px-0">
            <div className="container mx-auto flex flex-col items-center text-center space-y-5">
                <p className="text-[#c5a666] tracking-[0.2em] text-[10px] md:text-sm font-medium">
                    For reservations over 10 people,
                </p>

                <h2 className="text-[#333333] text-[2.5rem] md:text-6xl font-serif leading-tight">
                    Group Bookings
                </h2>

                <p className="text-[#555555] w-[90%] md:max-w-3xl leading-[1.8] text-[0.9rem] md:text-base px-2 font-[var(--font-jost)] font-normal">
                    full private hire up to 80 people - The restaurant is available to hire for lunch and dinner seven
                    days a week, accommodating a maximum of 80 seated, and 200 for drinks and food.
                </p>

                <button className="bg-[#bba061] text-white px-8 py-3 text-xs md:text-sm tracking-widest hover:bg-[#a68d52] transition-colors duration-300 rounded-sm mt-6">
                    Private Dining Menus
                </button>
            </div>
        </section>
    );
};

export default Text;
