export type Product = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
};

export const contactNumbers = [
  {
    display: "+91 96320 69506",
    tel: "+919632069506",
    whatsapp: "919632069506",
  },
  {
    display: "+91 94490 53940",
    tel: "+919449053940",
    whatsapp: "919449053940",
  },
];

export const products: Product[] = [
  {
    slug: "invisible-grill",
    title: "Invisible Grill",
    eyebrow: "Our specialty",
    summary: "Everyday protection, with nothing between you and the view.",
    description:
      "Fine, tensioned stainless-steel cables add a discreet layer of protection to balconies, windows and ducts. The open design keeps natural light and fresh air flowing through your home.",
    features: ["Open, unobstructed views", "Rust-resistant steel cables", "Custom measured and fitted"],
    image: "/images/products/invisible-grill.jpg",
    imageAlt: "Stainless-steel invisible grill across a bright apartment balcony",
  },
  {
    slug: "children-safety-invisible-grill",
    title: "Children's Safety Grill",
    eyebrow: "For peace of mind",
    summary: "Closer cable spacing for family spaces and little explorers.",
    description:
      "A child-conscious version of our invisible grill, planned with closer cable spacing for balconies and windows. Enjoy the same clear, airy feel with an added layer of reassurance.",
    features: ["Closer cable spacing", "Suitable for balconies and windows", "Measured for your space"],
    image: "/images/products/children-safety-grill.jpg",
    imageAlt: "Child-safe invisible steel grill installed at a bright home balcony",
  },
  {
    slug: "balcony-safety-net",
    title: "Balcony Safety Net",
    eyebrow: "Residential",
    summary: "A light, neat safety barrier for open balconies and windows.",
    description:
      "Custom-fitted safety netting helps protect open balconies, windows and other elevated spaces while preserving ventilation. A practical choice for apartment living.",
    features: ["Custom measured to fit", "UV-resistant netting", "Neat, low-profile finish"],
    image: "/images/products/balcony-safety-net.jpg",
    imageAlt: "Discreet safety net fitted around an apartment balcony",
  },
  {
    slug: "monkey-safety-net",
    title: "Monkey Safety Net",
    eyebrow: "Built for protection",
    summary: "Durable netting helps keep balconies and terraces secure.",
    description:
      "Heavy-duty netting for balconies, terraces, windows and other open areas. The installation is planned around your property's layout for reliable everyday protection.",
    features: ["Strong, durable construction", "For terraces and balconies", "Made to your dimensions"],
    image: "/images/products/monkey-safety-net.jpg",
    imageAlt: "Heavy-duty safety net fitted across a home terrace",
  },
  {
    slug: "bird-safety-net",
    title: "Bird Safety Net",
    eyebrow: "Clean, considerate protection",
    summary: "Keep balcony spaces tidy with a discreet bird net.",
    description:
      "Fine bird and pigeon netting keeps balconies, ducts and building ledges cleaner without harming birds. The close-knit mesh blends into the surrounding space.",
    features: ["Humane bird deterrence", "Great for balconies and ducts", "Discreet, durable mesh"],
    image: "/images/products/bird-safety-net.jpg",
    imageAlt: "Fine bird net protecting a clean apartment balcony",
  },
  {
    slug: "staircase-safety-net",
    title: "Staircase Safety Net",
    eyebrow: "Protection at every level",
    summary: "A thoughtful safety layer for open stairs and landings.",
    description:
      "Netting fitted across staircase openings and railings helps protect children, elders and pets while keeping the staircase open and bright.",
    features: ["For stairs and open landings", "Made to follow your layout", "Clean and secure fit"],
    image: "/images/products/staircase-safety-net.jpg",
    imageAlt: "Protective safety net fitted along a modern staircase",
  },
  {
    slug: "sports-safety-net",
    title: "Sports Safety Net",
    eyebrow: "Ready for play",
    summary: "Reliable ball-stop netting for courts, grounds and play areas.",
    description:
      "High-strength sports netting creates a dependable boundary for school grounds, recreation spaces and courts, with sizing tailored to the venue.",
    features: ["For courts and grounds", "High-strength netting", "Custom dimensions"],
    image: "/images/products/sports-safety-net.jpg",
    imageAlt: "Sports safety net around an outdoor court",
  },
  {
    slug: "cricket-net",
    title: "Cricket Net",
    eyebrow: "Practice with confidence",
    summary: "Made-to-size cricket practice nets for home and training.",
    description:
      "Practice enclosures designed for academies, schools, grounds and terraces. We plan the net around the available pitch and training space.",
    features: ["For academies and home practice", "Weather-ready materials", "Fitted to the pitch"],
    image: "/images/products/cricket-net.jpg",
    imageAlt: "Cricket practice net enclosing a training pitch",
  },
  {
    slug: "construction-safety-net",
    title: "Construction Safety Net",
    eyebrow: "Worksite protection",
    summary: "Practical netting for scaffolding and elevated work areas.",
    description:
      "Protective site netting adds a layer of containment around building work and scaffolding to help protect workers and passers-by.",
    features: ["For scaffolding and building sites", "Strong protective mesh", "Planned for the work area"],
    image: "/images/products/construction-safety-net.jpg",
    imageAlt: "Safety netting secured around a construction scaffold",
  },
  {
    slug: "cloth-hangers",
    title: "Cloth Hangers",
    eyebrow: "Clever use of space",
    summary: "A sturdy overhead drying solution for balcony utility spaces.",
    description:
      "Ceiling-mounted cloth-drying hangers free up floor space in balconies and utility areas. A simple, convenient fit for everyday laundry.",
    features: ["Saves useful floor space", "Balcony and utility friendly", "Easy everyday use"],
    image: "/images/products/cloth-hangers.jpg",
    imageAlt: "Ceiling-mounted laundry drying hanger in a bright balcony utility area",
  },
];

export function whatsappLink(message: string, number = contactNumbers[0]) {
  return `https://wa.me/${number.whatsapp}?text=${encodeURIComponent(message)}`;
}
