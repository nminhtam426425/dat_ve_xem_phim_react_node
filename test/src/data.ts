import { Movie, Showtime } from './types';

export const MOVIES: Movie[] = [
  {
    id: 'neon-horizon',
    title: 'Neon Horizon',
    genre: 'Sci-Fi',
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    duration: '2H 15M',
    rating: 9.2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoEOJOChtbVPKL_AH7k_V9DK5tYNTCY4YjyNUsuhZfK1RxkofhnqmbKQVRYtAWnBS6fZwH9aE94JM3bgQ4BsXIgTXezLN218u5C_LJSjCHhz3qurkc6HrEYJ6ddKl12_Xp9Vx4b65NiU8m3L4KFtt80GRwSRuY711V8cQvl2UQG70FopPeMM8Mrhb1viMIw_s17dg0QLn4SqhGXKTG7S1jp-1AWRbkctLDa1NdXT0qfeGVU1IYDGjeNXehnk9O2wNICFcsQkevmLw',
    synopsis: 'In a neo-noir dystopian future, an outlaw pilot must convey a classified bio-digital weapon across a neon-soaked cyberpunk cityscape while evading the hyper-surveillance of a ruthless security conglomerate.',
    director: 'Denis Villeneuve',
    cast: ['Ryan Gosling', 'Ana de Armas', 'Zendaya', 'Robin Wright'],
    releaseDate: 'Oct 12, 2025',
    accentColor: '#e50914'
  },
  {
    id: 'midnight-echo',
    title: 'Midnight Echo',
    genre: 'Thriller',
    genres: ['Thriller', 'Drama', 'Mystery'],
    duration: '1H 58M',
    rating: 8.7,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiv-pZ6GeZ9O3pIpE0xGtK5QgzlEfgy-kEyLq_AZ5YDW5hAwyGbmXgplZ66-EDpmn4rhsjdybVzZmgA9h1F0JA4fTDIVyNMTY-OaGj0djx-adVB53S0f9Hhe6s3FfaeaSBLoV8hUz5ysBDkiAKXQb6dwLNdH_HZ-hIJcDZb_6tR5X0EGZBj69mZFzO8CTzTpmwLftbAXCn80eol8jbaGSeMwYz-aPZe_wBAnTiYzHzVdthBBkgIzG39jL9uYpoCHncNzD6ainE-S0',
    synopsis: 'When a world-class detective finds himself trapped inside an endless, fog-filled alleyway, he realizes that the street itself is alive—shifting shapes and reflecting his deepest regrets in a series of nightmarish tests.',
    director: 'David Fincher',
    cast: ['Christian Bale', 'Gary Oldman', 'Jessica Chastain', 'Willem Dafoe'],
    releaseDate: 'Nov 23, 2025',
    accentColor: '#3b82f6'
  },
  {
    id: 'the-last-ascent',
    title: 'The Last Ascent',
    genre: 'Drama',
    genres: ['Drama', 'Action', 'Adventure'],
    duration: '2H 40M',
    rating: 9.5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMKxO5ctNAL82eEaKzcIDHphaR-OuX3_IKA_aim6Cc_V-UsRT5OzSRyOzPG1f4l5wRNgbZoKfXhpHcBbI3kKk7NhZFzdLZzNpGxc-giFzw_0gCYbz0N6UM6vsSlS2NtU5-J09bCmQybPOjBwDtb8WWOygJ9Hy_snjrsGCUIXztR_YSulgat0uSccqL_EjHucrk_JYsnlUcQ_I9q1nfWSuSHK24s2S5a1MczhHocQYL9kcfGua2MuFYSgS0cul7tUyFDTH99lufzsU',
    synopsis: 'An awe-inspiring expedition of a broken-hearted climber seeking solace by conquering the highest unmapped mountain canyon at dawn. Along the vertical limit, he finds unexpected brotherhood and the courage to survive.',
    director: 'Christopher Nolan',
    cast: ['Tom Hardy', 'Florence Pugh', 'Cillian Murphy', 'Matthew McConaughey'],
    releaseDate: 'Dec 18, 2025',
    accentColor: '#f59e0b'
  },
  {
    id: 'cloud-kingdom',
    title: 'Cloud Kingdom',
    genre: 'Animation',
    genres: ['Animation', 'Comedy', 'Family'],
    duration: '1H 35M',
    rating: 8.1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCt_O-tAM9GZkp6MUZCKCydrg4flqUP3v64l3Ka4U4GXaeMY81IVgqRMZq7sPp-l5C9nzotvvvqzRoy8n3_ztDZY0AbCW_E7See6vUPLDLDLA68ShjGTAcMuJXsyhaBHuhNaMYufw7wlId-LUeHmBmc1Bxk0vflpNET15t0aJiXnfbVL9FEUSTNYPpiVqdNH6Hf25bCF1OO6GSJm_jT6L9zx8AXPRWI-wgMSO1WOJFmdAY0TflGGos9ZJuex_WszSloShocLDKybdE',
    synopsis: 'A cheerful cloud-spirit ventures outside his comfortable floating kingdom into the colorful fantasy world below. To rescue his lost companions, he must team up with a fiery forest pixie and navigate treacherous wind currents.',
    director: 'Pete Docter',
    cast: ['Awkwafina', 'Chris Pratt', 'Ke Huy Quan', 'Bill Hader'],
    releaseDate: 'Jul 04, 2025',
    accentColor: '#10b981'
  },
  {
    id: 'overdrive',
    title: 'Overdrive',
    genre: 'Action',
    genres: ['Action', 'Thriller', 'Sci-Fi'],
    duration: '2H 05M',
    rating: 8.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEsGeZXwKPB9zrYbrXW2xBvC5eavBxddfiqwW0iLa79DmLTrMDrb0FaEFjiG6sqfFqYhGfIyM4uIoRT7b1iwl688vdUfdXNDg_8OMTKHKs2SnWktwWwJ-A6J7cfkQXQEtOupiCLJ_RnkFllDVydtlqYZgHWmyBfGiOZk408Zeaw1PblrFIF74CzbeE03fp-Wh9J-JEbz2cL65coWWxIqELl3Ef9fPq8kmLDg4DYigKTLD67PaI4Eci2WNZChdKep6Dbm1qotwQmE0',
    synopsis: 'High-speed nitro-fueled action unfolds on a massive suspension bridge as rival street racing syndicates clash at dusk for custody of a highly sought-after, clean-energy quantum battery.',
    director: 'Justin Lin',
    cast: ['Vin Diesel', 'Michelle Rodriguez', 'Jason Momoa', 'Charlize Theron'],
    releaseDate: 'Aug 14, 2025',
    accentColor: '#ef4444'
  },
  {
    id: 'shadow-manor',
    title: 'Shadow Manor',
    genre: 'Horror',
    genres: ['Horror', 'Mystery', 'Thriller'],
    duration: '1H 42M',
    rating: 7.4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgyt_nxs0sZo0KKcfuZQNTZtNerkdvdMgRkAixThwnV6c7pgg7AGxTb2xKSEB9HtVAhnkpLR_wHM1XdDDCa2AQEX3wza8yjmncVHbSJihFJ1edyffacv3-q_AM9jqzmvj5KvRDFIOJVpeH9SO2nl_6ERzgotMjzsWpRENyS9zsngAFaUKw8_yNPPMms6V-aI3T6Dk0uWfxZS6vaIcp2lfpaGNYZZvgq_RYgKLtNymCNayBrTU7dUBg4Jv9hf3M0hYHdBIIoxdxeRs',
    synopsis: 'An estranged family inherits a beautiful but derelict Victorian estate, only to discover that the shadows cast by the house do not match the real light sources. As night falls, they must solve the house secret before they become shadows themselves.',
    director: 'Ari Aster',
    cast: ['Toni Collette', 'Lupita Nyong\'o', 'Ethan Hawke', 'Mia Goth'],
    releaseDate: 'Oct 31, 2025',
    accentColor: '#8b5cf6'
  },
  {
    id: 'weekend-chaos',
    title: 'Weekend Chaos',
    genre: 'Comedy',
    genres: ['Comedy', 'Drama'],
    duration: '1H 52M',
    rating: 8.4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtQTgt03E_Ihatz4lVq4jR8Q4LhyM8jcAJZbbJXPV9s4OZ3Z_NYbrOtMKEQGV41kmms_ukXRSOq3_9rGjqxb5Bq8Xm5Jh_LLGZaSwAuqJbuxAiq-CH--hehAncMoJfVA6ee_fRdyk4NWCiOzpPVG7FhbRoX9VijaLDG9fYVnVGO9gALUbZHGp4XDtrTElsqlrD1dvJvsNV5iCP5To1emSQdY-kiBBKJISdF5b8H4jgKnkhBW1lzH2kS3solfmue1k_mjJCNkj--_0',
    synopsis: 'Seven highly eccentric, polar-opposite childhood friends gather for what is supposed to be an elegant, sophisticated dinner party. It quickly spirals into absolute comedic chaos, with flying meals, mistaken identities, and unexpected admissions.',
    director: 'Paul Feig',
    cast: ['Melissa McCarthy', 'Steve Carell', 'Will Ferrell', 'Tina Fey'],
    releaseDate: 'Jun 12, 2025',
    accentColor: '#ec4899'
  },
  {
    id: 'empires-fall',
    title: 'Empire\'s Fall',
    genre: 'History',
    genres: ['History', 'Drama', 'War'],
    duration: '3H 10M',
    rating: 9.0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxA6_lQNEjuK9Z3NaEDYb872ZwnRtPNhnSrce7gHKhvcOb7wtneIHELdpR-u4J5WpMpxareGk2Rnb6GbOU9JYnPJ4h4o-VxAltdCCeyukGn812m7D1q0WRDxwrb6UOHQL2Xya7T__Zc1Zypjw5peXx1M-Ke5CE-FzTBCgigthW67YAE5IvAt1nmZTPXK4UZB74rJM5Ax2WezisQ0traDDuh75HL2elXlAUQt_8lVhAzRXmWl8UfMA7BeaL7b2K32Sy96k_Zlu-c18',
    synopsis: 'A majestic historical drama detailing the final days, internal power struggles, betrayals, and slow crumbling of a legendary ancient empire, filmed within magnificent, gold-gilded, high-ceiling marble courts.',
    director: 'Ridley Scott',
    cast: ['Joaquin Phoenix', 'Timothée Chalamet', 'Pedro Pascal', 'Vanessa Kirby'],
    releaseDate: 'Nov 05, 2025',
    accentColor: '#d97706'
  }
];

