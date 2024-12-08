import {CARD_SUITS, CARD_VALUES, RANKS} from './constants';

export type Hand = Card[];

export type Rank = (typeof RANKS)[number];

export type Card = `${CardValue}${CardSuit}`;

export type CardValue = (typeof CARD_VALUES)[number];

/**
 * D - Diamonds;
 * C - Clubs;
 * H - Hearts;
 * S - Spades;
 */
export type CardSuit = (typeof CARD_SUITS)[number];
