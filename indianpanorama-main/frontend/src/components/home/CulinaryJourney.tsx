import Reveal from "@/components/anim/Reveal";
import SplitReveal from "@/components/anim/SplitReveal";

const CulinaryJourney = () => {
    return (
        <section
            className="relative w-full py-20 md:py-28 px-6 overflow-hidden"
            style={{ backgroundColor: "#FDFBF7" }}
        >
            {/* Soft top divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-3 -translate-y-1/2 bg-[#FDFBF7] px-6">
                <span className="block w-[40px] h-[1px] bg-[#BF9261]/50" />
                <span className="text-[10px] text-[#BF9261]">◆</span>
                <span className="block w-[40px] h-[1px] bg-[#BF9261]/50" />
            </div>

            <div className="max-w-[900px] mx-auto text-center">
                <Reveal direction="fade" duration={800}>
                    <p
                        className="uppercase mb-5"
                        style={{
                            fontFamily: "var(--font-jost), sans-serif",
                            fontWeight: 400,
                            fontSize: "12px",
                            letterSpacing: "3px",
                            color: "#BF9261",
                        }}
                    >
                        Tailored for the Curious Palate
                    </p>
                </Reveal>

                <h2
                    className="font-normal text-[34px] md:text-[60px] leading-[1.1] text-[#2D3630]"
                    style={{ fontFamily: "var(--font-roboto-serif), serif" }}
                >
                    <SplitReveal text="A Culinary Journey" delay={150} stagger={70} />
                    <br />
                    <span className="italic text-[#BF9261]">
                        <SplitReveal text="Across India" delay={500} stagger={80} />
                    </span>
                </h2>
            </div>
        </section>
    );
};

export default CulinaryJourney;