export const GENRES = [
  'All Movies',
  'Action',
  'Comedy',
  'Drama',
  'Sci-Fi',
  'Horror',
  'Animation',
  'Thriller'
];

export const SHOWTIMES: Showtime[] = [
  { id: 'st1', time: '10:00 AM', type: '2D', price: 90000 },
  { id: 'st2', time: '12:45 PM', type: '3D', price: 120000 },
  { id: 'st3', time: '03:30 PM', type: 'IMAX', price: 160000 },
  { id: 'st4', time: '06:15 PM', type: '2D', price: 95000 },
  { id: 'st5', time: '09:00 PM', type: 'IMAX', price: 160000 },
  { id: 'st6', time: '11:30 PM', type: '3D', price: 120000 }
];

export const CINEMAS = [
  { id: 'c1', name: 'CineReserve Royal Plaza', address: 'Floor 5, Royal Plaza, District 1, HCMC', phone: '028-1234-5678' },
  { id: 'c2', name: 'CineReserve Crescent Mall', address: 'Floor 4, Crescent Mall, District 7, HCMC', phone: '028-8765-4321' },
  { id: 'c3', name: 'CineReserve Landmark 81', address: 'Floor 2, Landmark 81, Binh Thanh District, HCMC', phone: '028-3647-5829' },
  { id: 'c4', name: 'CineReserve Grand Park', address: 'Floor 3, Vincom Grand Park, District 9, Thu Duc City', phone: '028-4938-2019' }
];

export const OFFERS = [
  {
    id: 'o_popcorn',
    title: 'Happy Combo Deal',
    description: 'Get 1 Large Popcorn and 2 Soft Drinks for only 120,000 VND (Save 25%) when booking tickets online!',
    code: 'COMBO25',
    imageUrl: '🍿'
  },
  {
    id: 'o_student',
    title: 'Student Wednesday',
    description: 'Flat rate of 70,000 VND per ticket for all 2D screen experiences every Wednesday. Valid with student ID.',
    code: 'STUDENTDAY',
    imageUrl: '🎓'
  },
  {
    id: 'o_visa',
    title: 'Visa Touch Offer',
    description: '10% discount on IMAX screenings when checking out with a verified Visa Contactless card.',
    code: 'VISAIMAX',
    imageUrl: '💳'
  }
];
