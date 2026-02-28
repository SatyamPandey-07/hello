export interface CarModel {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    specs: { power: string; speed: string; acceleration: string };
    price: string;
    priceNum: number;
    gradient: string;
    image: string;
    gallery: string[];
    features: string[];
    color: string;
}

export const carModels: CarModel[] = [
    {
        slug: "911-carrera",
        name: "911 Carrera",
        tagline: "The Icon",
        description: "Pure driving pleasure in its most iconic form. Rear-engine layout, timeless design.",
        specs: { power: "379 hp", speed: "182 mph", acceleration: "4.0s" },
        price: "From $106,100",
        priceNum: 106100,
        gradient: "from-zinc-900 via-zinc-800 to-zinc-900",
        image: "https://images.unsplash.com/photo-1553201108-3cb4c5a04302?q=80&w=4000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1553201108-3cb4c5a04302?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=4000&auto=format&fit=crop",
        ],
        features: [
            "3.0L Twin-Turbo Flat-6 Engine",
            "8-Speed PDK Dual-Clutch Transmission",
            "Porsche Active Suspension Management (PASM)",
            "10.9\" Porsche Communication Management",
            "LED Matrix Headlights with PDLS+",
            "Sport Chrono Package Ready",
        ],
        color: "#c0c0c0",
    },
    {
        slug: "911-carrera-s",
        name: "911 Carrera S",
        tagline: "Elevated Performance",
        description: "Enhanced twin-turbo power with wider body and advanced dynamics.",
        specs: { power: "443 hp", speed: "190 mph", acceleration: "3.9s" },
        price: "From $120,340",
        priceNum: 120340,
        gradient: "from-red-950/50 via-zinc-900 to-zinc-900",
        image: "https://images.unsplash.com/photo-1768066522148-2a9d0df56803?q=80&w=4000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1768066522148-2a9d0df56803?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?q=80&w=4000&auto=format&fit=crop",
        ],
        features: [
            "3.0L Twin-Turbo Flat-6 (443 hp)",
            "8-Speed PDK with Sport Response",
            "PASM Sport Suspension (-10mm)",
            "Sport Exhaust System",
            "20/21\" Carrera S Wheels",
            "Adaptive Sport Seats Plus",
        ],
        color: "#dc2626",
    },
    {
        slug: "911-turbo",
        name: "911 Turbo",
        tagline: "Explosive Power",
        description: "All-wheel drive precision with devastating acceleration and active aerodynamics.",
        specs: { power: "572 hp", speed: "198 mph", acceleration: "2.7s" },
        price: "From $177,200",
        priceNum: 177200,
        gradient: "from-orange-950/50 via-zinc-900 to-zinc-900",
        image: "https://images.unsplash.com/photo-1738169679745-a4be01c7292d?q=80&w=4000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1738169679745-a4be01c7292d?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584345604476-8ec5f82d661f?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=4000&auto=format&fit=crop",
        ],
        features: [
            "3.7L Twin-Turbo Flat-6 (572 hp)",
            "Porsche Traction Management (PTM) AWD",
            "Active Aerodynamics with PAA",
            "PDCC Sport (Active Roll Stabilisation)",
            "Rear-Axle Steering",
            "PCCB Ceramic Composite Brakes",
        ],
        color: "#ea580c",
    },
    {
        slug: "911-gt3",
        name: "911 GT3",
        tagline: "Track Weapon",
        description: "Naturally aspirated 4.0L flat-six screaming to 9,000 RPM. Pure motorsport DNA.",
        specs: { power: "502 hp", speed: "197 mph", acceleration: "3.2s" },
        price: "From $162,450",
        priceNum: 162450,
        gradient: "from-blue-950/50 via-zinc-900 to-zinc-900",
        image: "https://images.unsplash.com/photo-1693149351428-15a4961d698d?q=80&w=4000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1693149351428-15a4961d698d?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584345604476-8ec5f82d661f?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=4000&auto=format&fit=crop",
        ],
        features: [
            "4.0L Naturally Aspirated Flat-6 (502 hp)",
            "6-Speed GT Sport Manual / 7-Speed PDK",
            "Double-Wishbone Front Axle",
            "Motorsport-Derived Rear Wing",
            "Roll Cage (Clubsport Package)",
            "Lightweight Forged Wheels",
        ],
        color: "#2563eb",
    },
    {
        slug: "taycan",
        name: "Taycan",
        tagline: "Soul, Electrified",
        description: "Striking proportions, timeless and instantly recognizable design. The first all-electric Porsche.",
        specs: { power: "402 hp", speed: "143 mph", acceleration: "4.5s" },
        price: "From $90,900",
        priceNum: 90900,
        gradient: "from-cyan-950/50 via-zinc-900 to-zinc-900",
        image: "https://images.unsplash.com/photo-1658052855902-0e3428bd89fc?q=80&w=4000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1658052855902-0e3428bd89fc?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=4000&auto=format&fit=crop",
        ],
        features: [
            "Dual Electric Motors (402 hp)",
            "93.4 kWh Performance Battery Plus",
            "800-Volt Architecture",
            "Porsche Recuperation Management",
            "Adaptive Air Suspension",
            "Curved Digital Display Cluster",
        ],
        color: "#06b6d4",
    },
    {
        slug: "panamera",
        name: "Panamera",
        tagline: "Drive. And Driven.",
        description: "Sports car performance forged with luxury sedan comfort for the everyday.",
        specs: { power: "348 hp", speed: "169 mph", acceleration: "5.0s" },
        price: "From $99,900",
        priceNum: 99900,
        gradient: "from-purple-950/50 via-zinc-900 to-zinc-900",
        image: "https://images.unsplash.com/photo-1678789521533-3967bcebb275?q=80&w=4000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1678789521533-3967bcebb275?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=4000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584345604476-8ec5f82d661f?q=80&w=4000&auto=format&fit=crop",
        ],
        features: [
            "2.9L Twin-Turbo V6 (348 hp)",
            "8-Speed PDK Dual-Clutch",
            "Adaptive Air Suspension with PASM",
            "4-Zone Climate Control",
            "Rear Seat Entertainment",
            "Bose® Surround Sound System",
        ],
        color: "#9333ea",
    },
];
