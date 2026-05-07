export type MenuItem = {
    name: string;
    price: string;
    description?: string;
    note?: string;
    spicy?: boolean;
    signature?: boolean;
};

export const menuSections = {
    smallPlates: [
        {
            name: "Pappadum Basket",
            price: "5.00",
            description:
                "An assortment of plain & spicy pappadums, served with an array of chutneys.",
            note: "Add £2 for extra set of chutney",
        },
        {
            name: "Bhaji Panorama",
            price: "7.00",
            description: "Our take on the onion bhaji with a powerful kick of coriander.",
        },
        {
            name: "Punjabi Samosa Chaat",
            price: "11.75",
            description:
                "The iconic Punjabi street snack: samosa with peas & crunchy potatoes, drizzled in chickpea curry and topped with fresh pomegranate jewels.",
        },
        {
            name: "Chandni Chowk Aloo Tikki",
            price: "12.75",
            description:
                "Spiced potato patties layered with fresh yoghurt & spicy tamarind chutney, just how they do it on Delhi’s iconic Chandni Chowk shopping street.",
        },
        {
            name: "Crab Sukka",
            price: "16.75",
            description:
                "Soft shell crab, marinated in our special Indian spice blend, served with spicy tomato chutney.",
        },
        {
            name: "Scallops Hariyali",
            price: "15.00",
            description:
                "Juicy ocean scallops tossed in the freshest green herbs & spices. ‘Hariyali’ simply means verdant greenery.",
        },
        {
            name: "Fish Amritsari",
            price: "14.75",
            description:
                "A dish from Amritsar that’s become a modern classic across India. Fish fillets with a quintessential blend of Indian herbs & spices.",
        },
        {
            name: "Koliwada Masala Prawns",
            price: "15.00",
            description:
                "A medley of king prawns cooked with our unique koliwada-inspired spice blend. The Koliwada are Mumbai’s famous colonies of fishermen.",
        },
        {
            name: "Ajwain Chicken Tikka",
            price: "14.00",
            description:
                "Chicken breast cooked with fragrant hand-ground ajwain (carom seeds) and tangy pickling spices.",
            note: "Main course portion also available",
        },
        {
            name: "Mango Malai Tikka",
            price: "14.00",
            description:
                "Melt-in-the-mouth chicken breast pieces marinated in ground spices and India’s national fruit – ripe, juicy mango – then grilled over a tandoor flame.",
            note: "Main course portion also available",
        },
        {
            name: "The Delhi Street Kebab",
            price: "16.00",
            description:
                "Our take on a Delhi street food icon, the Tawa Seekh Kebab. Skewers of minced lamb steeped in delicate spices, and twice cooked for extra succulence.",
        },
        {
            name: "“Eat it Quick” Desi Calamari",
            price: "15.75",
            description:
                "Curls of squid marinated in our unique spice blend, then sautéed with crushed garlic & capsicum. Enjoy as soon as it arrives to taste its unmatched tenderness — you’ve never had calamari like this before!",
        },
        {
            name: "The Panorama Platter",
            price: "34.00",
            description:
                "Bhaji Panorama, Ajwain Chicken Tikka, Koliwada Masala Prawns, and The Delhi Street Kebab, served with a lemon wedge and relish.",
            note: "Portion for two",
            signature: true,
        },
    ] satisfies MenuItem[],

    platterNote: undefined,

    seafood: [
        {
            name: "Lasooni Jhinga",
            price: "28.75",
            description:
                "Chargrilled prawns, rounded out with a smoky flavour from bulbs of garlic, served with a satin-smooth spicy tomato & onion relish.",
        },
        {
            name: "Lobster Panchphoran",
            price: "46.50",
            description:
                "Lobster tail simmered with panchphoran, a Bengali five whole-spice blend, with a touch of sweetness from Indian jaggery.",
            signature: true,
        },
        {
            name: "Chettinad Fish Curry",
            price: "27.75",
            description:
                "Fleshy tilapia fillets marinated in a fiery South Indian Chettinad-style masala, and simmered in an exhilaratingly spicy gravy.",
            spicy: true,
        },
        {
            name: "Konkani Coastal Curry",
            price: "27.75",
            description:
                "Seasonal fish and prawns in the style of the Konkani coastal communities, poached with chef’s special hand-ground whole spices and flavoured with rich coconut milk.",
        },
        {
            name: "Prawn Makhani",
            price: "26.75",
            description:
                "King prawn cooked in the tandoor and marinated in a smooth velvety tomato sauce, seasoned with cumin and coriander.",
        },
    ] satisfies MenuItem[],

    poultry: [
        {
            name: "Chefs’ Tandoori Chicken",
            price: "27.75",
            description:
                "Spring chicken chargrilled on red hot wood coal for a characteristic smoky flavour — the dish that made Chef Manj fall in love with cooking.",
            signature: true,
        },
        {
            name: "Old Delhi Butter Chicken",
            price: "22.75",
            description:
                "The definition of a people pleaser! Tandoor-smoked chicken tikka simmered in a rich, buttery tomato & fenugreek gravy.",
        },
        {
            name: "Chicken Malabar",
            price: "23.75",
            description:
                "Cubes of chicken breast bathed in an authentic Malabari sauce made with a myriad of fragrant whole crushed spices and curry leaves.",
        },
        {
            name: "Mughlai Kesar Murg",
            price: "22.75",
            description:
                "Chicken curry enriched with cashew nut paste and delicately flavoured with green cardamom, fennel seeds and saffron (kesar).",
        },
        {
            name: "Jalnawabi Duck",
            price: "27.75",
            description:
                "A spectacularly aromatic duck curry, tempered with hand-crushed mustard seeds.",
        },
        {
            name: "Chef Shiv’s “Ba-Style” Chicken Silbatta",
            price: "23.75",
            description:
                "Chicken breast in a blend of fresh green vegetables, stone-ground spices & herbs, finished with coconut milk. Named after the Silbatta — the traditional stone Chef Shiv uses to grind the spices by hand, just as his grandma (“Ba”) taught him.",
            signature: true,
        },
    ] satisfies MenuItem[],

    lamb: [
        {
            name: "Chicken Jhalfarezi",
            price: "23.75",
            description:
                "Addictively delicious tandoori chicken tikka, stir fried in a light tomato gravy with blistered bell peppers.",
        },
        {
            name: "Raan-e-Panorama",
            price: "32.75",
            description:
                "A Chef Shiv signature. Braised leg of baby lamb infused with bay leaf and crackled whole spices in a rich extract of gravy.",
            signature: true,
        },
        {
            name: "Kashmiri Roganjosh",
            price: "24.75",
            description:
                "A classic from Kashmir. Boneless lamb marinated for over 6 hours in our secret 21-spice blend and slow-cooked, punctuated by a nutty rogan flavour.",
        },
        {
            name: "Nilgiri Lamb",
            price: "26.75",
            description:
                "A traditional North Indian hill station lamb curry, packed with the flavours of fresh green herbs.",
        },
        {
            name: "Royal Rajasthani Laal Maas",
            price: "28.75",
            description:
                "A favourite of the Rajput Royals. Lamb cooked in a variety of indigenous whole spices with a burst of red Jodhpuri chillies — the hottest dish on the menu, tantalisingly moreish.",
            spicy: true,
        },
        {
            name: "Lamb Dhansak",
            price: "24.75",
            description:
                "Succulent lamb cooked with lentils, aubergine, ginger root, sweet honey, garlic and cumin.",
        },
        {
            name: "Chefs’ Secret Kerala Lamb Curry",
            price: "28.75",
            description:
                "Pot-roasted lamb cooked in the tradition of Kerala, the land of spices. Black peppercorn, cinnamon, ginger and more give this robust gravy a spicy punch — but the full recipe is our chefs’ secret.",
        },
        {
            name: "Grilled Burrah Chops",
            price: "36.75",
            description:
                "An Indian classic, elevated Panorama-style. Tender lamb cutlets marinated for over 8 hours in our hand-crushed spice blend, served with a smooth spicy lamb jus.",
        },
    ] satisfies MenuItem[],

    vegetarian: [
        {
            name: "Matar Paneer",
            price: "22.75",
            description:
                "An enduringly popular North Indian paneer curry, with fresh green peas and our unique hand-ground spice blend.",
        },
        {
            name: "Roast Paneer Shashlik",
            price: "28.75",
            description:
                "Assorted whole vegetables and fresh paneer, glazed golden in the tandoor and served with a ginger & tomato relish.",
        },
    ] satisfies MenuItem[],

    sides: [
        {
            name: "“48-Hour” Dal Panorama",
            price: "9.75",
            description:
                "A Dal Bukhara like no other, simmered over charcoal for 48 hours for a truly unmatched flavour.",
            signature: true,
        },
        { name: "Dal Tadka", price: "8.75" },
        { name: "Jeera Aloo", price: "8.75" },
        { name: "Chana Masala", price: "9.75" },
        { name: "Gobi Matar", price: "9.75" },
        { name: "Mushroom Do Pyaza", price: "9.75" },
        { name: "Saag Bhaji", price: "8.75" },
        { name: "Bhindhi Anokhi", price: "10.75" },
        { name: "Salad", price: "8.50" },
        { name: "Raita", price: "5.75" },
    ] satisfies MenuItem[],

    riceAndBread: [
        { name: "Butter Naan", price: "5.75" },
        { name: "Butter Roti", price: "4.75" },
        { name: "Lachedar Paratha", price: "5.75" },
        { name: "Garlic Naan", price: "5.75" },
        { name: "Peshwari Naan", price: "6.75" },
        { name: "Aloo Kulcha", price: "7.75" },
        { name: "Paneer Kulcha", price: "7.75" },
        { name: "Keema Naan", price: "8.75" },
        { name: "Steamed Rice", price: "6.50" },
        { name: "Dum Jeera Pulao", price: "7.50" },
        { name: "Mushroom Rice", price: "8.50" },
    ] satisfies MenuItem[],
};

