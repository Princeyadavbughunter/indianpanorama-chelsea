export type DrinkItem = {
    name: string;
    price?: string;
    glassPrice?: string;
    glassSize?: string;
    bottlePrice?: string;
    abv?: string;
    description?: string;
    note?: string;
    region?: string;
};

export type DrinkSubSection = {
    title: string;
    items: DrinkItem[];
};

/* ============ SIGNATURE COCKTAILS ============ */
export const signatureCocktails: DrinkItem[] = [
    {
        name: "Panorama Fashion",
        price: "10.00",
        description:
            "5-spice rum, angostura bitters, sweet vermouth — a bold spiced twist on the classic Old Fashioned.",
    },
    {
        name: "Draycott Seven Star",
        price: "10.00",
        description:
            "Whisky, blackberries, lemon liqueur, rose liqueur, melati, passion liqueur, raspberry liqueur, candy floss, orange & ginger juice — a boldly mosaic finish complemented by fluffy candy floss.",
    },
    {
        name: "Botanic Muse",
        price: "10.00",
        description:
            "Gin, kiwi, cucumber, elderflower liqueur, apple & lime juice — botanical, herbaceous and revitalising.",
    },
    {
        name: "Crimson Mirage",
        price: "10.00",
        description:
            "Pink rooibos liqueur, rose, cranberry, raspberry purée & strawberry juice — floral, fragrant and enchanting.",
    },
    {
        name: "Delightful Passion",
        price: "10.00",
        description:
            "Coconut rum, amaru juice, passion vodka, pineapple juice and grenadine — a lush, exotic blend that feels both giddy and irresistible.",
    },
    {
        name: "A Lovely Rendezvous",
        price: "10.00",
        description:
            "Malibu rum, melon, banana liqueur, pineapple juice, lemon juice — sweet, vibrant and exhilarating.",
    },
    {
        name: "Blushing Bloom",
        price: "10.00",
        description:
            "Vodka, lychee gin, rose liqueur, kiwi liqueur, simple syrup and lemon juice — fragrant, floral and romantic.",
    },
    {
        name: "Golden Peacock",
        price: "10.00",
        description:
            "Citrus royal, kiwi, apple juice and orgeat syrup — luxurious, exotic and captivating.",
    },
    {
        name: "Dirty Kindness",
        price: "10.00",
        description:
            "Orange gin, Aperol and orange juice — bold, citrusy and energetic.",
    },
];

/* ============ CLASSIC COCKTAILS ============ */
export const classicCocktails: DrinkItem[] = [
    { name: "Amaretto Whiskey / Midori Sour", price: "16.00" },
    { name: "Pornstar Martini", price: "18.00" },
    { name: "Espresso Martini", price: "18.00" },
    { name: "Margarita", price: "16.00" },
    { name: "Mojito", price: "16.00" },
    { name: "Old Fashioned", price: "18.00" },
    { name: "Negroni", price: "16.00" },
    { name: "Aperol Spritz", price: "16.00" },
];

/* ============ MOCKTAILS ============ */
export const mocktails: DrinkItem[] = [
    {
        name: "Passion Fizz",
        price: "12.00",
        description: "Passion purée, vanilla syrup, lemon juice, lemonade — exotic, tangy and revitalising.",
    },
    {
        name: "Strawberry Lass",
        price: "12.00",
        description: "Strawberry purée, lemon juice, lychee juice — sweet, delicate and joyful.",
    },
    {
        name: "Mojito",
        price: "12.00",
        description: "Mint leaves, lemon juice, sugar syrup, soda — cool, crisp and zesty with refreshing herbal brightness.",
        note: "Choose: Passion · Strawberry · Raspberry · Mango",
    },
    {
        name: "Nimbu Pani Cooler",
        price: "12.00",
        description: "Mint, black salt, fresh lemon and soda — crisp, tangy and revitalising.",
    },
];

