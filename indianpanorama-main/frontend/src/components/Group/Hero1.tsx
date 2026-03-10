
import Image from "next/image";

const Hero1 = () => {
    return (
        <section className="relative w-full mt-[94px] bg-white">
            <div className="relative w-full h-[50vh] md:h-[85vh] overflow-hidden">
                <Image
                    src="/Group/groupHero.jpeg"
                    alt="Group Hero Background"
                    fill
                    priority
                    className="object-cover object-center"
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

export default Hero1;
