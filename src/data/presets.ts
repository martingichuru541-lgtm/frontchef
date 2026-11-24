import { Recipe, IngredientItem } from '../types.ts';

export interface FridgePreset {
  id: string;
  name: string;
  subtitle: string;
  thumbnail: string;
  photoUrl: string;
  badge?: string;
  ingredients: IngredientItem[];
  defaultRecipes: Recipe[];
}

export const FRIDGE_PRESETS: FridgePreset[] = [
  {
    id: 'kenyan-staples',
    name: 'Nairobi Kitchen Staples (Mama Mboga Fresh)',
    subtitle: 'Sukuma Wiki, Nyama (Beef), Unga wa Ugali, Nyanya, Kitunguu, Dhania, Royco, Eggs',
    thumbnail: '🇰🇪',
    badge: 'Kenyan Favorite',
    photoUrl: '/assets/aistudio/image_b5b397ab.png',
    ingredients: [
      { id: 'ing_k1', name: 'Sukuma Wiki (Fresh Collard Greens)', category: 'Produce', confidence: 0.99, quantity: '2 big bunches' },
      { id: 'ing_k2', name: 'Fresh Beef (Nyama ya Ng\'ombe)', category: 'Meat & Seafood', confidence: 0.97, quantity: '500g cubed' },
      { id: 'ing_k3', name: 'Unga wa Ugali (Grade 1 Maize Meal)', category: 'Pantry & Grains', confidence: 0.98, quantity: '1 packet (1kg)' },
      { id: 'ing_k4', name: 'Ripe Red Tomatoes (Nyanya)', category: 'Produce', confidence: 0.96, quantity: '4 large' },
      { id: 'ing_k5', name: 'Red Onions (Kitunguu Maji)', category: 'Produce', confidence: 0.95, quantity: '3 medium' },
      { id: 'ing_k6', name: 'Fresh Dhania (Coriander / Cilantro)', category: 'Produce', confidence: 0.94, quantity: '1 fresh bunch' },
      { id: 'ing_k7', name: 'Royco Mchuzi Mix & Garlic Paste', category: 'Condiments & Sauces', confidence: 0.92, quantity: '1 tub / sachets' },
      { id: 'ing_k8', name: 'Pure Vegetable Cooking Oil (Mafuta)', category: 'Condiments & Sauces', confidence: 0.96, quantity: '1/2 bottle' },
      { id: 'ing_k9', name: 'Farm Eggs (Mayai)', category: 'Dairy & Eggs', confidence: 0.98, quantity: '6 eggs' },
      { id: 'ing_k10', name: 'Maziwa Lala (Fermented Fresh Milk)', category: 'Dairy & Eggs', confidence: 0.91, quantity: '500ml pouch' },
    ],
    defaultRecipes: [
      {
        id: 'rec_ke_1',
        title: 'Sukuma Wiki & Beef Nyama Fry with Hot Ugali',
        description: 'The heartbeat of Kenyan home cooking: sizzling caramelized beef cubes with sweet onions, finely chiffonaded sukuma wiki sautéed with tomatoes, and firm, steaming hot white ugali.',
        cuisine: 'Kenyan National Classic',
        imageUrl: '/assets/aistudio/image_b5b397ab.png',
        difficulty: 'Easy',
        isKenyanDish: true,
        estimatedCostKSh: 380,
        costPerServingKSh: 95,
        budgetTier: 'Budget',
        prepTimeMinutes: 12,
        cookTimeMinutes: 20,
        totalTimeMinutes: 32,
        calories: 520,
        servings: 4,
        proteinGrams: 38,
        carbsGrams: 64,
        fatGrams: 16,
        dietaryTags: ['High-Protein', 'Gluten-Free', 'Traditional'],
        chefNote: 'Never boil sukuma wiki! Flash-sauté in hot oil with onions and tomatoes for only 3-4 minutes to preserve vibrant emerald green color and crisp texture.',
        ingredients: [
          { name: 'Fresh Beef (Nyama ya Ng\'ombe)', amount: '500g cubed', estimatedPriceKSh: 320 },
          { name: 'Sukuma Wiki (Collard Greens)', amount: '2 bunches, finely shredded', estimatedPriceKSh: 30 },
          { name: 'Unga wa Ugali', amount: '2 cups (approx 350g)', estimatedPriceKSh: 35 },
          { name: 'Red Onions (Kitunguu)', amount: '2 medium, chopped', estimatedPriceKSh: 25 },
          { name: 'Ripe Tomatoes (Nyanya)', amount: '3, finely diced', estimatedPriceKSh: 30 },
          { name: 'Fresh Dhania (Coriander)', amount: '1/2 bunch, chopped', estimatedPriceKSh: 10 },
          { name: 'Royco Mchuzi Mix', amount: '1 tbsp dissolved in 3 tbsp warm water', estimatedPriceKSh: 15 },
          { name: 'Cooking Oil', amount: '2 tbsp', estimatedPriceKSh: 20 },
          { name: 'Salt', amount: '1 tsp to taste', isOptional: true, estimatedPriceKSh: 5 }
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: 'In a heavy-bottomed sufuria, add beef cubes with 1/4 cup water, a pinch of salt, and half the minced garlic. Cover and simmer over medium heat until tender and water evaporates (about 10 minutes).',
            tip: 'Let the meat brown lightly in its own rendered fat before adding oil for rich savory crust.',
            timerMinutes: 10
          },
          {
            stepNumber: 2,
            instruction: 'Add 1 tablespoon of cooking oil and half the chopped red onions to the beef. Sauté until onions soften, then stir in 2 diced tomatoes and the dissolved Royco Mchuzi mix. Simmer 4 minutes until thick gravy forms. Stir in fresh dhania and turn off heat.',
            tip: 'The aroma of Royco and sizzling onions is signature Kenyan wet fry perfection.',
            timerMinutes: 4
          },
          {
            stepNumber: 3,
            instruction: 'To make Ugali: Bring 3 cups of water to a rolling boil in a clean sufuria. Slowly shake in 1 cup of unga wa ugali while paddling briskly with a wooden mwiko to prevent lumps.',
            tip: 'Always keep boiling water rolling before the first handful of unga hits.',
            timerMinutes: 3
          },
          {
            stepNumber: 4,
            instruction: 'Gradually add remaining unga, pressing against the sides of the sufuria with the mwiko until the ugali firms into a smooth mound. Cover on low heat for 4 minutes to bake thoroughly, then flip onto a serving plate.',
            tip: 'When the aroma of toasted roasted corn wafts up, your ugali is cooked.',
            timerMinutes: 4
          },
          {
            stepNumber: 5,
            instruction: 'In a wide skillet, heat 1 tablespoon oil. Sauté remaining chopped onion for 1 minute. Add shredded sukuma wiki and diced tomato. Toss continuously on high heat for 3 minutes until wilted yet crunchy.',
            tip: 'Do not add water to the sukuma. Natural moisture will steam it tender-crisp.',
            timerMinutes: 3
          },
          {
            stepNumber: 6,
            instruction: 'Serve hot ugali wedge on a plate alongside sizzling beef fry and steaming sukuma wiki. Enjoy by hand the traditional Kenyan way!',
            tip: 'Pair with chilled maziwa lala if desired.'
          }
        ]
      },
      {
        id: 'rec_ke_2',
        title: 'Fragrant Swahili Beef Pilau with Fresh Kachumbari',
        description: 'Authentic coastal Kenyan celebratory spiced rice cooked in rich beef stock with toasted cumin, cardamom, cloves, cinnamon, and caramelised onions, topped with crisp tomato-chili kachumbari.',
        cuisine: 'Swahili Coast',
        difficulty: 'Medium',
        isKenyanDish: true,
        estimatedCostKSh: 480,
        costPerServingKSh: 120,
        budgetTier: 'Moderate',
        prepTimeMinutes: 15,
        cookTimeMinutes: 30,
        totalTimeMinutes: 45,
        calories: 580,
        servings: 4,
        proteinGrams: 32,
        carbsGrams: 78,
        fatGrams: 18,
        dietaryTags: ['Traditional', 'Festive', 'Gluten-Free'],
        chefNote: 'The signature dark golden brown color of true Swahili pilau comes solely from thoroughly caramelizing the red onions, not artificial browning.',
        ingredients: [
          { name: 'Basmati Rice (Mchele)', amount: '2 cups, rinsed & soaked', estimatedPriceKSh: 90 },
          { name: 'Fresh Beef (Nyama ya Ng\'ombe)', amount: '400g, boiled & broth reserved', estimatedPriceKSh: 260 },
          { name: 'Red Onions (Kitunguu)', amount: '3 large, finely sliced', estimatedPriceKSh: 35 },
          { name: 'Whole Pilau Masala', amount: '1.5 tbsp (cumin, cardamom, cloves, cinnamon, black pepper)', estimatedPriceKSh: 30 },
          { name: 'Garlic & Ginger Paste', amount: '2 tbsp', estimatedPriceKSh: 20 },
          { name: 'Potatoes (Waru)', amount: '2 medium, peeled & halved', estimatedPriceKSh: 25 },
          { name: 'Cooking Oil', amount: '3 tbsp', estimatedPriceKSh: 20 },
          { name: 'Ripe Tomatoes & Lemon (for Kachumbari)', amount: '2 tomatoes, 1 onion, 1 lemon, 1 pilipili', estimatedPriceKSh: 40 }
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Boil beef in 4 cups of water with a pinch of salt and ginger until tender. Strain and reserve 3.5 cups of aromatic beef stock.',
            tip: 'Skim any foam from the broth for a crystal clear stock.',
            timerMinutes: 15
          },
          {
            stepNumber: 2,
            instruction: 'In a large heavy sufuria, heat 3 tablespoons of cooking oil over medium heat. Add sliced onions and cook, stirring frequently, until deep golden mahogany brown.',
            tip: 'Watch closely in the final minutes so the onions caramelize without burning.',
            timerMinutes: 10
          },
          {
            stepNumber: 3,
            instruction: 'Add garlic-ginger paste, whole pilau masala, and potato halves. Toast spices in the hot oil for 60 seconds until deeply fragrant, then add the boiled beef and stir to coat.',
            tip: 'Toasting spices in oil unlocks essential aromatic oils.',
            timerMinutes: 2
          },
          {
            stepNumber: 4,
            instruction: 'Add drained basmati rice and stir gently for 1 minute to coat grains in oil. Pour in the 3.5 cups of reserved hot beef broth. Season with salt. Bring to a rapid rolling boil.',
            timerMinutes: 4
          },
          {
            stepNumber: 5,
            instruction: 'Once liquid reduces to rice level (small craters form), tightly seal sufuria with foil and lid. Reduce heat to absolute minimum and steam cook (dum) for 15 minutes undisturbed.',
            tip: 'Do not lift the lid during steaming to keep rice grains elongated and separate.',
            timerMinutes: 15
          },
          {
            stepNumber: 6,
            instruction: 'While rice steams, make Kachumbari: finely dice tomatoes, red onion, dhania, and bird\'s eye chili (pilipili). Toss with fresh lemon juice and sea salt.',
            tip: 'Rinse chopped onions in cold salted water first to tame sharpness.'
          },
          {
            stepNumber: 7,
            instruction: 'Fluff pilau gently with a fork. Plate onto a wide serving platter garnished with tender potatoes and serve with crisp kachumbari.'
          }
        ]
      },
      {
        id: 'rec_ke_3',
        title: 'Soft Layered Kenyan Chapatis with Rich Coconut Dengu',
        description: 'Golden spiral-rolled soft chapatis with delicate flaky layers, paired with slow-simmered green grams in rich coconut cream, tomatoes, and aromatic dhania.',
        cuisine: 'Kenyan Swahili',
        difficulty: 'Medium',
        isKenyanDish: true,
        estimatedCostKSh: 260,
        costPerServingKSh: 65,
        budgetTier: 'Budget',
        prepTimeMinutes: 20,
        cookTimeMinutes: 25,
        totalTimeMinutes: 45,
        calories: 490,
        servings: 4,
        proteinGrams: 20,
        carbsGrams: 76,
        fatGrams: 14,
        dietaryTags: ['Vegetarian', 'Vegan', 'High-Protein', 'Plant-Based'],
        chefNote: 'For ultra-soft chapatis, knead dough with lukewarm water and let rest for at least 20 minutes before rolling.',
        ingredients: [
          { name: 'All-Purpose Wheat Flour (Atta/Ngano)', amount: '3 cups', estimatedPriceKSh: 60 },
          { name: 'Green Grams (Dengu / Ndengu)', amount: '2 cups boiled', estimatedPriceKSh: 80 },
          { name: 'Coconut Milk (Tui la Nazi)', amount: '1 cup', estimatedPriceKSh: 70 },
          { name: 'Red Onion & Garlic', amount: '1 onion, 2 cloves garlic', estimatedPriceKSh: 20 },
          { name: 'Ripe Tomatoes', amount: '2 blended or grated', estimatedPriceKSh: 20 },
          { name: 'Fresh Dhania', amount: '1/2 bunch chopped', estimatedPriceKSh: 10 }
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: 'In a bowl, mix flour, 1 tsp salt, and 1 tbsp oil. Gradually knead in lukewarm water until soft elastic dough forms (8 minutes). Cover and rest 20 minutes.',
            timerMinutes: 8
          },
          {
            stepNumber: 2,
            instruction: 'Divide dough into 6 balls. Roll each ball into a thin disk, brush with oil, cut from center outward, and roll into a cone, then flatten into spiral disks for flaky layers.',
            tip: 'The spiral rolling creates unmistakable Kenyan chapati ring layers.'
          },
          {
            stepNumber: 3,
            instruction: 'Cook chapatis on medium hot dry tawa until light spots appear. Flip, brush with oil, flip again and press edges with towel until puffed with golden blisters.',
            timerMinutes: 12
          },
          {
            stepNumber: 4,
            instruction: 'For Dengu: Sauté onion and garlic in 1 tbsp oil until fragrant. Add blended tomatoes and simmer 3 minutes. Add boiled green grams, coconut milk, and salt. Simmer 7 minutes until creamy.',
            timerMinutes: 7
          },
          {
            stepNumber: 5,
            instruction: 'Garnish hot dengu stew with fresh dhania and serve with warm, pliable, soft folded chapatis.'
          }
        ]
      },
      {
        id: 'rec_ke_4',
        title: 'Githeri Special wa Mboga (Sautéed Maize & Beans Stew)',
        description: 'Nutrient-rich Kenyan hearty staple of tender boiled white corn kernels and red kidney beans, stir-fried with sweet red onions, tomatoes, diced potatoes, and dhania.',
        cuisine: 'Kenyan Central Highlands',
        difficulty: 'Easy',
        isKenyanDish: true,
        estimatedCostKSh: 210,
        costPerServingKSh: 52,
        budgetTier: 'Budget',
        prepTimeMinutes: 10,
        cookTimeMinutes: 15,
        totalTimeMinutes: 25,
        calories: 390,
        servings: 4,
        proteinGrams: 17,
        carbsGrams: 68,
        fatGrams: 6,
        dietaryTags: ['Vegan', 'Vegetarian', 'High-Fiber', 'Gluten-Free'],
        chefNote: 'Adding a spoonful of curry powder and fresh dhania elevates humble githeri into a rich, mouthwatering stew.',
        ingredients: [
          { name: 'Boiled Githeri (Maize & Beans mix)', amount: '3 cups cooked', estimatedPriceKSh: 90 },
          { name: 'Red Onions (Kitunguu)', amount: '2 medium, diced', estimatedPriceKSh: 25 },
          { name: 'Tomatoes (Nyanya)', amount: '3 ripe, chopped', estimatedPriceKSh: 30 },
          { name: 'Irish Potatoes (Waru)', amount: '2 medium, peeled & cubed small', estimatedPriceKSh: 25 },
          { name: 'Fresh Dhania', amount: '1 bunch, chopped', estimatedPriceKSh: 15 },
          { name: 'Cooking Oil & Spices', amount: '2 tbsp oil, 1 tsp curry powder, salt', estimatedPriceKSh: 25 }
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Heat cooking oil in a wide sufuria. Sauté diced onions until translucent and lightly golden.',
            timerMinutes: 3
          },
          {
            stepNumber: 2,
            instruction: 'Add chopped tomatoes, curry powder, and cubed potatoes. Cover on medium heat for 5 minutes until tomatoes break down into a thick sauce.',
            timerMinutes: 5
          },
          {
            stepNumber: 3,
            instruction: 'Add the boiled githeri and 1/2 cup of water. Season with salt. Simmer gently for 7 minutes so the beans and corn absorb the tomato-potato gravy.',
            timerMinutes: 7
          },
          {
            stepNumber: 4,
            instruction: 'Turn off heat, stir in generous handfuls of fresh dhania, and serve piping hot with sliced avocado.'
          }
        ]
      },
      {
        id: 'rec_ke_5',
        title: 'Lake Victoria Fresh Tilapia Wet Fry',
        description: 'Crispy pan-fried whole tilapia fish simmered in a luscious stew of sautéed sweet onions, blistered tomatoes, garlic, and fresh coriander, served with piping hot ugali.',
        cuisine: 'Kenyan Lakeside',
        difficulty: 'Medium',
        isKenyanDish: true,
        estimatedCostKSh: 420,
        costPerServingKSh: 140,
        budgetTier: 'Moderate',
        prepTimeMinutes: 10,
        cookTimeMinutes: 20,
        totalTimeMinutes: 30,
        calories: 460,
        servings: 3,
        proteinGrams: 42,
        carbsGrams: 12,
        fatGrams: 18,
        dietaryTags: ['High-Protein', 'Gluten-Free', 'Lakeside'],
        chefNote: 'Score the fish diagonally on both sides and season with salt and garlic before frying so the flavors penetrate deep to the bone.',
        ingredients: [
          { name: 'Fresh Whole Tilapia Fish', amount: '1 large (approx 600g), cleaned & scored', estimatedPriceKSh: 280 },
          { name: 'Red Onions', amount: '2 large, sliced into rings', estimatedPriceKSh: 25 },
          { name: 'Ripe Tomatoes', amount: '4 ripe, diced', estimatedPriceKSh: 40 },
          { name: 'Garlic & Ginger', amount: '1 tbsp minced', estimatedPriceKSh: 15 },
          { name: 'Fresh Dhania', amount: '1 bunch chopped', estimatedPriceKSh: 15 },
          { name: 'Cooking Oil for frying', amount: '1/2 cup', estimatedPriceKSh: 45 }
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: 'Pat the cleaned tilapia thoroughly dry. Make 3 diagonal cuts across both sides and season generously with salt and crushed garlic.',
            tip: 'Dry skin ensures maximum crispiness without sticking.'
          },
          {
            stepNumber: 2,
            instruction: 'Heat oil in a wide frying pan over medium-high heat. Fry fish for 6-7 minutes per side until golden brown and crisp. Remove and drain on paper towel.',
            timerMinutes: 13
          },
          {
            stepNumber: 3,
            instruction: 'In a separate skillet, heat 2 tablespoons of oil. Sauté sliced onions until golden. Add minced garlic, ginger, and chopped tomatoes. Cover and cook until tomatoes break down into rich gravy.',
            timerMinutes: 5
          },
          {
            stepNumber: 4,
            instruction: 'Gently place the fried tilapia into the simmering tomato sauce. Spoon hot gravy over the fish, scatter fresh dhania on top, and simmer for 3 minutes.',
            timerMinutes: 3
          },
          {
            stepNumber: 5,
            instruction: 'Serve hot wet fry tilapia immediately with freshly made ugali and sukuma wiki.'
          }
        ]
      }
    ]
  },
  {
    id: 'keto-protein',
    name: 'Keto & High-Protein Vault',
    subtitle: 'Chicken Breasts, Bacon, Avocado, Eggs, Parmesan, Mushrooms, Zucchini',
    thumbnail: '🥑',
    badge: 'Keto Diet',
    photoUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    ingredients: [
      { id: 'ing_kp1', name: 'Boneless Chicken Breast', category: 'Meat & Seafood', confidence: 0.97, quantity: '2 breasts (500g)' },
      { id: 'ing_kp2', name: 'Smoked Thick-Cut Bacon', category: 'Meat & Seafood', confidence: 0.96, quantity: '6 slices' },
      { id: 'ing_kp3', name: 'Ripe Hass Avocado', category: 'Produce', confidence: 0.95, quantity: '2 avocados' },
      { id: 'ing_kp4', name: 'Aged Parmesan Wedge', category: 'Dairy & Eggs', confidence: 0.94, quantity: '1 cup grated' },
      { id: 'ing_kp5', name: 'Fresh White Mushrooms', category: 'Produce', confidence: 0.91, quantity: '8 oz sliced' },
      { id: 'ing_kp6', name: 'Green Zucchini', category: 'Produce', confidence: 0.93, quantity: '2 medium' },
      { id: 'ing_kp7', name: 'Eggs', category: 'Dairy & Eggs', confidence: 0.98, quantity: '4 eggs' },
    ],
    defaultRecipes: [
      {
        id: 'rec_keto_1',
        title: 'Crispy Bacon & Parmesan Chicken Skillet',
        description: 'Golden pan-seared chicken breast smothered in rendered bacon crispies, sautéed mushrooms, and melted aged parmesan crust.',
        cuisine: 'Low-Carb Bistro',
        difficulty: 'Medium',
        estimatedCostKSh: 590,
        costPerServingKSh: 195,
        budgetTier: 'Moderate',
        prepTimeMinutes: 10,
        cookTimeMinutes: 18,
        totalTimeMinutes: 28,
        calories: 540,
        servings: 2,
        proteinGrams: 52,
        carbsGrams: 5,
        fatGrams: 34,
        dietaryTags: ['Keto', 'High-Protein', 'Gluten-Free', 'Low-Carb'],
        chefNote: 'Cook the chicken in reserved bacon drippings for rich savoriness and deep caramelization.',
        ingredients: [
          { name: 'Boneless Chicken Breast', amount: '2 pieces', estimatedPriceKSh: 350 },
          { name: 'Smoked Thick-Cut Bacon', amount: '4 strips, diced', estimatedPriceKSh: 180 },
          { name: 'Fresh White Mushrooms', amount: '8 oz, sliced', estimatedPriceKSh: 90 },
          { name: 'Aged Parmesan Cheese', amount: '1/2 cup freshly grated', estimatedPriceKSh: 120 },
          { name: 'Avocado', amount: '1 sliced', estimatedPriceKSh: 40 }
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: 'In a large skillet, render diced bacon over medium heat until golden and crispy (about 6 minutes). Transfer bacon to paper towels, leaving drippings in the pan.',
            timerMinutes: 6
          },
          {
            stepNumber: 2,
            instruction: 'Season chicken cutlets with salt and pepper. Sear in hot bacon fat for 4 minutes per side until deeply browned and cooked through.',
            timerMinutes: 8
          },
          {
            stepNumber: 3,
            instruction: 'Toss sliced mushrooms into the same pan and sauté for 4 minutes until golden brown and caramelized.',
            timerMinutes: 4
          },
          {
            stepNumber: 4,
            instruction: 'Return chicken to the pan, top with mushrooms, crispy bacon, and parmesan cheese. Cover pan for 2 minutes until cheese melts.',
            timerMinutes: 2
          }
        ]
      }
    ]
  }
];
