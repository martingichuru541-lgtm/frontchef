export interface CountryDiasporaGuide {
  countryCode: string;
  countryName: string;
  flag: string;
  majorHubs: string[];
  substitutions: {
    kenyanIngredient: string;
    localAlternative: string;
    whereToBuy: string;
    culinaryAdjustmentTip: string;
  }[];
  featuredDiasporaRestaurants: {
    name: string;
    city: string;
    specialty: string;
  }[];
}

export const DIASPORA_GUIDES: CountryDiasporaGuide[] = [
  {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    majorHubs: ['London', 'Reading', 'Birmingham', 'Manchester', 'Milton Keynes'],
    substitutions: [
      {
        kenyanIngredient: 'Sukuma Wiki (Collard Greens)',
        localAlternative: 'Cavolo Nero (Black Tuscan Cabbage) or Spring Greens',
        whereToBuy: 'Sainsbury’s, Tesco, Waitrose, or Brixton / Peckham Afro-Caribbean markets',
        culinaryAdjustmentTip: 'Cavolo Nero has thicker stems; strip the leaves and slice finely. Flash-fry for 4 minutes to preserve crunchy bite.',
      },
      {
        kenyanIngredient: 'Unga wa Ugali (Grade 1 White Maize Meal)',
        localAlternative: 'Iwisa No. 1 Super Maize Meal or P.A.N. Precooked White Cornmeal',
        whereToBuy: 'Asda World Food aisle, local Afro-Caribbean grocers, or online via Oja / Tropical Sun',
        culinaryAdjustmentTip: 'Iwisa maize meal cooks identically to Jogoo or Hostess; use a 1:2.2 flour-to-boiling water ratio.',
      },
      {
        kenyanIngredient: 'Royco Mchuzi Mix',
        localAlternative: 'Knorr Beef Bouillon mixed with 1/2 tsp ground cumin, 1/2 tsp coriander & pinch of turmeric',
        whereToBuy: 'Specialty African stores in Brixton, Dalston, or online',
        culinaryAdjustmentTip: 'Dissolve in warm water before adding to boiling gravy to prevent clumps.',
      },
      {
        kenyanIngredient: 'Fresh Dhania (Coriander)',
        localAlternative: 'Fresh Coriander bunches (Cilantro)',
        whereToBuy: 'Any UK supermarket produce aisle or Asian grocers',
        culinaryAdjustmentTip: 'Use stems finely minced in the onion sauté for deeper aroma; leave leaves for garnish.',
      },
      {
        kenyanIngredient: 'Maziwa Lala (Fermented Fresh Milk)',
        localAlternative: 'Full-fat Cultured Buttermilk or Plain Kefir Drink',
        whereToBuy: 'Waitrose, Polish Delis (Mleko Zsiadłe), or M&S',
        culinaryAdjustmentTip: 'Polish Mleko Zsiadłe is nearly indistinguishable in tang and thickness from Kenyan Maziwa Lala.',
      },
    ],
    featuredDiasporaRestaurants: [
      { name: 'Kite Runner / Enish Kenyan Lounge', city: 'London (Lewisham)', specialty: 'Nyama Choma, Sukuma & Sizzling Wet Fry' },
      { name: 'Utamu African Gastropub', city: 'Reading', specialty: 'Swahili Pilau with Kachumbari' },
    ],
  },
  {
    countryCode: 'US',
    countryName: 'United States',
    flag: '🇺🇸',
    majorHubs: ['Dallas', 'Atlanta', 'Seattle', 'Boston', 'Houston', 'Minneapolis'],
    substitutions: [
      {
        kenyanIngredient: 'Sukuma Wiki',
        localAlternative: 'Fresh Collard Greens (Southern Style) or Lacinato Dinosaur Kale',
        whereToBuy: 'Kroger, H-E-B, Whole Foods, Trader Joe\'s, Walmart',
        culinaryAdjustmentTip: 'American collards are very close botanically. Remove the tough center ribs and slice leaves very thinly.',
      },
      {
        kenyanIngredient: 'Unga wa Ugali',
        localAlternative: 'Goya White Corn Meal or P.A.N. Harina Blanca or White Grits (fine grind)',
        whereToBuy: 'Hispanic food aisles, Goya distributors, or African food stores',
        culinaryAdjustmentTip: 'P.A.N. is precooked, so it thickens in 3-4 minutes compared to 8-10 minutes for traditional raw maize meal.',
      },
      {
        kenyanIngredient: 'Goat Meat for Nyama Choma',
        localAlternative: 'Fresh Halal Goat Ribs & Shoulder (Cabrito / Chevron)',
        whereToBuy: 'Halal butcher shops, Mexican Carnicerias, or Restaurant Depot',
        culinaryAdjustmentTip: 'Ask the butcher to cut bone-in into 2-inch chunks across the bone for authentic wet fry.',
      },
      {
        kenyanIngredient: 'Green Grams (Dengu)',
        localAlternative: 'Whole Green Mung Beans',
        whereToBuy: 'Indian grocers (Patel Brothers), Asian markets, or Sprouts bulk bins',
        culinaryAdjustmentTip: 'Pre-soak for 3 hours to reduce cooking time to 20 minutes without a pressure cooker.',
      },
    ],
    featuredDiasporaRestaurants: [
      { name: 'Swahili Village', city: 'Washington D.C. & Newark', specialty: 'Fine dining Pilau, Tilapia & Choma' },
      { name: 'Safari Restaurant', city: 'Minneapolis', specialty: 'Somali-Kenyan Camel Stew & Chapati' },
    ],
  },
  {
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    flag: '🇦🇪',
    majorHubs: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'],
    substitutions: [
      {
        kenyanIngredient: 'Sukuma Wiki',
        localAlternative: 'Fresh Kale or Egyptian Molokhia leaves or Chinese Kai-lan',
        whereToBuy: 'Carrefour UAE, Lulu Hypermarket, Union Coop',
        culinaryAdjustmentTip: 'Lulu Hypermarket regularly imports fresh Kenyan sukuma wiki and unga flown directly from Nairobi.',
      },
      {
        kenyanIngredient: 'Whole Pilau Spices',
        localAlternative: 'Emirati / Gulf Machboos spices or Indian Garam Masala Khada',
        whereToBuy: 'Dubai Spice Souk, Lulu Hypermarket, Choithrams',
        culinaryAdjustmentTip: 'Use whole green cardamom, Zanzibar cloves, and cinnamon sticks directly from Dubai spice merchants.',
      },
      {
        kenyanIngredient: 'Coconut Milk (Tui la Nazi)',
        localAlternative: 'Fresh grated coconut or Aroy-D / Koka coconut cream',
        whereToBuy: 'Lulu Hypermarket fresh coconut counter (grated on demand)',
        culinaryAdjustmentTip: 'Ask the counter clerk to press fresh coconut milk for pure Swahili coastal perfection.',
      },
    ],
    featuredDiasporaRestaurants: [
      { name: 'Nairobi Corner Restaurant', city: 'Dubai (Deira)', specialty: 'Fresh Tilapia Wet Fry & Brown Ugali' },
      { name: 'Swahili Kitchen DXB', city: 'Dubai (Al Barsha)', specialty: 'Lamu Halwa & Coconut Mahamri' },
    ],
  },
  {
    countryCode: 'QA',
    countryName: 'Qatar',
    flag: '🇶🇦',
    majorHubs: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Lusail'],
    substitutions: [
      {
        kenyanIngredient: 'Sukuma Wiki & Unga wa Ugali',
        localAlternative: 'Direct Air-Freighted Kenyan Produce & Flours',
        whereToBuy: 'Family Food Centre (Al Nasr / Airport Road), Lulu Hypermarket D-Ring, Safari Mall',
        culinaryAdjustmentTip: 'Qatar receives weekly fresh flights from Jomo Kenyatta International Airport (JKIA); check fresh arrivals on Thursday evenings.',
      },
      {
        kenyanIngredient: 'Fresh Tilapia Fish',
        localAlternative: 'Fresh Red Tilapia (Bolti) or Local Hamour',
        whereToBuy: 'Al Wakrah Fish Market or Central Fish Market Um Salal',
        culinaryAdjustmentTip: 'Fresh Egyptian Bolti is the identical freshwater tilapia species (Oreochromis niloticus); deep-fry whole.',
      },
    ],
    featuredDiasporaRestaurants: [
      { name: 'Safari African Bites', city: 'Doha (Najma)', specialty: 'Beef Wet Fry, Chapati & Kachumbari' },
    ],
  },
  {
    countryCode: 'CA',
    countryName: 'Canada',
    flag: '🇨🇦',
    majorHubs: ['Toronto', 'Calgary', 'Vancouver', 'Edmonton', 'Ottawa'],
    substitutions: [
      {
        kenyanIngredient: 'Sukuma Wiki',
        localAlternative: 'Collard Greens or Organic Lacinato Kale',
        whereToBuy: 'No Frills, Loblaws, Real Canadian Superstore, T&T Supermarket',
        culinaryAdjustmentTip: 'During Canadian winter, frozen chopped collards work well when thawed and flash-sautéed with plenty of red onion.',
      },
      {
        kenyanIngredient: 'Unga wa Ugali',
        localAlternative: 'Promasa White Corn Flour or African Pride White Maize',
        whereToBuy: 'Caribbean Corner (Kensington Market Toronto), African Market Calgary',
        culinaryAdjustmentTip: 'Mix 80% white cornmeal with 20% fine semolina for extra structure and buttery mouthfeel.',
      },
    ],
    featuredDiasporaRestaurants: [
      { name: 'Simba Grill', city: 'Vancouver', specialty: 'Kenyan Swahili Curries & Choma' },
      { name: 'Nairobi Express', city: 'Toronto (Scarborough)', specialty: 'Authentic Soft Chapatis & Sautéed Dengu' },
    ],
  },
];
