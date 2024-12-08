import {Card, CardSuit, CardValue} from '@/types';

export function parseCard(card: Card): {
	value: CardValue;
	suit: CardSuit;
} {
	return {
		value: card[0] as CardValue,
		suit: card[1] as CardSuit,
	};
}