export const biryani: MenuItem = {
    name: "Lucknowi Biryani",
    price: "28.75",
    description:
        "Aromatic, long-grain basmati rice infused with saffron & our special biryani spice blend with your choice of Chicken, Prawns, Lamb or Vegetables, served with raita, biryani sauce & pappadum, garnished with mint leaves.",
    note: "Add £9 for Prawn Biryani · Add £6 for Lamb Biryani",
    signature: true,
};

export const thalis = [
    {
        name: "Veg Thali",
        price: "38.75",
        description:
            "Mushroom Do Pyaza, Dal Tadka (yellow lentils), Saag Bhaji (spinach), Jeera Aloo (potatoes with cumin), Chana Masala (chickpeas), Gobi Matar (cauliflower & green peas), Pulao Rice, Raita, Butter Naan and Pappadum.",
    },
    {
        name: "Non-Veg Thali",
        price: "48.75",
        description:
            "Your choice of chicken, lamb, fish or prawn curry with Dal Tadka (yellow lentils), Saag Bhaji (spinach), Jeera Aloo (potatoes with cumin), Chana Masala (chickpeas), Gobi Matar (cauliflower & green peas), Pulao Rice, Raita, Butter Naan and Pappadum.",
        upgrade: "Add £6 for Prawn Thali",
    },
];

export const allergenNotice =
    "Food allergies and intolerances: whilst we have strict controls in place to reduce risk of contamination, it is not possible for us to guarantee that our dishes will be 100% allergen or contamination free. Before ordering, please speak to our staff about your requirements.";
