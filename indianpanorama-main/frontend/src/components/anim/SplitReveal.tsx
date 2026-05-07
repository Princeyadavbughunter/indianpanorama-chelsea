"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Props = {
    text: string;
    delay?: number;
    duration?: number;
    stagger?: number;
    className?: string;
    style?: CSSProperties;
    italicLast?: boolean;
    italicClass?: string;
};

/**
 * Reveals text word-by-word with a vertical mask wipe.
 * Each word slides up from below, opacity fades in, with a per-word stagger.
 */
export default function SplitReveal({
    text,
    delay = 0,
    duration = 800,
    stagger = 60,
    className = "",
    style,
}: Props) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            setVisible(true);
            return;
        }

        const el = ref.current;
        if (!el) return;

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const words = text.split(" ");

    return (
        <span ref={ref} className={className} style={style} aria-label={text}>
            {words.map((word, i) => (
                <span
                    key={i}
                    aria-hidden="true"
                    style={{
                        display: "inline-block",
                        overflow: "hidden",
                        verticalAlign: "bottom",
                        marginRight: i === words.length - 1 ? 0 : "0.28em",
                    }}
                >
                    <span
                        style={{
                            display: "inline-block",
                            transform: visible ? "translate3d(0, 0, 0)" : "translate3d(0, 110%, 0)",
                            opacity: visible ? 1 : 0,
                            transition: `transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay + i * stagger}ms, opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay + i * stagger}ms`,
                            willChange: visible ? "auto" : "transform, opacity",
                        }}
                    >
                        {word}
                    </span>
                </span>
            ))}
        </span>
    );
}
