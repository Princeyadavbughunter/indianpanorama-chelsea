export type TakeawayItem = {
    number?: string;
    name: string;
    price: string;
    description?: string;
    note?: string;
    spice?: 1 | 2 | 3;
};

/* ============ STARTERS ============ */
export const takeawayStarters: TakeawayItem[] = [
    { number: "01", name: "Pappadums", price: "1.00", description: "Thin wafer-like crisp rice pappadums." },
    { number: "02", name: "Onion Bhaji", price: "5.75", description: "Our version of the ubiquitous onion bhaji." },
    {
        number: "03",
        name: "Punjabi Samosa Chaat",
        price: "8.75",
        spice: 1,
        description:
            "Samosa with peas and crunchy potatoes, drizzled with chickpea curry, adorned with jewel-like pomegranates.",
    },
    {
        number: "04",
        name: "Chandni Chowk ki Aloo Tikki",
        price: "10.00",
        description:
            "Spiced potato patties with fresh yoghurt, layered with Chandni Chowk-inspired tamarind chutney & sprouted beans.",
    },
    {
        number: "05",
        name: "Crab Sukka",
        price: "14.00",
        description: "Soft shell crab, served with spicy tomato relish.",
    },
    {
        number: "06",
        name: "Scallops Hariyali",
        price: "14.00",
        description: "Juicy ocean scallops tossed with fresh green herbs & spices.",
    },
    {
        number: "07",
        name: "Fish Amritsari",
        price: "12.75",
        spice: 1,
        description: "Fish fillets with quintessential Indian herbs & spices — Amritsar, the city of the Golden Temple.",
    },
    {
        number: "08",
        name: "Koliwada Masala Prawn",
        price: "14.00",
        spice: 1,
        description:
            "A warm medley of king prawns cooked with Koliwada-inspired masala. The Koliwada are colonies of fishermen all over Mumbai.",
    },
    {
        number: "09",
        name: "Ajwain Chicken Tikka",
        price: "13.75",
        spice: 1,
        description: "Chicken breast with the prominent flavour of carom seeds & pickling spices.",
        note: "Main course portion also available",
    },
    {
        number: "10",
        name: "Mango Malai Tikka",
        price: "13.75",
        description:
            "Mouth-melting morsels of chicken breast & gently squeezed ripe mangoes, grilled over the tandoor flame.",
        note: "Main course portion also available",
    },
    {
        number: "11",
        name: "Tawa Sheekh Kebab",
        price: "15.00",
        spice: 1,
        description: "Skewered minced lamb spiked with delicate herbs & spices, gently griddled on an iron pan.",
    },
];

/* ============ MAINS — SEAFOOD ============ */
export const takeawaySeafood: TakeawayItem[] = [
    {
        number: "12",
        name: "Lasooni Jhinga",
        price: "22.75",
        spice: 1,
        description:
            "Chargrilled prawns rounded out with smoky garlic, served with satin-smooth spicy tomato & onion relish.",
    },
    {
        number: "13",
        name: "Chettinad Fish Curry",
        price: "22.75",
        spice: 2,
        description:
            "Fleshy tilapia fillets marinated in an exquisite Chettinad fiery masala, simmered in an exhilaratingly spicy gravy.",
    },
    {
        number: "14",
        name: "Konkan Fish Curry",
        price: "22.75",
        spice: 1,
        description:
            "Seasonal fish and prawns poached Konkani-style with chef's hand-pounded herbs, delicately flavoured with coconut milk.",
    },
    {
        number: "15",
        name: "Prawn Makhani",
        price: "24.75",
        description: "King prawn simmered in a smooth, velvety tomato sauce.",
    },
];