/* ============ WINES ============ */
export const champagneAndSparkling: DrinkItem[] = [
    {
        name: "Prosecco DOC Treviso, Ti Amo",
        region: "Italy",
        abv: "11%",
        glassSize: "175ml",
        glassPrice: "15.00",
        description: "Lively zesty citrus flavours with a delicate fruity character of lemon & golden apple.",
    },
    {
        name: "Prosecco Rosé, Botter",
        region: "Italy",
        abv: "11%",
        glassSize: "175ml",
        glassPrice: "15.00",
        description: "A fresh, vibrant acidity complemented by notes of strawberries and pink lady apples.",
    },
    {
        name: "Prosecco DOC Treviso, Botter",
        region: "Italy",
        abv: "11%",
        bottlePrice: "55.00",
        description: "A delicately fruity, aromatic prosecco with hints of flowers, honey and green apple.",
    },
    {
        name: "Crémant de Bourgogne, Brut Réserve Manogiry",
        region: "France",
        abv: "12%",
        bottlePrice: "75.00",
        description: "Pale gold with subtle pink reflexes and an elegant fizz.",
    },
    {
        name: "Moët et Chandon Brut Impérial NV",
        region: "France",
        abv: "12%",
        bottlePrice: "85.00",
        description: "Medium in weight and fruit with a fine, strong mousse.",
    },
    {
        name: "Laurent Perrier Cuvée Rosé Champagne",
        region: "France",
        abv: "12%",
        bottlePrice: "200.00",
        description: "Fragrant nose with intense fruit and a clean, fresh palette.",
    },
    {
        name: "Champagne Pol Roger",
        region: "France",
        abv: "12.5%",
        bottlePrice: "200.00",
        description: "Aromas of white flowers, green apples and a hint of minerality.",
    },
    {
        name: "Champagne Dom Pérignon",
        region: "France",
        abv: "12.5%",
        bottlePrice: "350.00",
        description: "Aromas of fresh almonds and grapefruit, with remarkable persistence and slight tones of citrus zest.",
    },
];

export const halfBottles: DrinkItem[] = [
    {
        name: "Aruano Sauvignon Blanc",
        region: "Chile",
        abv: "12.5%",
        bottlePrice: "22.75",
        description: "Elegant yellow with vibrant grenade notes — dynamic, fresh and balanced with a refreshing finish.",
    },
    {
        name: "Arcano Merlot",
        region: "Chile",
        abv: "13%",
        bottlePrice: "22.75",
        description: "Ripe blackberry and plum aromas with hints of spice and crushed black pepper.",
    },
];

export const whiteWines: DrinkItem[] = [
    {
        name: "Organic Macabeu Sonadora",
        region: "La Mancha, Spain",
        abv: "12.5%",
        glassSize: "175ml",
        glassPrice: "8.50",
        bottlePrice: "36.00",
        description: "Crisp and fresh with aromas of guava and pear and bay fruits on the palate.",
    },
    {
        name: "Sauvignon Blanc, Whale Point",
        region: "South Africa",
        abv: "12.5%",
        glassSize: "175ml",
        glassPrice: "8.00",
        bottlePrice: "32.00",
        description: "Lemon zest and herbaceous, with hints of gooseberry and capsicum.",
    },
    {
        name: "Pinot Grigio, Portovista",
        region: "Italy",
        abv: "12%",
        glassSize: "175ml",
        glassPrice: "10.50",
        bottlePrice: "40.00",
        description: "A soft, well-balanced palate of citrus, exotic fruit and apple. Elegant and dry.",
    },
    {
        name: "Picpoul de Pinet, Sel et de Sable",
        region: "France",
        abv: "12%",
        bottlePrice: "45.00",
        description: "Bright, fresh Languedoc white with fragrant aromas of white flowers, lemon, melon and a slender minerality.",
    },
    {
        name: "Sauvignon Blanc, Sula Vineyards",
        region: "India",
        abv: "12%",
        bottlePrice: "50.00",
        description: "Pear, citrus and crisp green apple lift the nose. Dry and crisp.",
    },
    {
        name: "Riesling Clare Valley",
        region: "Australia",
        abv: "11.5%",
        bottlePrice: "55.00",
        description: "Youthful, dry Riesling with intense mineral and floral aromas, tropical fruits, lime and citrus.",
    },
    {
        name: "Sauvignon Blanc, Tarning Roads",
        region: "New Zealand",
        abv: "12.5%",
        bottlePrice: "60.00",
        description: "Vibrant aroma of ripe gooseberries and herb, with tropical flavours.",
    },
    {
        name: "Gavi di Gavi La Contessa",
        region: "Italy",
        abv: "12%",
        bottlePrice: "70.00",
        description: "Fresh aromas of stone fruit and flowers, with citrus and creamy notes.",
    },
    {
        name: "Chablis, Domaine Chastaign",
        region: "France",
        abv: "12%",
        bottlePrice: "85.00",
        description: "Classic Chablis with aromas of white peach, green apples and white blossom with a distinctive flinty minerality.",
    },
];

export const roseWines: DrinkItem[] = [
    {
        name: "Pinot Grigio Blush, San Antini",
        region: "Italy",
        abv: "12%",
        glassSize: "175ml",
        glassPrice: "9.00",
        bottlePrice: "32.00",
        description: "Lovely pink barley on the palate with a burst of red berry fruit and a dry, lingering finish.",
    },
    {
        name: "Lady A, Château La Coste",
        region: "France",
        abv: "12.5%",
        bottlePrice: "60.00",
        description: "Notes of rose hips, pink grapefruit, peach and raspberry with a long, refreshing finish.",
    },
];

