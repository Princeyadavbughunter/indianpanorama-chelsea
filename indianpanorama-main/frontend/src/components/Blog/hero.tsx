import Image from "next/image";

const Hero = () => {
    return (
        <section className="relative w-full mt-[94px] pb-12 bg-white">
            <div className="relative w-full h-[30vh] md:h-[85vh] overflow-hidden">
                <Image
                    src="/blog/HeroBlog.jpeg"
                    alt="Blog Hero Background"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="100vw"
                />
                {/* Overlay for better text visibility if needed, matching the theme */}
                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-20 text-center">

                </div>
            </div>
        </section>
    );
};

export default Hero;
