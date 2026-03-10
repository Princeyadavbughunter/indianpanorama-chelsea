import React from 'react';

const MapSection = () => {
    return (
        <section className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] overflow-hidden bg-[#e5dfd9]">
            {/* Google Map iframe */}
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.1010396449997!2d-0.16620340000000003!3d51.4930133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487605088f78787d%3A0xca4204fddf96773f!2sIndian%20Panorama%20-%20Chelsea!5e0!3m2!1sen!2sin!4v1771787127624!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </section>
    );
};

export default MapSection;
