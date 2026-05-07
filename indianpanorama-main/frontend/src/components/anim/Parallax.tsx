"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

type Props = {
    children: ReactNode;
    speed?: number; // -1 ... 1 ; positive = moves slower (parallax background)
    className?: string;
    style?: CSSProperties;
};

export default function Parallax({
    children,
    speed = 0.25,
    className = "",
    style,
}: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    const rafId = useRef<number | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return;

        const el = ref.current;
        if (!el) return;

        const update = () => {
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight || 1;
            const center = rect.top + rect.height / 2;
            const progress = (center - vh / 2) / vh;
            const offset = -progress * speed * 100;
            el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
            rafId.current = null;
        };

        const onScroll = () => {
            if (rafId.current === null) {
                rafId.current = window.requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (rafId.current !== null) window.cancelAnimationFrame(rafId.current);
        };
    }, [speed]);

    return (
        <div
            ref={ref}
            className={className}
            style={{ willChange: "transform", ...style }}
        >
            {children}
        </div>
    );
}
