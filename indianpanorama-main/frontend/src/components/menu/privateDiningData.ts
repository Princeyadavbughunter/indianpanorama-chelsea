export type DishWithDescription = {
    name: string;
    description: string;
};

export type SetMenu = {
    id: string;
    number: string;
    category: "Non-Vegetarian" | "Vegetarian";
    price: string;
    smallPlates: DishWithDescription[];
    mains: DishWithDescription[];
    sides: string[];
    riceAndBread: string[];
    desserts: string[];
};

const COMMON_DESCRIPTIONS: Record<string, string> = {
    "The Delhi Street Kebab":
        "Our take on a Delhi street food icon, the Tawa Seekh Kebab. Skewers of minced lamb steeped in delicate spices, twice cooked for extra succulence.",
    "Ajwain Chicken Tikka":
        "Chicken breast cooked with fragrant hand-ground ajwain (carom seeds) and tangy pickling spices.",
    "Fish Amritsari":
        "A dish from Amritsar that’s become a modern classic across India. Fish fillets with a quintessential blend of Indian herbs & spices.",
    "Mango Malai Tikka":
        "Melt-in-the-mouth chicken breast pieces marinated in ground spices and India’s national fruit – ripe, juicy mango – then grilled over a tandoor flame.",
    "Punjabi Samosa Chaat":
        "The iconic Punjabi street snack: samosa with peas & crunchy potatoes, drizzled in chickpea curry and topped with fresh pomegranate jewels.",
    "Bhaji Panorama":
        "Our take on the onion bhaji with a powerful kick of coriander.",
    "Chandni Chowk Aloo Tikki":
        "Spiced potato patties layered with fresh yoghurt & spicy tamarind chutney, just how they do it on Delhi’s iconic Chandni Chowk shopping street.",
    "Old Delhi Butter Chicken":
        "The definition of a people pleaser! Tandoor-smoked chicken tikka simmered in a rich, buttery tomato & fenugreek gravy.",
    "Kashmiri Roganjosh":
        "A classic from Kashmir. Boneless lamb marinated for over 6 hours in our secret 21-spice blend and slow-cooked, punctuated by a nutty rogan flavour.",
    "Konkani Coastal Curry":
        "Seasonal fish and prawns in the style of the Konkani coastal communities, poached with chef’s special hand-ground whole spices and flavoured with rich coconut milk.",
    "Chicken Malabar":
        "Cubes of chicken breast bathed in an authentic Malabari sauce made with a myriad of fragrant whole crushed spices and curry leaves.",
    "Chef Shiv’s “Ba-Style” Chicken Silbatta":
        "Chicken breast in a blend of fresh green vegetables, stone-ground spices & herbs, finished with coconut milk. Named after the Silbatta — the traditional stone Chef Shiv uses to grind the spices by hand, just as his grandma (“Ba”) taught him.",
    "Nilgiri Lamb":
        "A traditional North Indian hill station lamb curry, packed with the flavours of fresh green herbs.",
    "Matar Paneer":
        "An enduringly popular North Indian paneer curry with fresh green peas and our unique hand-ground spice blend.",
    "Veg Kadai":
        "A North Indian staple reimagined — seasonal vegetables and house-roasted spices, wok-tossed in a fragrant masala.",
    "Chana Masala":
        "Whole chickpeas cooked in a traditional spicy Punjabi masala.",
};

const d = (name: string): DishWithDescription => ({
    name,
    description: COMMON_DESCRIPTIONS[name] ?? "",
});

