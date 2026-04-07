import Image from 'next/image';

export default function Gallery() {
    return (
        <section className="bg-white py-20">
            <div className="max-w-[1510px] w-full mx-auto px-4 md:px-[35px]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px] md:gap-[40px] auto-rows-auto md:h-[611px]">
                    {/* New Wide Image: Mobile Pos 1, Desktop Col 1 & 2, Row 1 */}
                    <div className="relative w-full h-[250px] md:h-full rounded-lg overflow-hidden col-span-2 md:col-start-1 md:col-span-2 md:row-start-1 bg-black">
                        <Image
                            src="/images/Gallery/new_tall_image.jpeg"
                            alt="Gallery Image (Wide)"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Image bottom left: Desktop Col 1 Row 2 */}
                    <div className="relative w-full h-[200px] md:h-full rounded-lg overflow-hidden md:col-start-1 md:row-start-2">
                        <Image
                            src="/images/Gallery/3.png"
                            alt="Gallery Image 3"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Image bottom right: Desktop Col 2 Row 2 */}
                    <div className="relative w-full h-[200px] md:h-full rounded-lg overflow-hidden md:col-start-2 md:row-start-2">
                        <Image
                            src="/images/Gallery/4.png"
                            alt="Gallery Image 4"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Image 5 (Big): Mobile Pos 5 (Full Width), Desktop Col 3 Row Span 2 */}
                    <div className="relative w-full h-[550px] md:h-full rounded-lg overflow-hidden col-span-2 md:col-span-1 md:col-start-3 md:row-span-2 md:row-start-1 bg-black">
                        <video
                            src="/images/chef_patron.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Image 6: Mobile Pos 6, Desktop Col 4 Row 1 */}
                    <div className="relative w-full h-[200px] md:h-full rounded-lg overflow-hidden md:col-start-4 md:row-start-1">
                        <Image
                            src="/images/Gallery/6.png"
                            alt="Gallery Image 6"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Image 7: Mobile Pos 7, Desktop Col 4 Row 2 */}
                    <div className="relative w-full h-[200px] md:h-full rounded-lg overflow-hidden md:col-start-4 md:row-start-2">
                        <Image
                            src="/images/Gallery/7.png"
                            alt="Gallery Image 7"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
