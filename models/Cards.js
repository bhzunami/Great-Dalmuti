// All existing ranks in the game
// used as Map
export const RANKS = {
    1: 'Great Dalmuti',
    2: 'Erzbischof',
    3: 'Hofmarschall',
    4: 'Baronin',
    5: 'Äbtissin',
    6: 'Ritter',
    7: 'Näherin',
    8: 'Steinmetz',
    9: 'Köchin',
    10: 'Schafhirtin',
    11: 'Bergmann',
    12: 'Tagelöhner',
    13: 'Narr'
};

// static URL for cards
const CARD_URLS = {
    hidden: "/static/cards/back.png"
};

// Get the correct card for the rank
Object.keys(RANKS).forEach(rank => CARD_URLS[rank] = `/static/cards/karte${rank}.jpg`);
export { CARD_URLS };

// A card set represents all cards that are in one game
export const CARD_SET = [
    1,
    2, 2,
    3, 3, 3,
    4, 4, 4, 4,
    5, 5, 5, 5, 5,
    6, 6, 6, 6, 6, 6,
    7, 7, 7, 7, 7, 7, 7,
    8, 8, 8, 8, 8, 8, 8, 8,
    9, 9, 9, 9, 9, 9, 9, 9, 9,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
    13, 13
];

// modern Fisher–Yates shuffle
// Link: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
// Shuffle a card set for a game
export function getCardsShuffled() {
    const cards = CARD_SET.slice(0);
    let tmp;
    for (var i = cards.length; i-- > 1;) {
        let j = Math.floor(Math.random() * cards.length);
        tmp = cards[i];
        cards[i] = cards[j];
        cards[j] = tmp;
    }

    return cards;
}
