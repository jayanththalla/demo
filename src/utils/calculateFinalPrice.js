export const calculateFinalPrice = ({
    selectedTheater,
    guestCount,
    isDecorationSelected,
    decorationPrice,
    cakeSelected,
    cakePrice,
    selectedDecorations,
    selectedRose,
    selectedPhotography,
    decorations,
    roses,
    photography,
    theaters,
}) => {
    if (!selectedTheater) return 0;

    const theater = theaters.find(t => t.id === selectedTheater) ||
        (selectedTheater === 'party' ? {
            basePrice: 3999,
            minPeople: 1,
            extraPersonRate: 0,
            decorationIncluded: false,
            decorationPrice: 0
        } : null);

    if (!theater) return 0;

    let price = theater.basePrice;

    // Add extra guest cost
    if (guestCount > theater.minPeople && theater.extraPersonRate > 0) {
        price += (guestCount - theater.minPeople) * theater.extraPersonRate;
    }

    // Add decoration cost
    if (!theater.decorationIncluded && isDecorationSelected) {
        price += decorationPrice;
    }

    // Add cake cost
    if (cakeSelected) {
        price += cakePrice;
    }

    // Add extra decorations cost
    selectedDecorations.forEach(id => {
        const item = decorations.find(d => d.id === id);
        if (item) price += item.price;
    });

    // Add rose cost
    if (selectedRose) {
        const roseItem = roses.find(r => r.id === selectedRose);
        if (roseItem) price += roseItem.price;
    }

    // Add photography cost
    if (selectedPhotography) {
        const photoItem = photography.find(p => p.id === selectedPhotography);
        if (photoItem) price += photoItem.price;
    }

    return price;
};