import {CARD_SUITS, CARD_VALUES, RANKS} from './constants';

export type Hand = readonly [Card, Card, Card, Card, Card];

export type Rank = (typeof RANKS)[number];

export type Card = `${CardValue}${CardSuit}`;

type CardValue = (typeof CARD_VALUES)[number];

/**
 * D - Diamonds;
 * C - Clubs;
 * H - Hearts;
 * S - Spades;
 */
type CardSuit = (typeof CARD_SUITS)[number];