export const setMenus: SetMenu[] = [
    {
        id: "non-veg-1",
        number: "I",
        category: "Non-Vegetarian",
        price: "54",
        smallPlates: [
            d("The Delhi Street Kebab"),
            d("Ajwain Chicken Tikka"),
            d("Fish Amritsari"),
        ],
        mains: [
            d("Old Delhi Butter Chicken"),
            d("Kashmiri Roganjosh"),
            d("Konkani Coastal Curry"),
            d("Chicken Malabar"),
        ],
        sides: ["Dal Tadka", "Jeera Aloo", "Chana Masala"],
        riceAndBread: ["Butter Naan", "Lachedar Paratha", "Steamed Rice", "Dum Jeera Pulao"],
        desserts: ["Kulfi Pista", "Zesty Mango Sorbet"],
    },
    {
        id: "non-veg-2",
        number: "II",
        category: "Non-Vegetarian",
        price: "50",
        smallPlates: [d("The Delhi Street Kebab"), d("Ajwain Chicken Tikka")],
        mains: [
            d("Chef Shiv’s “Ba-Style” Chicken Silbatta"),
            d("Kashmiri Roganjosh"),
            d("Konkani Coastal Curry"),
        ],
        sides: ["Dal Tadka", "Jeera Aloo", "Chana Masala"],
        riceAndBread: ["Butter Naan", "Lachedar Paratha", "Steamed Rice", "Dum Jeera Pulao"],
        desserts: ["Kulfi Pista", "Zesty Mango Sorbet"],
    },
    {
        id: "non-veg-3",
        number: "III",
        category: "Non-Vegetarian",
        price: "46",
        smallPlates: [d("Mango Malai Tikka"), d("Punjabi Samosa Chaat")],
        mains: [d("Old Delhi Butter Chicken"), d("Nilgiri Lamb")],
        sides: ["Dal Tadka", "Jeera Aloo", "Chana Masala"],
        riceAndBread: ["Butter Naan", "Lachedar Paratha", "Steamed Rice", "Dum Jeera Pulao"],
        desserts: ["Kulfi Pista", "Zesty Mango Sorbet"],
    },
    {
        id: "non-veg-4",
        number: "IV",
        category: "Non-Vegetarian",
        price: "42",
        smallPlates: [d("Ajwain Chicken Tikka"), d("Bhaji Panorama")],
        mains: [d("Kashmiri Roganjosh"), d("Old Delhi Butter Chicken")],
        sides: ["Dal Tadka", "Gobi Matar"],
        riceAndBread: ["Butter Naan", "Lachedar Paratha", "Steamed Rice", "Dum Jeera Pulao"],
        desserts: ["Strawberry Ice Cream", "Vanilla Ice Cream"],
    },
    {
        id: "veg-1",
        number: "I",
        category: "Vegetarian",
        price: "46",
        smallPlates: [
            d("Punjabi Samosa Chaat"),
            d("Chandni Chowk Aloo Tikki"),
            d("Bhaji Panorama"),
        ],
        mains: [d("Matar Paneer"), d("Veg Kadai")],
        sides: ["Dal Tadka", "Gobi Matar", "Chana Masala"],
        riceAndBread: ["Butter Naan", "Lachedar Paratha", "Steamed Rice", "Dum Jeera Pulao"],
        desserts: ["Mango Kulfi", "Vanilla Ice Cream"],
    },
    {
        id: "veg-2",
        number: "II",
        category: "Vegetarian",
        price: "42",
        smallPlates: [d("Chandni Chowk Aloo Tikki"), d("Bhaji Panorama")],
        mains: [d("Matar Paneer"), d("Chana Masala")],
        sides: ["Dal Tadka", "Gobi Matar"],
        riceAndBread: ["Butter Naan", "Lachedar Paratha", "Steamed Rice", "Dum Jeera Pulao"],
        desserts: ["Kulfi Pista", "Vanilla Ice Cream"],
    },
];

export const privateDiningServiceNote =
    "Small plates and desserts are individually plated. Mains are served in traditional copper pots — echoing the Indian custom of sharing a meal together at the table.";

export const privateDiningIntro =
    "Whether you’re marking a milestone, hosting a corporate dinner or gathering close friends, our private dining set menus bring the regions of India to your table. Pre-selected and beautifully balanced — designed to flow as one shared evening.";
