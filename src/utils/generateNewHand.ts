import {Card} from '@/types';
import {createDeck} from './Deck';

/**
 *
 * @returns A new hand of 5 cards.
 */
export function generateNewHand(): [Card, Card, Card, Card, Card] {
	const deck = createDeck();

	return [
		deck.pickRandomCard(),
		deck.pickRandomCard(),
		deck.pickRandomCard(),
		deck.pickRandomCard(),
		deck.pickRandomCard(),
	];
}