/* ============ MAINS — POULTRY ============ */
export const takeawayPoultry: TakeawayItem[] = [
    {
        number: "16",
        name: "Tandoori Chicken",
        price: "22.75",
        spice: 1,
        description: "Spring chicken chargrilled on red-hot wood coal, retaining the characteristic smoky aroma.",
    },
    {
        number: "17",
        name: "Old Delhi Butter Chicken",
        price: "18.75",
        spice: 1,
        description: "Tandoor-smoked chicken tikka simmered in a buttery tomato & fenugreek gravy.",
    },
    {
        number: "18",
        name: "Signature Chicken Malabar",
        price: "20.75",
        spice: 2,
        description:
            "Cubes of chicken breast bathed in an authentic Malabari sauce made with a myriad of whole crushed spices and curry leaves.",
    },
    {
        number: "19",
        name: "Mughlai Kesar Murg",
        price: "18.75",
        description:
            "Chicken curry enriched with cashew nut paste, delicately flavoured with green cardamom, fennel seeds and saffron.",
    },
    {
        number: "20",
        name: "Jalnawabi Bathak",
        price: "22.75",
        spice: 1,
        description: "Spectacular aromatic duck curry, tempered with mustard seeds.",
    },
    {
        number: "21",
        name: "Chicken Silbatta",
        price: "18.75",
        spice: 1,
        description:
            "Breast of chicken cubes in a blend of natural green stone-ground spices and herbs, finished with coconut milk. Sil = flat stone, Batta = grinding stone.",
    },
    {
        number: "22",
        name: "Chicken Jhalfarezi",
        price: "20.75",
        spice: 2,
        description: "Addictively delicious tandoori chicken tikka stir-fried in a light tomato gravy with blistered bell peppers.",
    },
];

/* ============ MAINS — LAMB ============ */
export const takeawayLamb: TakeawayItem[] = [
    {
        number: "23",
        name: "Raan-e-Panorama",
        price: "22.75",
        description:
            "A legacy preparation of braised leg of baby lamb infused with bay leaf and crackled whole spices in a rich extract of gravy.",
    },
    {
        number: "24",
        name: "Kashmiri Roganjosh",
        price: "21.75",
        description:
            "Boneless lamb marinated for over 6 hours in our secret 21-spice blend and slow-cooked, punctuated by the nutty flavour of rogan.",
    },
    {
        number: "25",
        name: "Nilgiri Lamb",
        price: "22.75",
        spice: 1,
        description: "A hill-station lamb curry with fresh green herbs.",
    },
    {
        number: "26",
        name: "Rajasthani Laal Maas",
        price: "23.75",
        spice: 3,
        description: "Lamb cooked in a variety of indigenous whole spices with a burst of red Jodhpuri chillies.",
    },
    {
        number: "27",
        name: "Lamb Dhansak",
        price: "21.75",
        description: "Lamb cooked with lentils, aubergine and suffused with vegetables.",
    },
    {
        number: "28",
        name: "Kerala Lamb Curry",
        price: "23.75",
        spice: 2,
        description: "Pot-roasted lamb with the distinctive flavour of crushed black peppercorns in a robust spicy gravy.",
    },
    {
        number: "29",
        name: "Grilled Burrah Chops",
        price: "26.75",
        description:
            "Tender lamb cutlets marinated for over 8 hours in our hand-ground spices, served with smooth spicy lamb juice.",
        note: "Three pieces",
    },
];

/* ============ MAINS — VEGETABLES ============ */
export const takeawayVegetables: TakeawayItem[] = [
    {
        number: "30",
        name: "Matar Paneer",
        price: "18.00",
        spice: 1,
        description: "An enduringly popular North Indian-style paneer recipe laced with spices & fresh green peas.",
    },
    {
        number: "31",
        name: "Roast Paneer Shashlik",
        price: "22.75",
        spice: 1,
        description:
            "Assorted whole vegetables & fresh cottage cheese, glazed golden in the tandoor and served with ginger & tomato relish.",
    },
];

