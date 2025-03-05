// src/hooks/useBooking.js
import { useState, useEffect } from 'react';
import { theaters } from '../pages/data/theaters';
import { decorations, roses, photography } from '../pages/data/constants';
import { addBooking } from '../utils/firestore';

const useBooking = () => {
    const [selectedTheater, setSelectedTheater] = useState(
        () => JSON.parse(localStorage.getItem("selectedTheater")) || null
    );
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(
        () => JSON.parse(localStorage.getItem("selectedTimeSlot")) || null
    );
    const [isDecorationSelected, setIsDecorationSelected] = useState(
        () => JSON.parse(localStorage.getItem("isDecorationSelected")) || false
    );
    const [decorationPrice, setDecorationPrice] = useState(
        () => JSON.parse(localStorage.getItem("decorationPrice")) || 0
    );
    const [cakeSelected, setCakeSelected] = useState(
        () => JSON.parse(localStorage.getItem("cakeSelected")) || false
    );
    const [cakePrice, setCakePrice] = useState(
        () => JSON.parse(localStorage.getItem("cakePrice")) || 0
    );
    const [guestCount, setGuestCount] = useState(2);
    const [isEggless, setIsEggless] = useState(false);
    const [selectedDecorations, setSelectedDecorations] = useState([]);
    const [selectedRose, setSelectedRose] = useState(null);
    const [selectedPhotography, setSelectedPhotography] = useState(null);
    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(() => {
        localStorage.setItem("selectedTheater", JSON.stringify(selectedTheater));
        localStorage.setItem("selectedTimeSlot", JSON.stringify(selectedTimeSlot));
        localStorage.setItem("isDecorationSelected", JSON.stringify(isDecorationSelected));
        localStorage.setItem("decorationPrice", JSON.stringify(decorationPrice));
        localStorage.setItem("cakeSelected", JSON.stringify(cakeSelected));
        localStorage.setItem("cakePrice", JSON.stringify(cakePrice));
    }, [selectedTheater, selectedTimeSlot, isDecorationSelected, decorationPrice, cakeSelected, cakePrice]);

    useEffect(() => {
        if (!selectedTheater) return;

        const theater = theaters.find(t => t.id === selectedTheater) ||
            (selectedTheater === 'party' ? {
                basePrice: 3999,
                minPeople: 1,
                extraPersonRate: 0,
                decorationIncluded: false,
                decorationPrice: 0,
                maxPeople: 10, // Add maxPeople for validation
            } : null);

        if (!theater) return;

        let price = theater.basePrice;

        // Add extra guest cost
        if (guestCount > theater.minPeople && theater.extraPersonRate > 0) {
            price += (guestCount - theater.minPeople) * theater.extraPersonRate;
        }

        // Add decoration cost (fixed, not per guest)
        if (!theater.decorationIncluded && isDecorationSelected) {
            price += decorationPrice;
        }

        // Add cake cost (fixed, not per guest)
        if (cakeSelected) {
            price += cakePrice;
        }

        // Add extra decorations cost (fixed, not per guest)
        selectedDecorations.forEach(dec => {
            if (dec && dec.price) price += dec.price;
        });

        // Add rose cost (fixed, not per guest)
        if (selectedRose && selectedRose.price) {
            price += selectedRose.price;
        }

        // Add photography cost (fixed, not per guest)
        if (selectedPhotography && selectedPhotography.price) {
            price += selectedPhotography.price;
        }

        setFinalPrice(price);
    }, [
        selectedTheater,
        guestCount,
        isDecorationSelected,
        decorationPrice,
        cakeSelected,
        cakePrice,
        selectedDecorations,
        selectedRose,
        selectedPhotography,
    ]);

    const handleConfirmBooking = async (userDetails, selectedTimeSlot) => {
        if (!selectedTheater || !selectedTimeSlot || !userDetails.name || !userDetails.email || !userDetails.phone) {
            alert("Please fill in all required fields.");
            return false;
        }

        const bookingDetails = {
            theater: selectedTheater,
            timeSlot: selectedTimeSlot,
            guestCount,
            isDecorationSelected,
            decorationPrice,
            cakeSelected,
            cakePrice,
            isEggless,
            selectedDecorations,
            selectedRose,
            selectedPhotography,
            finalPrice,
            userDetails,
            status: "pending",
        };

        try {
            const bookingId = await addBooking(bookingDetails);
            console.log("Booking confirmed with ID: ", bookingId);
            return true; // Success
        } catch (error) {
            console.error("Error confirming booking: ", error);
            alert("Booking failed. Please try again.");
            return false; // Failure
        }
    };

    return {
        selectedTheater,
        setSelectedTheater,
        guestCount,
        setGuestCount,
        isDecorationSelected,
        setIsDecorationSelected,
        decorationPrice,
        setDecorationPrice,
        cakeSelected,
        setCakeSelected,
        cakePrice,
        setCakePrice,
        isEggless,
        setIsEggless,
        selectedDecorations,
        setSelectedDecorations,
        selectedRose,
        setSelectedRose,
        selectedPhotography,
        setSelectedPhotography,
        finalPrice,
        handleConfirmBooking,
    };
};

export default useBooking;