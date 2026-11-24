export interface AcademyCourse {
  id: string;
  title: string;
  instructor: string;
  instructorTitle: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  lessonsCount: number;
  category: 'Technique' | 'Regional Heritage' | 'Commercial Kitchen' | 'Food Safety';
  thumbnailUrl: string;
  description: string;
  modules: {
    title: string;
    duration: string;
    keySkills: string[];
  }[];
  accreditationNote: string;
  certificationAvailable: boolean;
}

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'course-chapati-masterclass',
    title: 'The Definitive Soft Chapati Masterclass',
    instructor: 'Chef Amina Mwangi',
    instructorTitle: 'Master Pastry Chef & East African Flatbread Authority',
    duration: '2h 15m',
    level: 'Intermediate',
    lessonsCount: 6,
    category: 'Technique',
    thumbnailUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    description: 'Master the thermodynamics of dough gluten relaxation, oil-emulsion kneading, cone-spiral rolling, and tawa heat regulation to produce multi-layered Kenyan chapatis that stay soft for 48 hours.',
    accreditationNote: 'Frost Chef Culinary Certificate awarded upon submission of photographic evidence and quiz completion.',
    certificationAvailable: true,
    modules: [
      {
        title: 'Science of Flour & Hydration (Lukewarm Water vs Cold)',
        duration: '20 mins',
        keySkills: ['Protein percentage in Atta vs All-purpose', 'Optimal water-to-flour ratios (55-60% hydration)', 'Salt activation'],
      },
      {
        title: 'Kneading Kinetics & The Critical 20-Minute Rest',
        duration: '25 mins',
        keySkills: ['Palm heel kneading technique', 'Gluten windowpane test', 'Damp-cloth resting chamber'],
      },
      {
        title: 'The Spiral Cone Layering Technique',
        duration: '30 mins',
        keySkills: ['Center-to-radius slit cutting', 'Tight cone rolling', 'Vertical spiral pressing without breaking lamination'],
      },
      {
        title: 'Tawa Pan Heat Control & Oil Timing',
        duration: '35 mins',
        keySkills: ['Dry par-cooking first stage', 'Oil brush edge pressing', 'Blister color indexing (golden leopard spots)'],
      },
      {
        title: 'Storage, Reheating & Diaspora Wheat Adjustments',
        duration: '25 mins',
        keySkills: ['Tea-towel insulated basket resting', 'Freezer storage & steam reheating'],
      },
    ],
  },
  {
    id: 'course-swahili-pilau',
    title: 'Swahili Pilau & Dum Steaming Mastery',
    instructor: 'Ustadh Omar Bakari',
    instructorTitle: 'Heritage Swahili Cuisine Historian, Old Town Mombasa',
    duration: '3h 10m',
    level: 'Advanced',
    lessonsCount: 7,
    category: 'Regional Heritage',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    description: 'Learn the ancestral secrets of Indian Ocean spice toasting, deep red onion Maillard caramelization, marrow bone stock preparation, and sealed-pot dum steam trapping.',
    accreditationNote: 'Coast Gastronomy Heritage Certificate issued by KenyaOne Cultural Division.',
    certificationAvailable: true,
    modules: [
      {
        title: 'Botanical Anatomy of Pilau Masala',
        duration: '30 mins',
        keySkills: ['Cumin vs Caraway identification', 'Green cardamom pod cracking', 'Cinnamon bark quality grading'],
      },
      {
        title: 'The Art of Deep Mahogany Onion Browning',
        duration: '35 mins',
        keySkills: ['Natural sugar caramelization', 'Preventing acrid bitterness', 'Oil volume balance'],
      },
      {
        title: 'Braising Bone-In Meat for Clear Broth',
        duration: '40 mins',
        keySkills: ['Foam skimming (depurage)', 'Infusing crushed ginger-garlic', 'Straining clarity tests'],
      },
      {
        title: 'Liquid-to-Rice Precision & Boiling Stages',
        duration: '45 mins',
        keySkills: ['Basmati starch washing', 'The 1:1.75 liquid ratio', 'Volcanic steam crater formation'],
      },
      {
        title: 'The Foil-Sealed Dum Steaming Protocol',
        duration: '40 mins',
        keySkills: ['Hermetic lid sealing', 'Minimum flame thermal equilibrium', 'Grain separation with wooden fork'],
      },
    ],
  },
  {
    id: 'course-nyama-choma',
    title: 'Nyama Choma: Open Flame Pit Roasting',
    instructor: 'Chef John Ole Kiyiapi',
    instructorTitle: 'Executive Pitmaster, Rift Valley Grilling Guild',
    duration: '2h 45m',
    level: 'Intermediate',
    lessonsCount: 5,
    category: 'Technique',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    description: 'A comprehensive guide to selecting prime Kenyan goat, butchering rib and leg quarters, hardwood charcoal selection, airflow control, and pure sea salt finishing.',
    accreditationNote: 'Recognized by Kenya Hospitality & Catering Standards.',
    certificationAvailable: true,
    modules: [
      {
        title: 'Selecting Goat & Beef Quarters for Choma',
        duration: '30 mins',
        keySkills: ['Range-fed goat fat cap assessment', 'Butchering rib racks', 'Bone-to-meat thermal ratios'],
      },
      {
        title: 'Fuel Science: Acacia Hardwood vs Briquettes',
        duration: '25 mins',
        keySkills: ['White coal bed formation', 'Smoke purity testing', 'Zone heat management'],
      },
      {
        title: 'Slow Rotational Searing & Rendering',
        duration: '40 mins',
        keySkills: ['Continuous wire grill turning', 'Crisping outer skin without drying interior', 'Internal temperature checks'],
      },
      {
        title: 'Kachumbari & Ugali Pairing Architecture',
        duration: '30 mins',
        keySkills: ['Lemon-to-onion balancing', 'Chili heat calibration', 'Traditional cutting board service'],
      },
    ],
  },
  {
    id: 'course-food-hygiene',
    title: 'Commercial Food Hygiene & Kitchen Safety Standards',
    instructor: 'Dr. Esther Wanjiru, MPH',
    instructorTitle: 'Public Health & Food Safety Inspector',
    duration: '4h 00m',
    level: 'Professional',
    lessonsCount: 8,
    category: 'Food Safety',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    description: 'Kenya Public Health Act (Cap 242) and international HACCP standards for restaurant kitchens, catering setups, cold-chain preservation, and cross-contamination prevention.',
    accreditationNote: 'Standardized institutional curriculum compliant with Kenya Public Health regulations.',
    certificationAvailable: true,
    modules: [
      {
        title: 'The Danger Zone: Bacterial Growth Temperatures (5°C to 63°C)',
        duration: '40 mins',
        keySkills: ['Cooling rice safely', 'Thawing meats in refrigerated conditions', 'Digital probe thermometer calibration'],
      },
      {
        title: 'Cross-Contamination & Color-Coded Cutting Surfaces',
        duration: '45 mins',
        keySkills: ['Raw poultry vs ready-to-eat produce', 'Sanitizer ppm testing', 'Handwashing protocols'],
      },
      {
        title: 'Allergen Management & Menu Disclosure Protocols',
        duration: '45 mins',
        keySkills: ['Gluten, Dairy, Peanuts & Shellfish separation', 'Front-of-house communication', 'Trace contamination logs'],
      },
    ],
  },
];
