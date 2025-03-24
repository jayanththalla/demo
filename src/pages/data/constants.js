// data/constants.js
export const timeSlots = [
    '10:00 AM - 1:00 PM',
    '2:00 PM - 5:00 PM',
    '5:00 PM - 8:00 PM',
    '8:00 PM - 11:00 PM',
    '11:00 PM - 12:30 AM'
];

export const notes = [
    'There will be no reduction in price if lesser members arrive',
    'We do not stream any content. We will cast your phone and you can view from your OTT accounts',
    'Alcohol and smoking is not allowed in the theatre premises',
    'Rescheduling can be done only if informed prior 12 hours and can be done only once',
    'Couple below 18 will not be entertained',
    'Customers will be liable to pay in case of any damage to the theater caused by them. Cleaning fee up to Rs 500 will be charged in cases where significant cleaning would be required after check out',
    'Once all the details are confirmed, an advance of 700 rupees has to be made to book the slot',
    'Bursting of party poppers and snow sprays is not allowed in the theatre premises and will be charged if done so'
];

export const decorations = [
    { id: 'led-letters', name: 'LED letters', image: 'https://m.media-amazon.com/images/I/717RZtho4wL._AC_UF894,1000_QL80_.jpg', price: 350 },
    { id: 'fog-effect', name: 'Fog effect', image: 'https://admin.balloonsunlimited.in/media/catalog/product//c/l/cloudeffect2.jpg', price: 450 },
    { id: 'photo-clippings', name: 'Photo Clippings', image: 'https://5.imimg.com/data5/SELLER/Default/2021/11/CG/OS/RT/41622768/2.jpg', price: 200 },
    { id: 'party-props', name: 'Party props', image: 'https://m.media-amazon.com/images/I/81or9kbulHL.jpg', price: 250 },
    { id: 'led-numbers', name: 'LED numbers', image: 'https://5.imimg.com/data5/SELLER/Default/2022/6/RO/ZU/NE/14086426/unicorn-marquee-light.jpg', price: 300 },
];

export const roses = [
    { id: 'single-rose', name: 'Single Rose', image: 'https://i.etsystatic.com/9089126/r/il/0be1c4/4828488075/il_570xN.4828488075_ewih.jpg', price: 150 },
    { id: 'rose-bouquet', name: 'Rose bouquet', image: 'https://www.juneflowers.com/wp-content/uploads/2022/08/Designer-Bouquet-of-12-Red-Roses.jpg', price: 350 },
];

export const photography = [
    { id: '30-pictures', name: '30 pictures', image: 'https://m.media-amazon.com/images/I/71v28mgWe+L._AC_UF894,1000_QL80_.jpg', price: 500 },
    { id: '50-pictures', name: '50 pictures', image: 'https://collage-maker.com/wp-content/uploads/50-picture-collage-landscape.png', price: 800 },
    { id: '75-pictures', name: '75 pictures', image: 'https://ipt.images.tshiftcdn.com/206728/x/0/beginner-s-guide-to-types-of-cameras-for-digital-photography-2.jpg?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-3.3.0&w=883', price: 1100 },
    { id: '100-pictures', name: '100 pictures', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/SonyDSLRAlpha100_VL.jpg/1200px-SonyDSLRAlpha100_VL.jpg', price: 1300 },
    { id: '1-hour-unlimited', name: '1 hour unlimited', image: 'https://images.squarespace-cdn.com/content/v1/53c44fe2e4b0389390081a0e/1433166445106-MBGPPEKV9GXBSE8JH1QB/image-asset.jpeg', price: 1500 },
];

export const decorationOptions = [
    { id: 'birthday', name: 'Birthday', image: '/assets/decorations/birthday.png', price: 749 },
    { id: 'anniversary', name: 'Anniversary', image: '/assets/decorations/anniversary.png', price: 749 },
    { id: 'farewell', name: 'Farewell', image: '/assets/decorations/farewell.png', price: 749 },
    { id: 'bride', name: 'Bride to be', image: '/assets/decorations/bride.png', price: 749 },
    { id: 'romantic', name: 'Romantic Date', image: '/assets/decorations/romantic.png', price: 749 },
    { id: 'baby', name: 'Baby Shower', image: '/assets/decorations/baby.png', price: 749 },
    { id: 'celebrations', name: 'Celebrations', image: '/assets/decorations/celebrations.png', price: 749 },
    { id: 'love', name: 'Love Proposal', image: '/assets/decorations/love.png', price: 749 },
    { id: 'marriage', name: 'Marriage Proposal', image: '/assets/decorations/marriage.png', price: 749 },
    { id: 'groom', name: 'Groom to be', image: '/assets/decorations/groom.png', price: 749 },
];

export const cakeOptions = [
    { id: 'vanilla', name: 'Vanilla', image: 'https://images.pexels.com/photos/8478064/pexels-photo-8478064.jpeg?auto=compress&cs=tinysrgb&w=600', price: 900 },
    { id: 'pineapple', name: 'Pineapple', image: 'https://static.wixstatic.com/media/8ee0e2_98be4e9f62654632b79e43fea329856b~mv2.jpg/v1/fill/w_315,h_315,al_c,lg_1,q_80,enc_avif,quality_auto/8ee0e2_98be4e9f62654632b79e43fea329856b~mv2.jpg', price: 950 },
    { id: 'mango', name: 'Mango', image: 'https://bkmedia.bakingo.com/pulpy-mango-cream-cake-cake3316mang-AA.jpg', price: 1000 },
    { id: 'strawberry', name: 'Strawberry', image: 'https://images.pexels.com/photos/17172217/pexels-photo-17172217/free-photo-of-cake-with-strawberries-on-plate.jpeg?auto=compress&cs=tinysrgb&w=600', price: 950 },
    { id: 'chocolate', name: 'Chocolate', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT6I6Wua2jj-SjfF44nLnH4a-uGStM1T5nC5OeKN86SLECt_jVaT4lrtEaEsHfH6hL0ldlmliNObsDhyf5n2qKtngsCrlQaWp-fwYeHn0Q', price: 950 },
    { id: 'blackforest', name: 'Black Forest', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0_tbrJhFqRBvlE7U2ICxmKMfmAS80QxP_naYKScnbLyK_zrqKmX7dRX5KbrHRUV0zhJE7OcXxrbn-phcibPiCD5rG5_S2dBiJrBfKgB1SxheGEdBFd_VfFOqFR9BPQqnp_ZIeWgtpX8L6/s1600/DSC07710.JPG', price: 950 },
    { id: 'chocolatetruffle', name: 'Chocolate Truffle', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUgLwhCAdcxuhO9zY060n0A5a8QpBUEg7nZqaw5wTmXjHOFTc4vyaEIJGgseWH3UugOEg&usqp=CAU', price: 1000 },
    { id: 'whiteforest', name: 'White Forest', image: 'https://www.shreemithai.com/cdn/shop/files/white-forest-cake-698072.jpg?v=1712414953', price: 950 },
    { id: 'butterscotch', name: 'Butterscotch', image: 'https://www.shreemithai.com/cdn/shop/products/butterscotch-cake-191654.jpg?v=1707819767&width=1200', price: 950 },
];


