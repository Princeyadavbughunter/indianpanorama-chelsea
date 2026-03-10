const CulinaryJourney = () => {
    return (
        <section
            className="w-full flex flex-col items-center justify-center text-center py-20 px-6"
            style={{ backgroundColor: "#FDFBF7" }}
        >
            {/* Subtext */}
            <p
                style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "19.2px",
                    letterSpacing: "1px",
                    color: "#BF9261",
                    marginBottom: "16px",
                    opacity: 1,
                }}
            >
                Tailored for you
            </p>

            <h2
                className="font-normal text-[32px] md:text-[64px] leading-[38px] md:leading-[64px] text-[#2D3630] w-full md:w-[700px] mx-auto opacity-100"
                style={{ fontFamily: "var(--font-roboto-serif), serif" }}
            >
                A Culinary Journey <br /> Across India
            </h2>
        </section>
    );
};

export default CulinaryJourney;
