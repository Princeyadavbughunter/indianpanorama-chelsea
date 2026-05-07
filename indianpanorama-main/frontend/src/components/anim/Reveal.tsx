"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

type Direction = "up" | "down" | "left" | "right" | "fade" | "scale";

type Props = {
    children: ReactNode;
    direction?: Direction;
    delay?: number;
    duration?: number;
    distance?: number;
    once?: boolean;
    threshold?: number;
    className?: string;
    style?: CSSProperties;
    as?: "div" | "section" | "article" | "header" | "footer" | "span";
};

const initialTransform = (dir: Direction, distance: number) => {
    switch (dir) {
        case "up": return `translate3d(0, ${distance}px, 0)`;
        case "down": return `translate3d(0, -${distance}px, 0)`;
        case "left": return `translate3d(-${distance}px, 0, 0)`;
        case "right": return `translate3d(${distance}px, 0, 0)`;
        case "scale": return "scale(0.94)";
        case "fade":
        default: return "translate3d(0, 0, 0)";
    }
};

export default function Reveal({
    children,
    direction = "up",
    delay = 0,
    duration = 900,
    distance = 32,
    once = true,
    threshold = 0.15,
    className = "",
    style,
    as = "div",
}: Props) {
    const ref = useRef<HTMLElement | null>(null);
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
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        if (once) obs.disconnect();
                    } else if (!once) {
                        setVisible(false);
                    }
                });
            },
            { threshold, rootMargin: "0px 0px -60px 0px" }
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, [once, threshold]);

    const Tag = as as React.ElementType;

    return (
        <Tag
            ref={ref as React.MutableRefObject<HTMLElement | null>}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : initialTransform(direction, distance),
                transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
                willChange: visible ? "auto" : "opacity, transform",
                ...style,
            }}
        >
            {children}
        </Tag>
    );
}