export const redWines: DrinkItem[] = [
    {
        name: "Montepulciano d'Abruzzo, San Antini",
        region: "Italy",
        abv: "13.5%",
        glassSize: "175ml",
        glassPrice: "9.00",
        bottlePrice: "32.00",
        description: "Soft, fruit-forward palate with rich blackcurrant and cherries.",
    },
    {
        name: "Merlot Réserva, La Vignière",
        region: "France",
        abv: "13.5%",
        glassSize: "175ml",
        glassPrice: "9.50",
        bottlePrice: "36.00",
        description: "Ripe berry fruit with hints of leather and minerals, finishing with cocoa and rich blackcurrant.",
    },
    {
        name: "Malbec Patito Alto",
        region: "Argentina",
        abv: "14%",
        glassSize: "175ml",
        glassPrice: "10.00",
        bottlePrice: "40.00",
        description: "Organically grown — dark purple with brambles and black cherries on the nose, with chocolate and a velvet texture.",
    },
    {
        name: "Shiraz, Sula Vineyards",
        region: "India",
        abv: "13%",
        bottlePrice: "60.00",
        description: "Full bodied red with forest fruits and a rich, smooth finish.",
    },
    {
        name: "Pinot Noir Imperial Roquerelfortee",
        region: "Germany",
        abv: "13%",
        bottlePrice: "65.00",
        description: "A fine example of Pinot Noir, soft and elegant with a touch of spice and excellent fruit concentration.",
    },
    {
        name: "Chianti Superiore, Santa Cristina",
        region: "Italy",
        abv: "13%",
        bottlePrice: "75.00",
        description: "Classic Chianti offering aromas of red berry fruits with vanilla and floral hints of violet.",
    },
    {
        name: "Rioja Crianza, Conde de Valdemar",
        region: "Spain",
        abv: "13.5%",
        bottlePrice: "80.00",
        description: "Aromas of ruby and red plum with smoky and oaky finish.",
    },
    {
        name: "Château Haut-Maginet, Bordeaux Rouge",
        region: "France",
        abv: "13.5%",
        bottlePrice: "85.00",
        description: "Full flavoured wine with thrilling concentrations of ripe berry fruits.",
    },
    {
        name: "Brouilly l'Enfer des Balloquets",
        region: "France",
        abv: "13%",
        bottlePrice: "95.00",
        description: "Hand-picked from the steep slopes of Burgundy. Rich red cherries on the nose, continuing on the palate with cherry, fennel and a subtle bran spice.",
    },
];

export const dessertWine: DrinkItem[] = [
    {
        name: "Château Les Mingets",
        region: "France",
        bottlePrice: "36.00",
        description: "Luscious chocolate, intense flavours of caramelised fruits, honey and almond — round, balanced and of good quality on the finish.",
    },
];

/* ============ SPIRITS ============ */
export const whisky: DrinkItem[] = [
    { name: "Jack Daniels", price: "12.00" },
    { name: "Jameson", price: "13.00" },
    { name: "Chivas Regal 12 YO", price: "14.00" },
    { name: "Glenfiddich 12 YO", price: "14.00" },
    { name: "Woodford Reserve", price: "14.00" },
    { name: "Glenmorangie 10 YO", price: "16.00" },
    { name: "Glenfiddich 15 YO", price: "18.00" },
    { name: "Lagavulin 16 YO", price: "18.00" },
    { name: "Macallan 12 YO", price: "18.00" },
    { name: "Laphroaig", price: "18.00" },
    { name: "Johnnie Walker Black Label", price: "18.00" },
    { name: "Johnnie Walker Green Label", price: "18.00" },
    { name: "Johnnie Walker Gold Label", price: "20.00" },
    { name: "Bell's", price: "20.00" },
    { name: "Rampur", price: "20.00" },
    { name: "Chivas Regal 18 YO", price: "20.00" },
    { name: "Oban 14", price: "22.00" },
    { name: "Yamazaki Distiller's Reserve", price: "28.00" },
    { name: "Johnnie Walker Blue Label", price: "40.00" },
];

export const vodka: DrinkItem[] = [
    { name: "Smirnoff", price: "12.00" },
    { name: "Grey Goose", price: "14.00" },
    { name: "Belvedere", price: "14.00" },
    { name: "Cîroc", price: "14.00" },
    { name: "U'luvka", price: "18.00" },
    { name: "Grey Flavoured", price: "15.00" },
    { name: "Cîroc Pomegranate / Apple / Red Berry / Pineapple", price: "15.00" },
    { name: "Desi Daru Mango", price: "15.00" },
];

export const gin: DrinkItem[] = [
    { name: "Malfy", price: "12.00" },
    { name: "Monaval", price: "12.00" },
    { name: "Bombay Sapphire", price: "12.00" },
    { name: "Hendrick's", price: "14.00" },
    { name: "Tanqueray", price: "15.00" },
    { name: "Monkey 47", price: "18.00" },
];

