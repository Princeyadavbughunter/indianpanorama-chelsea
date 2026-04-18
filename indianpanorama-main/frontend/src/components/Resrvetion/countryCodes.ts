export type CountryCode = {
    code: string;   // dial code WITHOUT +, e.g. "44"
    iso: string;    // ISO 3166-1 alpha-2
    name: string;
    flag: string;   // emoji flag
};

// Ordered: UK first (home market), then India (large expected audience), then A-Z.
export const COUNTRY_CODES: CountryCode[] = [
    { code: "44",  iso: "GB", name: "United Kingdom",  flag: "🇬🇧" },
    { code: "91",  iso: "IN", name: "India",           flag: "🇮🇳" },
    { code: "1",   iso: "US", name: "United States",   flag: "🇺🇸" },
    { code: "971", iso: "AE", name: "UAE",             flag: "🇦🇪" },
    { code: "61",  iso: "AU", name: "Australia",       flag: "🇦🇺" },
    { code: "880", iso: "BD", name: "Bangladesh",      flag: "🇧🇩" },
    { code: "32",  iso: "BE", name: "Belgium",         flag: "🇧🇪" },
    { code: "55",  iso: "BR", name: "Brazil",          flag: "🇧🇷" },
    { code: "1",   iso: "CA", name: "Canada",          flag: "🇨🇦" },
    { code: "86",  iso: "CN", name: "China",           flag: "🇨🇳" },
    { code: "45",  iso: "DK", name: "Denmark",         flag: "🇩🇰" },
    { code: "20",  iso: "EG", name: "Egypt",           flag: "🇪🇬" },
    { code: "33",  iso: "FR", name: "France",          flag: "🇫🇷" },
    { code: "49",  iso: "DE", name: "Germany",         flag: "🇩🇪" },
    { code: "852", iso: "HK", name: "Hong Kong",       flag: "🇭🇰" },
    { code: "353", iso: "IE", name: "Ireland",         flag: "🇮🇪" },
    { code: "972", iso: "IL", name: "Israel",          flag: "🇮🇱" },
    { code: "39",  iso: "IT", name: "Italy",           flag: "🇮🇹" },
    { code: "81",  iso: "JP", name: "Japan",           flag: "🇯🇵" },
    { code: "254", iso: "KE", name: "Kenya",           flag: "🇰🇪" },
    { code: "60",  iso: "MY", name: "Malaysia",        flag: "🇲🇾" },
    { code: "52",  iso: "MX", name: "Mexico",          flag: "🇲🇽" },
    { code: "31",  iso: "NL", name: "Netherlands",     flag: "🇳🇱" },
    { code: "64",  iso: "NZ", name: "New Zealand",     flag: "🇳🇿" },
    { code: "234", iso: "NG", name: "Nigeria",         flag: "🇳🇬" },
    { code: "47",  iso: "NO", name: "Norway",          flag: "🇳🇴" },
    { code: "92",  iso: "PK", name: "Pakistan",        flag: "🇵🇰" },
    { code: "48",  iso: "PL", name: "Poland",          flag: "🇵🇱" },
    { code: "351", iso: "PT", name: "Portugal",        flag: "🇵🇹" },
    { code: "974", iso: "QA", name: "Qatar",           flag: "🇶🇦" },
    { code: "7",   iso: "RU", name: "Russia",          flag: "🇷🇺" },
    { code: "966", iso: "SA", name: "Saudi Arabia",    flag: "🇸🇦" },
    { code: "65",  iso: "SG", name: "Singapore",       flag: "🇸🇬" },
    { code: "27",  iso: "ZA", name: "South Africa",    flag: "🇿🇦" },
    { code: "82",  iso: "KR", name: "South Korea",     flag: "🇰🇷" },
    { code: "34",  iso: "ES", name: "Spain",           flag: "🇪🇸" },
    { code: "94",  iso: "LK", name: "Sri Lanka",       flag: "🇱🇰" },
    { code: "46",  iso: "SE", name: "Sweden",          flag: "🇸🇪" },
    { code: "41",  iso: "CH", name: "Switzerland",     flag: "🇨🇭" },
    { code: "66",  iso: "TH", name: "Thailand",        flag: "🇹🇭" },
    { code: "90",  iso: "TR", name: "Turkey",          flag: "🇹🇷" },
];

// Unique key per entry because some share dial codes (e.g. US & Canada = +1)
export const keyFor = (c: CountryCode) => `${c.iso}-${c.code}`;

export const DEFAULT_COUNTRY = COUNTRY_CODES[0]; // UK