/* ============ BIRYANI ============ */
export const takeawayBiryani: TakeawayItem = {
    number: "32",
    name: "Lucknowi Biryani",
    price: "22.75",
    description:
        "Aromatic, long-grain basmati rice infused with saffron & our special biryani spice blend with your choice of Chicken, Prawns, Lamb or Vegetable. Served with raita, biryani sauce & pappadum, garnished with mint leaves.",
    note: "Add £6 for Prawn Biryani · Add £3 for Lamb Biryani",
};

/* ============ SIDES ============ */
export const takeawaySides: TakeawayItem[] = [
    {
        number: "33",
        name: "Dal Bukhara",
        price: "9.75",
        spice: 1,
        description: "Whole black lentils, simmered overnight on a slow charcoal flame, finished with our hand-churned butter.",
    },
    {
        number: "34",
        name: "Dal Tadka",
        price: "8.75",
        spice: 1,
        description: "Yellow lentils tempered with cumin & red chillies.",
    },
    {
        number: "35",
        name: "Jeera Aloo",
        price: "8.75",
        spice: 1,
        description: "Superbly diced potatoes with roasted cumin, green chilli and garam masala.",
    },
    {
        number: "36",
        name: "Chana Masala",
        price: "9.75",
        spice: 1,
        description: "Whole chickpeas cooked in a traditional spicy Punjabi masala.",
    },
    {
        number: "37",
        name: "Gobi Matar",
        price: "9.75",
        description: "Scrumptious preparation of cauliflower and fresh green peas.",
    },
    {
        number: "38",
        name: "Mushroom Do Pyaza",
        price: "9.75",
        spice: 1,
        description: "Sliced exotic mushrooms with Madras shallots.",
    },
    {
        number: "39",
        name: "Saag Bhaji",
        price: "8.75",
        spice: 1,
        description: "A tantalising combination of spinach and methi leaves.",
    },
    {
        number: "40",
        name: "Bhindhi Anokhi",
        price: "10.75",
        spice: 1,
        description: "Ladies finger (okra) cooked in a blend of whole ground spices with black salt & roasted cumin.",
    },
    {
        number: "41",
        name: "Salad",
        price: "6.50",
        description: "A fragrant assortment of garden-fresh vegetables finished with lemon dressing.",
    },
    {
        number: "42",
        name: "Raita",
        price: "5.75",
        description: "Roughly chopped cucumber, carrots and onions or a combination of any.",
    },
];

export const sidesUpgradeNote = "Main-course portion also available with a supplement of £4.50";

/* ============ BREADS ============ */
export const takeawayBreads: TakeawayItem[] = [
    { name: "Butter Naan", price: "4.50", description: "Traditional refined flour bread baked in the tandoor." },
    { name: "Butter Roti", price: "4.25", description: "Tandoori whole wheat bread baked in clay oven." },
    { name: "Lachedar Paratha", price: "4.50", description: "Layered & buttered popular bread from North India — crispy and flaky." },
    { name: "Garlic Naan", price: "4.50", description: "Soft naan bread topped with chopped garlic." },
    { name: "Peshwari Naan", price: "5.50", description: "Stuffed naan with grated coconut and raisins." },
    { name: "Aloo Kulcha", price: "6.50", description: "Stuffed naan with spiced potatoes and coriander leaves." },
    { name: "Paneer Kulcha", price: "6.50", description: "Bread stuffed with cottage cheese and seasoned with spices." },
    { name: "Keema Naan", price: "7.50", description: "Naan bread stuffed with minced lamb and fresh coriander." },
];

/* ============ RICE ============ */
export const takeawayRice: TakeawayItem[] = [
    { name: "Steamed Rice", price: "5.00", description: "Perfectly cooked basmati rice." },
    { name: "Dum Jeera Pulao", price: "5.50", description: "Fluffy long-grain basmati rice flavoured with roasted cumin seeds." },
    {
        name: "Mushroom Rice",
        price: "6.50",
        spice: 1,
        description: "Rice infused with earthy mushroom flavour, tossed with caramelised mushrooms.",
    },
];