export const rum: DrinkItem[] = [
    { name: "Captain Morgan Spiced", price: "12.00" },
    { name: "Captain Morgan Dark", price: "12.00" },
    { name: "Havana Club 3 YO", price: "12.00" },
    { name: "Old Monk Dark", price: "13.00" },
    { name: "The Kraken", price: "14.00" },
    { name: "Diplomático Mantuano", price: "16.00" },
    { name: "Ron Zacapa 23", price: "18.00" },
];

export const tequila: DrinkItem[] = [
    { name: "Cazcabel Coffee", price: "12.00" },
    { name: "El Jimador Blanco", price: "12.00" },
    { name: "Patrón Silver", price: "14.00" },
    { name: "Don Julio Blanco", price: "16.00" },
    { name: "Don Julio Reposado", price: "18.00" },
    { name: "Patrón Añejo", price: "18.00" },
];

export const cognac: DrinkItem[] = [
    { name: "Courvoisier VS", price: "14.00" },
    { name: "Hennessy VS", price: "16.00" },
    { name: "Rémy Martin VSOP", price: "18.00" },
    { name: "Hennessy XO", price: "35.00" },
    { name: "Rémy Martin XO", price: "35.00" },
];

export const liqueurs: DrinkItem[] = [
    { name: "Baileys", price: "10.00" },
    { name: "Disaronno", price: "10.00" },
    { name: "Jägermeister", price: "10.00" },
    { name: "Kahlúa", price: "10.00" },
    { name: "Sambuca", price: "10.00" },
    { name: "Drambuie", price: "10.00" },
    { name: "Southern Comfort", price: "10.00" },
    { name: "Cointreau", price: "12.00" },
    { name: "Grand Marnier", price: "14.00" },
];

export const shooters: DrinkItem[] = [
    { name: "B52", price: "8.50" },
    { name: "Jägerbomb", price: "8.50" },
    { name: "Baby Guinness", price: "8.50" },
    { name: "Limoncello", price: "8.50" },
    { name: "Sourz", price: "8.50" },
    { name: "Sambuca", price: "8.50" },
];

/* ============ BEERS ============ */
export const beers: DrinkItem[] = [
    {
        name: "Kingfisher",
        abv: "4.8% · 330ml",
        price: "7.00",
        description: "India's number one premium lager with distinctive earthy, herbal notes.",
    },
    {
        name: "Tiger",
        abv: "4.5% · 330ml",
        price: "7.00",
        description: "Refreshing and full-bodied lager with a light straw colour, soft toasty aroma and a hint of tropical fruit.",
    },
    {
        name: "Asahi",
        abv: "5% · 330ml",
        price: "7.00",
        description: "World's first “Super Dry” lager, inspired by the dry taste of sake.",
    },
    {
        name: "Asahi Classic Premium Cydre",
        abv: "7.2% · 330ml",
        price: "7.00",
        description: "Sophisticated cyder with a clean apple taste and a long dry finish.",
    },
    {
        name: "Fuller's Indian Pale Ale",
        abv: "5.4% · 500ml",
        price: "10.75",
        description: "Floral and spicy notes from the hops rising through to a satisfying finish of vivid bitterness.",
    },
    {
        name: "King Cobra Premium Beer",
        abv: "5.5% · 750ml",
        price: "30.00",
        description: "World's first double-fermented Pilsner-style lager in a Champagne-style bottle.",
    },
    {
        name: "Lucky Saint",
        abv: "Low Alc IPA 0.5% · 330ml",
        price: "6.00",
        description: "Juicy and hazy with notes of tropical and stone fruit.",
    },
    {
        name: "Non-Alcoholic Beer",
        abv: "330ml",
        price: "6.00",
    },
];

/* ============ SOFT DRINKS ============ */
export const aerated: DrinkItem[] = [
    { name: "Coke", price: "3.50" },
    { name: "Coke Zero", price: "3.50" },
    { name: "Diet Coke", price: "3.50" },
    { name: "Lemonade", price: "3.50" },
    { name: "Ginger Ale", price: "3.50" },
    { name: "Tonic Water", price: "3.50" },
    { name: "Soda Water", price: "3.50" },
];

export const juicesAndLassi: DrinkItem[] = [
    { name: "Apple Juice", price: "5.50" },
    { name: "Orange Juice", price: "5.50" },
    { name: "Cranberry Juice", price: "5.50" },
    { name: "Lassi (Sweet, Salted or Mango)", price: "7.75" },
];

export const water: DrinkItem[] = [
    { name: "Still or Sparkling 330ml", price: "4.00" },
];

export const drinksAllergen =
    "Please ask our team about ingredients, allergens or dietary requirements before ordering. Our suppliers may change vintages from time to time.";
