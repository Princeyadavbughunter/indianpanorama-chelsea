"use client";

import Image from "next/image";

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
                {/* Widget removed as requested */}
            </div>
        </section>
    );
};

export default Hero;
