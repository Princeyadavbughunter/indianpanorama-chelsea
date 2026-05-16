"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Inject Google Translate Element only when needed:
 * - On mount if a googtrans cookie already exists (returning user with non-EN choice)
 * - On first dropdown open (so first-time visitors with default EN don't pay for it)
 */
function ensureGoogleTranslateLoaded() {
    if (typeof window === "undefined") return;
    if ((window as unknown as { __googTransLoaded?: boolean }).__googTransLoaded) return;
    (window as unknown as { __googTransLoaded?: boolean }).__googTransLoaded = true;

    // Init callback Google's script will call
    (window as unknown as { googleTranslateElementInit?: () => void }).googleTranslateElementInit = function () {
        const g = (window as unknown as { google?: { translate?: { TranslateElement?: new (...args: unknown[]) => unknown } } }).google;
        const TE = g?.translate?.TranslateElement;
        if (!TE) return;
        new TE(
            {
                pageLanguage: "en",
                includedLanguages: "en,fr,es,it,ar,zh-CN",
                autoDisplay: false,
            },
            "google_translate_element"
        );
    };

    const script = document.createElement("script");
    script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);
}

type Lang = {
    code: string;       // googtrans target code
    label: string;
    short: string;      // 2-letter UI label
    flag: string;       // unicode flag
};

const LANGS: Lang[] = [
    { code: "en",    label: "English",  short: "EN", flag: "🇬🇧" },
    { code: "fr",    label: "Français", short: "FR", flag: "🇫🇷" },
    { code: "es",    label: "Español",  short: "ES", flag: "🇪🇸" },
    { code: "it",    label: "Italiano", short: "IT", flag: "🇮🇹" },
    { code: "ar",    label: "العربية",  short: "AR", flag: "🇸🇦" },
    { code: "zh-CN", label: "中文",      short: "ZH", flag: "🇨🇳" },
];

function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
}

function readCurrentLang(): string {
    const c = getCookie("googtrans");
    if (!c) return "en";
    // googtrans cookie format: /auto/<lang>  or  /en/<lang>
    const parts = c.split("/").filter(Boolean);
    const lang = parts[parts.length - 1];
    return lang || "en";
}

function setLanguage(code: string) {
    const value = code === "en" ? "/en/en" : `/en/${code}`;
    // Set cookie on current host
    document.cookie = `googtrans=${value}; path=/; max-age=31536000`;
    // Also try setting on parent domain for subdomains
    try {
        const host = window.location.hostname;
        const parts = host.split(".");
        if (parts.length > 1) {
            const parent = "." + parts.slice(-2).join(".");
            document.cookie = `googtrans=${value}; domain=${parent}; path=/; max-age=31536000`;
        }
    } catch {
        // no-op
    }
    window.location.reload();
}

type Props = {
    variant?: "header" | "footer" | "compact";
    className?: string;
};

export default function LanguageSwitcher({ variant = "header", className = "" }: Props) {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState<string>("en");
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const lang = readCurrentLang();
        setCurrent(lang);
        // If user already picked a non-default language, load Google Translate immediately
        // so the page renders translated. Otherwise wait until the picker is opened.
        if (lang && lang !== "en") {
            ensureGoogleTranslateLoaded();
        }
    }, []);

    const handleOpen = useCallback(() => {
        // First time someone opens the picker, pre-load Google Translate so the switch is instant.
        ensureGoogleTranslateLoaded();
        setOpen((v) => !v);
    }, []);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    const active = LANGS.find((l) => l.code === current) ?? LANGS[0];

    const isHeader = variant === "header";
    const isFooter = variant === "footer";

    return (
        <div ref={ref} className={`relative notranslate ${className}`} translate="no">
            <button
                type="button"
                onClick={handleOpen}
                aria-label="Change language"
                aria-expanded={open}
                className={`group inline-flex items-center gap-2 transition-colors ${
                    isFooter
                        ? "px-3 py-2 border border-[#CBAC70]/30 text-[#e2d6c1] hover:border-[#CBAC70] hover:text-[#CBAC70]"
                        : isHeader
                        ? "px-3 py-2 border border-[#CBAC70]/40 text-[#e2d6c1] hover:text-[#CBAC70] hover:border-[#CBAC70]"
                        : "text-[#CBAC70]"
                }`}
                style={{
                    fontFamily: "var(--font-jost), sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                }}
            >
                <span className="text-[14px] leading-none">{active.flag}</span>
                <span>{active.short}</span>
                <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {open && (
                <div
                    className={`absolute z-[60] min-w-[180px] py-1.5 ${
                        isFooter ? "bottom-full mb-2 left-0" : "top-full mt-2 right-0"
                    }`}
                    style={{
                        background: "#161d18",
                        border: "1px solid rgba(203,172,112,0.35)",
                        boxShadow: "0 12px 32px rgba(0,0,0,0.45)",
                    }}
                    role="menu"
                >
                    {LANGS.map((lang) => {
                        const isActive = lang.code === current;
                        return (
                            <button
                                key={lang.code}
                                role="menuitem"
                                onClick={() => {
                                    if (!isActive) setLanguage(lang.code);
                                    setOpen(false);
                                }}
                                className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 transition-colors hover:bg-[#CBAC70]/10 ${
                                    isActive ? "text-[#CBAC70]" : "text-[#e2d6c1]"
                                }`}
                                style={{
                                    fontFamily: "var(--font-jost), sans-serif",
                                    fontSize: "13px",
                                }}
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-[15px] leading-none">{lang.flag}</span>
                                    <span>{lang.label}</span>
                                </span>
                                {isActive && (
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Hidden Google Translate target — required for Google Translate Element to work */}
            <div id="google_translate_element" style={{ display: "none" }} aria-hidden="true" />
        </div>
    );
}
