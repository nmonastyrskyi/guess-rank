import {Hand} from './types';

export const CARD_VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'] as const;

export const CARD_SUITS = ['D', 'C', 'H', 'S'] as const;

export const RANKS = [
	'High Card',
	'Pair',
	'Two Pair',
	'Three of a Kind',
	'Straight',
	'Flush',
	'Full House',
	'Four of a Kind',
	'Straight Flush',
] as const;

export const DEFAULT_RANK = RANKS[0];

export const DEFAULT_HAND: Hand = ['2D', '3D', '4D', '5D', '6D'];

export const GAME_TIMEOUT_IN_SECONDS = 100;
export const RIGHT_ANSWER_TIME_BONUS_IN_SECONDS = 5;
export const WRONG_ANSWER_TIME_PENALTY_IN_SECONDS = 5;
