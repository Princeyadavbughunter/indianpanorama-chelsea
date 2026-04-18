import React from 'react';

export const faqData = [
    {
        question: "Dietary Concerns",
        answer: "Vegan, vegetarian, and gluten-free options are available. For specific dietary requirements or allergies, we kindly request a minimum of 24 hours’ notice. Please note, however, that while every effort is made to accommodate your needs, we cannot guarantee the absence of trace allergens in our dishes."
    },
    {
        question: "Travel",
        answer: "The nearest Underground stations are Sloane Square and South Kensington, both within easy walking distance of the restaurant. Limited parking is available nearby."
    },
    {
        question: "Pets",
        answer: "Unfortunately, pets are not permitted inside the restaurant, with the exception of service animals."
    },
    {
        question: "Dress Code",
        answer: "We encourage smart casual attire to complement the restaurant’s refined atmosphere, though no formal dress code is required."
    },
    {
        question: "Halal",
        answer: "All our meat is halal-certified, ensuring our guests can dine with confidence and comfort."
    },
    {
        question: "Accessibility",
        answer: "The restaurant and its bathrooms are fully wheelchair accessible."
    }
];

const Faq = () => {
    return (
        <section className="w-full py-8 md:py-16 bg-[#fbfbfb]"> {/* Main background could be white or very light grey */}

            <div className="container mx-auto px-4">
                <h2 className="text-5xl md:text-6xl text-center mb-8 md:mb-16 font-[family-name:var(--font-roboto-serif)] text-[#161d18] tracking-tight">
                    FAQs
                </h2>

                <div className="flex flex-col">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row w-full py-8 px-4 md:py-12 md:px-20 ${index % 2 === 0 ? 'bg-[#E9E1DC]' : 'bg-transparent'}`}
                        >
                            {/* Question / Title */}
                            <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-roboto-serif)] font-medium text-[#161d18]">
                                    {item.question}
                                </h3>
                            </div>

                            {/* Answer */}
                            <div className="w-full md:w-2/3">
                                <p className="text-lg font-[family-name:var(--font-jost)] text-[#4a4a4a] leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