/* ============ DESSERTS ============ */
export const takeawayDesserts: TakeawayItem[] = [
    {
        name: "Gulab Jamun",
        price: "7.50",
        description:
            "Warm condensed-milk dumplings served with vanilla ice cream, garnished with grated pistachio and a dash of Kewra water.",
    },
    {
        name: "Rasmalai",
        price: "7.50",
        description:
            "Freshly flattened cottage-cheese cakes poached in sweetened creamy milk, sprinkled with pistachios and a scoop of vanilla ice cream.",
    },
];

/* ============ DRINKS ============ */
export const takeawaySoftDrinks: TakeawayItem[] = [
    { name: "Coke", price: "2.50", note: "200ml" },
    { name: "Diet Coke", price: "2.50", note: "200ml" },
    { name: "Lemonade", price: "2.50", note: "200ml" },
    { name: "Lassi (Sweet, Salted or Mango)", price: "5.50" },
];

export const takeawayBeers: TakeawayItem[] = [
    { name: "Super Dry Asahi (Alcohol Free)", price: "4.50", note: "330ml" },
    { name: "Asahi Beer", price: "6.50", note: "330ml" },
    { name: "Kingfisher Beer", price: "6.50", note: "330ml" },
    { name: "Tiger Beer", price: "6.50", note: "4.8% · 330ml" },
    { name: "Lucky Saint (Low Alcoholic)", price: "5.50" },
    { name: "Fuller's Indian Pale Ale", price: "8.75", note: "5.3% · 500ml" },
];

export const takeawayWhiteWines: TakeawayItem[] = [
    {
        name: "Organic Macabeo Sonadora",
        price: "26.00",
        note: "13%",
        description: "A crisp, fresh macabeo (the white Rioja grape) with aromas of apples and pear, with exotic fruits on the palate.",
    },
    {
        name: "Sauvignon Blanc, Whale Point",
        price: "24.00",
        note: "12.5%",
        description: "Pale lemon with a very fresh nose of gooseberry, cut grass and lemon.",
    },
    {
        name: "Pinot Grigio",
        price: "30.00",
        note: "12%",
        description: "A soft, well-balanced palate combining citrus, exotic fruit and fresh apples. Elegant and dry.",
    },
    {
        name: "Sauvignon Blanc, India",
        price: "36.00",
        note: "12%",
        description: "Fresh herbaceous aromas of cut grass, green peppers and spice prelude a dry, crisp palate.",
    },
];

export const takeawayRedWines: TakeawayItem[] = [
    {
        name: "Montepulciano d'Abruzzo",
        price: "24.00",
        note: "12.5%",
        description: "Deep purple in colour with intense aromas of blackberries and cherries, rich and robust — typical of the region.",
    },
    {
        name: "Merlot Reserve",
        price: "26.00",
        note: "13.5%",
        description: "A nose of ripe berry fruit and hints of leather and mineral; a supple palate finishing with violets and blackberry fruit.",
    },
    {
        name: "Malbec Organic",
        price: "30.00",
        note: "14%",
        description: "Dark purple with bramble fruits and black cherries on the nose, with velvety texture and chocolate on the finish.",
    },
    {
        name: "Shiraz",
        price: "36.00",
        note: "13%",
        description: "Full-bodied red fruit flavours with a rich and smooth finish.",
    },
];

/* ============ CONTACT ============ */
export const takeawayContact = {
    phone: "020 3051 4535",
    address: "149 Draycott Avenue, London, SW3 3AL",
    email: "info@indianpanoramachelsea.co.uk",
    hours: [
        { day: "Monday", time: "5:00 pm – 10:30 pm" },
        { day: "Tuesday – Sunday", time: "5:00 pm – 10:30 pm" },
    ],
    parkingNote: "Parking on single yellow line is free after 6:30 pm",
};

export const takeawayAllergen =
    "Allergies: we cannot guarantee that any of our foods are free from nuts, nut derivatives or dairy products as we work in surroundings of these ingredients.";
