export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  hours: string;
  services: Service[];
  images: string[];
  verified: boolean;
  premium: boolean;
}

export interface Booking {
  id: string;
  businessId: string;
  businessName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
  customerName?: string;
  customerEmail?: string;
}

export interface Review {
  id: string;
  businessId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  serviceName?: string;
  response?: string;
}

export const categories = [
  { id: 'hair', name: 'Hair', icon: '💇' },
  { id: 'nails', name: 'Nails', icon: '💅' },
  { id: 'massage', name: 'Massage', icon: '💆' },
  { id: 'facial', name: 'Facial', icon: '✨' },
  { id: 'brows', name: 'Brows & Lashes', icon: '👁️' },
  { id: 'wellness', name: 'Wellness', icon: '🧘' },
];

export const mockBusinesses: Business[] = [
  {
    id: 'b1',
    name: 'Serenity Spa & Wellness',
    description:
      'Luxury spa offering premium treatments in a peaceful environment. Our expert therapists provide personalized care for your ultimate relaxation.',
    category: 'massage',
    rating: 4.8,
    reviewCount: 127,
    address: 'Le Marais',
    city: 'Paris',
    hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
    verified: true,
    premium: true,
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800',
    ],
    services: [
      {
        id: 's1',
        name: 'Swedish Massage',
        description: 'Relaxing full-body massage',
        duration: 60,
        price: 95,
        category: 'massage',
      },
      {
        id: 's2',
        name: 'Deep Tissue Massage',
        description: 'Therapeutic muscle treatment',
        duration: 90,
        price: 125,
        category: 'massage',
      },
      {
        id: 's3',
        name: 'Hot Stone Therapy',
        description: 'Heated stones for deep relaxation',
        duration: 75,
        price: 110,
        category: 'massage',
      },
    ],
  },
  {
    id: 'b2',
    name: 'The Hair Studio',
    description:
      'Modern hair salon with experienced stylists specializing in cuts, color, and styling for all hair types.',
    category: 'hair',
    rating: 4.9,
    reviewCount: 203,
    address: 'Saint-Germain-des-Prés',
    city: 'Paris',
    hours: 'Tue-Sat: 10AM-7PM, Sun: 11AM-5PM',
    verified: true,
    premium: true,
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
    ],
    services: [
      {
        id: 's4',
        name: "Women's Cut & Style",
        description: 'Haircut with wash and blow dry',
        duration: 60,
        price: 85,
        category: 'hair',
      },
      {
        id: 's5',
        name: 'Full Color',
        description: 'Complete color treatment',
        duration: 120,
        price: 150,
        category: 'hair',
      },
      {
        id: 's6',
        name: 'Balayage',
        description: 'Hand-painted highlights',
        duration: 180,
        price: 220,
        category: 'hair',
      },
    ],
  },
  {
    id: 'b3',
    name: 'Polished Nails Bar',
    description:
      'Upscale nail salon offering manicures, pedicures, and nail art in a chic, comfortable setting.',
    category: 'nails',
    rating: 4.7,
    reviewCount: 156,
    address: 'Cannes La Bocca',
    city: 'Cannes',
    hours: 'Mon-Sun: 10AM-8PM',
    verified: true,
    premium: false,
    images: [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800',
      'https://images.unsplash.com/photo-1610992015462-7534a1ab77c5?w=800',
    ],
    services: [
      {
        id: 's7',
        name: 'Classic Manicure',
        description: 'Polish with hand care',
        duration: 30,
        price: 35,
        category: 'nails',
      },
      {
        id: 's8',
        name: 'Gel Manicure',
        description: 'Long-lasting gel polish',
        duration: 45,
        price: 55,
        category: 'nails',
      },
      {
        id: 's9',
        name: 'Spa Pedicure',
        description: 'Relaxing foot treatment',
        duration: 60,
        price: 65,
        category: 'nails',
      },
    ],
  },
  {
    id: 'b4',
    name: 'Radiance Skin Care',
    description:
      'Medical-grade facials and skincare treatments performed by licensed estheticians.',
    category: 'facial',
    rating: 4.9,
    reviewCount: 89,
    address: 'Vieux Lyon',
    city: 'Lyon',
    hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
    verified: true,
    premium: true,
    images: [
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800',
    ],
    services: [
      {
        id: 's10',
        name: 'Classic Facial',
        description: 'Deep cleansing facial',
        duration: 60,
        price: 90,
        category: 'facial',
      },
      {
        id: 's11',
        name: 'Hydra Facial',
        description: 'Advanced hydration treatment',
        duration: 75,
        price: 175,
        category: 'facial',
      },
      {
        id: 's12',
        name: 'Chemical Peel',
        description: 'Skin resurfacing treatment',
        duration: 45,
        price: 120,
        category: 'facial',
      },
    ],
  },
  {
    id: 'b5',
    name: 'Brow & Lash Boutique',
    description:
      'Specialists in eyebrow shaping, lash extensions, and tinting services.',
    category: 'brows',
    rating: 4.8,
    reviewCount: 134,
    address: 'La Croisette',
    city: 'Nice',
    hours: 'Tue-Sat: 10AM-7PM',
    verified: true,
    premium: false,
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800',
    ],
    services: [
      {
        id: 's13',
        name: 'Brow Shaping',
        description: 'Precision brow sculpting',
        duration: 30,
        price: 28,
        category: 'brows',
      },
      {
        id: 's14',
        name: 'Lash Extensions',
        description: 'Full set of extensions',
        duration: 120,
        price: 180,
        category: 'brows',
      },
      {
        id: 's15',
        name: 'Lash & Brow Tint',
        description: 'Professional tinting service',
        duration: 45,
        price: 45,
        category: 'brows',
      },
    ],
  },
  {
    id: 'b6',
    name: 'Zen Yoga & Wellness',
    description:
      'Holistic wellness center offering yoga, meditation, and therapeutic treatments.',
    category: 'wellness',
    rating: 4.7,
    reviewCount: 98,
    address: 'Quartier de la Joliette',
    city: 'Marseille',
    hours: 'Mon-Sun: 7AM-9PM',
    verified: true,
    premium: false,
    images: [
      'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800',
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
    ],
    services: [
      {
        id: 's16',
        name: 'Private Yoga Session',
        description: 'One-on-one instruction',
        duration: 60,
        price: 80,
        category: 'wellness',
      },
      {
        id: 's17',
        name: 'Meditation Class',
        description: 'Guided mindfulness practice',
        duration: 45,
        price: 25,
        category: 'wellness',
      },
      {
        id: 's18',
        name: 'Reiki Healing',
        description: 'Energy healing session',
        duration: 60,
        price: 75,
        category: 'wellness',
      },
    ],
  },
  {
    id: 'b7',
    name: 'Elite Barbershop',
    description:
      "Traditional barbershop with modern styling expertise. Specializing in men's cuts, beard grooming, and hot towel shaves.",
    category: 'hair',
    rating: 4.9,
    reviewCount: 245,
    address: 'Champs-Élysées',
    city: 'Paris',
    hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-5PM',
    verified: true,
    premium: true,
    images: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800',
    ],
    services: [
      {
        id: 's19',
        name: 'Signature Cut',
        description: 'Premium haircut with consultation',
        duration: 45,
        price: 55,
        category: 'hair',
      },
      {
        id: 's20',
        name: 'Hot Towel Shave',
        description: 'Traditional straight razor shave',
        duration: 30,
        price: 45,
        category: 'hair',
      },
      {
        id: 's21',
        name: 'Beard Trim & Shape',
        description: 'Professional beard grooming',
        duration: 30,
        price: 35,
        category: 'hair',
      },
    ],
  },
  {
    id: 'b8',
    name: 'Glow Aesthetics',
    description:
      'Advanced medical spa offering cutting-edge aesthetic treatments and anti-aging therapies.',
    category: 'facial',
    rating: 4.8,
    reviewCount: 167,
    address: 'Place Bellecour',
    city: 'Lyon',
    hours: 'Tue-Sat: 10AM-7PM',
    verified: true,
    premium: true,
    images: [
      'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=800',
      'https://images.unsplash.com/photo-1629198735700-65e9e3eee5d2?w=800',
    ],
    services: [
      {
        id: 's22',
        name: 'Microneedling',
        description: 'Collagen induction therapy',
        duration: 60,
        price: 225,
        category: 'facial',
      },
      {
        id: 's23',
        name: 'LED Light Therapy',
        description: 'Anti-aging light treatment',
        duration: 30,
        price: 85,
        category: 'facial',
      },
      {
        id: 's24',
        name: 'Dermaplaning',
        description: 'Exfoliation treatment',
        duration: 45,
        price: 95,
        category: 'facial',
      },
    ],
  },
  {
    id: 'b9',
    name: 'Luxe Nail Lounge',
    description:
      'Premium nail salon offering designer nail art, luxury pedicures, and exclusive treatments.',
    category: 'nails',
    rating: 4.9,
    reviewCount: 312,
    address: 'Le Panier',
    city: 'Marseille',
    hours: 'Mon-Sun: 9AM-9PM',
    verified: true,
    premium: true,
    images: [
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800',
    ],
    services: [
      {
        id: 's25',
        name: 'Designer Nail Art',
        description: 'Custom artistic designs',
        duration: 90,
        price: 95,
        category: 'nails',
      },
      {
        id: 's26',
        name: 'Luxury Spa Pedicure',
        description: 'Premium foot treatment',
        duration: 75,
        price: 85,
        category: 'nails',
      },
      {
        id: 's27',
        name: 'Dip Powder Manicure',
        description: 'Long-lasting color',
        duration: 60,
        price: 65,
        category: 'nails',
      },
    ],
  },
  {
    id: 'b10',
    name: 'Bliss Massage Therapy',
    description:
      'Therapeutic massage center focusing on pain relief, sports recovery, and stress management.',
    category: 'massage',
    rating: 4.7,
    reviewCount: 189,
    address: 'Vieux Port',
    city: 'Nice',
    hours: 'Mon-Sat: 8AM-9PM, Sun: 9AM-7PM',
    verified: true,
    premium: true,
    images: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
      'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800',
    ],
    services: [
      {
        id: 's28',
        name: 'Sports Massage',
        description: 'Athletic recovery treatment',
        duration: 60,
        price: 105,
        category: 'massage',
      },
      {
        id: 's29',
        name: 'Prenatal Massage',
        description: 'Specialized pregnancy massage',
        duration: 60,
        price: 95,
        category: 'massage',
      },
      {
        id: 's30',
        name: 'Couples Massage',
        description: 'Side-by-side relaxation',
        duration: 60,
        price: 190,
        category: 'massage',
      },
    ],
  },
  {
    id: 'b11',
    name: 'Perfect Arch Studio',
    description:
      'Eyebrow specialists offering microblading, threading, and lamination services.',
    category: 'brows',
    rating: 4.8,
    reviewCount: 221,
    address: 'Quartier Latin',
    city: 'Paris',
    hours: 'Tue-Sun: 10AM-7PM',
    verified: true,
    premium: true,
    images: [
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800',
      'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=800',
    ],
    services: [
      {
        id: 's31',
        name: 'Microblading',
        description: 'Semi-permanent brow enhancement',
        duration: 120,
        price: 395,
        category: 'brows',
      },
      {
        id: 's32',
        name: 'Brow Lamination',
        description: 'Brow styling treatment',
        duration: 45,
        price: 75,
        category: 'brows',
      },
      {
        id: 's33',
        name: 'Threading & Tint',
        description: 'Shape and color service',
        duration: 30,
        price: 38,
        category: 'brows',
      },
    ],
  },
  {
    id: 'b12',
    name: 'Vitality Wellness Center',
    description:
      'Comprehensive wellness facility with acupuncture, nutrition counseling, and holistic therapies.',
    category: 'wellness',
    rating: 4.9,
    reviewCount: 143,
    address: "Presqu'île",
    city: 'Lyon',
    hours: 'Mon-Fri: 8AM-7PM, Sat: 9AM-5PM',
    verified: true,
    premium: true,
    images: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    ],
    services: [
      {
        id: 's34',
        name: 'Acupuncture Session',
        description: 'Traditional Chinese medicine',
        duration: 60,
        price: 95,
        category: 'wellness',
      },
      {
        id: 's35',
        name: 'Nutrition Consultation',
        description: 'Personalized diet planning',
        duration: 60,
        price: 120,
        category: 'wellness',
      },
      {
        id: 's36',
        name: 'Cupping Therapy',
        description: 'Muscle tension relief',
        duration: 45,
        price: 70,
        category: 'wellness',
      },
    ],
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'bk1',
    businessId: 'b1',
    businessName: 'Serenity Spa & Wellness',
    serviceId: 's1',
    serviceName: 'Swedish Massage',
    date: '2026-01-15',
    time: '14:00',
    status: 'upcoming',
    price: 95,
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
  },
  {
    id: 'bk2',
    businessId: 'b2',
    businessName: 'The Hair Studio',
    serviceId: 's4',
    serviceName: "Women's Cut & Style",
    date: '2026-01-18',
    time: '10:30',
    status: 'upcoming',
    price: 85,
    customerName: 'Emma Wilson',
    customerEmail: 'emma@example.com',
  },
  {
    id: 'bk3',
    businessId: 'b1',
    businessName: 'Serenity Spa & Wellness',
    serviceId: 's2',
    serviceName: 'Deep Tissue Massage',
    date: '2025-12-20',
    time: '16:00',
    status: 'completed',
    price: 125,
    customerName: 'Michael Brown',
    customerEmail: 'michael@example.com',
  },
  {
    id: 'bk4',
    businessId: 'b3',
    businessName: 'Polished Nails Bar',
    serviceId: 's8',
    serviceName: 'Gel Manicure',
    date: '2026-01-12',
    time: '15:00',
    status: 'upcoming',
    price: 55,
    customerName: 'Lisa Davis',
    customerEmail: 'lisa@example.com',
  },
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    businessId: 'b1',
    userName: 'Jennifer M.',
    userAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 5,
    comment:
      'Amazing experience! The Swedish massage was incredibly relaxing. The therapist was professional and the atmosphere was perfect. I felt so refreshed afterwards and my muscle tension completely melted away.',
    date: '2025-12-28',
    verified: true,
    serviceName: 'Swedish Massage',
    response:
      "Thank you so much for your kind words! We're delighted you enjoyed your visit.",
  },
  {
    id: 'r2',
    businessId: 'b1',
    userName: 'David K.',
    userAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 5,
    comment:
      "Best deep tissue massage I've ever had. Really helped with my back pain. The therapist knew exactly where to focus and I've had lasting relief for over a week now.",
    date: '2025-12-15',
    verified: true,
    serviceName: 'Deep Tissue Massage',
  },
  {
    id: 'r3',
    businessId: 'b1',
    userName: 'Michelle P.',
    userAvatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    rating: 4,
    comment:
      'Lovely spa with a peaceful ambiance. The hot stone massage was wonderful, though I wish it was a bit longer. Would definitely come back for another treatment.',
    date: '2025-12-05',
    verified: true,
    serviceName: 'Hot Stone Therapy',
  },
  {
    id: 'r4',
    businessId: 'b2',
    userName: 'Amanda R.',
    userAvatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
    rating: 5,
    comment:
      "Love my new haircut! The stylist really listened to what I wanted and delivered perfectly. Best cut I've had in years and the salon has such a great vibe.",
    date: '2025-12-20',
    verified: true,
    serviceName: "Women's Cut & Style",
    response:
      "We're so happy you love it! Thank you for trusting us with your hair.",
  },
  {
    id: 'r5',
    businessId: 'b2',
    userName: 'Rachel T.',
    userAvatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    rating: 4,
    comment:
      'Great balayage results. Took a bit longer than expected but worth the wait. The color blending is beautiful and looks very natural.',
    date: '2025-12-10',
    verified: true,
    serviceName: 'Balayage',
  },
  {
    id: 'r6',
    businessId: 'b2',
    userName: 'Jessica L.',
    userAvatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    rating: 5,
    comment:
      'Absolutely love the full color treatment! My stylist was so knowledgeable and made sure I got exactly the shade I wanted. The salon is beautiful and everyone is so friendly.',
    date: '2025-11-28',
    verified: true,
    serviceName: 'Full Color',
  },
  {
    id: 'r7',
    businessId: 'b3',
    userName: 'Sophie L.',
    userAvatar:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100',
    rating: 5,
    comment:
      'Perfect gel manicure! Still looks great after two weeks. The technician was meticulous and the salon is spotless. Will definitely be returning.',
    date: '2025-12-22',
    verified: true,
    serviceName: 'Gel Manicure',
  },
  {
    id: 'r8',
    businessId: 'b3',
    userName: 'Maria G.',
    userAvatar:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100',
    rating: 5,
    comment:
      'The spa pedicure was heavenly! My feet have never felt so soft and pampered. Great value for money and such a relaxing experience.',
    date: '2025-12-18',
    verified: true,
    serviceName: 'Spa Pedicure',
  },
  {
    id: 'r9',
    businessId: 'b4',
    userName: 'Olivia H.',
    userAvatar:
      'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100',
    rating: 5,
    comment:
      'The HydraFacial was incredible. My skin has never looked better! Visible results immediately and the esthetician explained every step. Worth every penny!',
    date: '2025-12-18',
    verified: true,
    serviceName: 'Hydra Facial',
    response:
      "Thank you! We're thrilled with your results. See you next month!",
  },
  {
    id: 'r10',
    businessId: 'b4',
    userName: 'Emily S.',
    userAvatar:
      'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100',
    rating: 5,
    comment:
      'Amazing classic facial! My skin is glowing. The esthetician was very knowledgeable and gave me great skincare advice. The facility is clean and professional.',
    date: '2025-12-12',
    verified: true,
    serviceName: 'Classic Facial',
  },
];
