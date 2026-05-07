import type { MenuItem } from "./menuData";

export type LunchItem = MenuItem & { vegetarian?: boolean };

export const lunchPricing = {
    twoCourse: "22.75",
    threeCourse: "27.75",
    dessertSupplement: "5.00",
};

export const lunchStarters: LunchItem[] = [
    {
        name: "Punjabi Samosa Chaat",
        price: "",
        vegetarian: true,
        description:
            "Samosa with peas and crunchy potatoes, drizzled with chickpea curry and adorned with jewel-like pomegranates.",
    },
    {
        name: "Chandni Chowk ki Aloo Tikki",
        price: "",
        vegetarian: true,
        description:
            "Spiced potato patties with fresh yoghurt, layered with a Chandni Chowk-inspired tamarind chutney & sprouted beans.",
    },
    {
        name: "Onion Bhaji",
        price: "",
        vegetarian: true,
        description: "Our version of the ubiquitous onion bhaji.",
    },
    {
        name: "Ajwain Chicken Tikka",
        price: "",
        description:
            "Chicken breast with the prominent flavour of carom seeds & pickling spices.",
    },
    {
        name: "Mango Malai Tikka",
        price: "",
        description:
            "Mouth-melting morsels of chicken breast & gently squeezed ripe mango, grilled over the tandoor flame.",
    },
    {
        name: "Tawa Sheekh Kebab",
        price: "",
        description:
            "Skewered minced lamb spiked with delicate herbs & spices, then gently griddled on an iron pan.",
    },
];

export const lunchMains: LunchItem[] = [
    {
        name: "Matar Paneer",
        price: "",
        vegetarian: true,
        description:
            "An enduringly popular North Indian-style paneer recipe laced with spices & fresh green peas.",
    },
    {
        name: "Chana Masala",
        price: "",
        vegetarian: true,
        description:
            "Whole chickpeas cooked in a traditional spicy Punjabi masala.",
    },
    {
        name: "Old Delhi Butter Chicken",
        price: "",
        description:
            "Tandoor-smoked chicken tikka simmered in a buttery tomato & fenugreek gravy.",
    },
    {
        name: "Mughlai Kesar Murg",
        price: "",
        description:
            "Chicken curry enriched with cashew nut paste and delicately flavoured with green cardamom, fennel seeds and saffron.",
    },
    {
        name: "Lamb Dhansak",
        price: "",
        description:
            "Lamb cooked with lentils, aubergine and suffused with vegetables.",
    },
    {
        name: "Nilgiri Lamb",
        price: "",
        description:
            "A hill-station lamb curry with fresh green herbs.",
    },
];

export const lunchDessert = {
    name: "Gulab Jamun with Vanilla Ice Cream",
    description:
        "Warm rose-syrup dumplings paired with cold vanilla ice cream — a timeless Indian classic.",
    supplement: "5.00",
};

export const lunchDrinks = [
    { name: "Any Cocktail", price: "8.75" },
    { name: "Any Mocktail", price: "5.75" },
];

export const lunchInclusions =
    "Butter naan bread and dum jeera pulao are served alongside your main course.";

export const lunchNotes = [
    "All prices are inclusive of VAT in Pound Sterling.",
    "A discretionary service charge of 12.5% will be added to your bill.",
    "Single live car parking available after 6:30 pm.",
];

export const lunchAllergen =
    "Allergies: we cannot guarantee that any of our foods are free from nuts, nut derivatives or dairy products as we work in surroundings of these ingredients.";
