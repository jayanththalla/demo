// data/theaters.js
export const theaters = [
    {
        id: 1,
        name: 'Vintage Theater',
        basePrice: 2399,
        maxPeople: 3,
        minPeople: 2,
        extraPersonRate: 0,
        decorationIncluded: true,
        decorationPrice: 0,
        image: "/assets/theatre/1.png",
        features: ['Cozy setting', 'Premium sound', 'Recliner seats']
    },
    {
        id: 2,
        name: 'Luminous Theater',
        basePrice: 1799,
        maxPeople: 12,
        minPeople: 4,
        extraPersonRate: 400,
        decorationIncluded: false,
        decorationPrice: 750,
        image: "/assets/theatre/2.png",
        features: ['Large screen', 'Group seating', 'Snack bar']
    },
    {
        id: 3,
        name: 'Eleganto Theater',
        basePrice: 2399,
        maxPeople: 6,
        minPeople: 4,
        extraPersonRate: 400,
        decorationIncluded: true,
        decorationPrice: 0,
        image: "/assets/theatre/3.png",
        features: ['Stylish interior', 'Premium sound', 'Mood lighting']
    },
    {
        id: 4,
        name: 'Starlight Theater',
        basePrice: 2399,
        maxPeople: 7,
        minPeople: 4,
        extraPersonRate: 400,
        decorationIncluded: true,
        decorationPrice: 0,
        specialFeature: 'with artificial star gazing lighting',
        image: "/assets/theatre/4.png",
        features: ['Star ceiling', 'Surround sound', 'Premium seating']
    }
];