// data/theaters.js
export const theaters = [
    {
        id: 1,
        name: 'Eleganto Theater',
        basePrice: 1299,
        maxPeople: 5,
        minPeople: 4,
        extraPersonRate: 200,
        decorationIncluded: true,
        decorationPrice: 0,
        images: ["/assets/eleganto.jpg",
            "/assets/premium.jpg",
            "/assets/starlight.jpg",
            // "/assets/luminous.jpg",
        ],
        features: ['Stylish interior', 'Premium sound', 'Mood lighting']
    },
    {
        id: 2,
        name: 'Luminous Premium Theater',
        basePrice: 1299,
        maxPeople: 12,
        minPeople: 4,
        extraPersonRate: 200,
        decorationIncluded: true,
        decorationPrice: 0,
        images: ["/assets/premium.jpg",
            "/assets/eleganto.jpg",
            "/assets/starlight.jpg",
            // "/assets/luminous.jpg",
        ],
        features: ['Alexa Control', '3 Hours Dolby Theatre']
    },
    {
        id: 3,
        name: 'Starlight Theater',
        basePrice: 1299,
        maxPeople: 7,
        minPeople: 4,
        extraPersonRate: 200,
        decorationIncluded: true,
        decorationPrice: 0,
        images: ["/assets/starlight.jpg",
            "/assets/premium.jpg",
            "/assets/eleganto.jpg",
            // "/assets/luminous.jpg",
        ],
        features: ['Alexa Control', 'Dolby Theatre']
    }
];
