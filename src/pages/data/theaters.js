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
        features: ['150 inch 4k screen', '1000W Dolby atmos']
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
        features: ['150 inch 4k screen', '1000W Dolby atmos']
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
        features: ['150 inch 4k screen', '1000W Dolby atmos', 'Star ceiling']
    }
];
