import {Hand, Rank} from '@/types';
import {createDeck} from './Deck';
import {RANKS} from '@/constants';

export function generateHand(): Hand {
	const deck = createDeck();
	const rank = getRandomRank();

	switch (rank) {
		case 'Pair':
			return deck.getPair();
		case 'Two Pair':
			return deck.getTwoPairs();
		case 'Three of a Kind':
			return deck.getThreeOfAKind();
		case 'Straight':
			return deck.getStraight();
		case 'Flush':
			return deck.getFlush();
		case 'Full House':
			return deck.getFullHouse();
		case 'Four of a Kind':
			return deck.getFourOfAKind();
		case 'Straight Flush':
			return deck.getStraightFlush();
		default:
			return deck.getRandomHand();
	}
}

function getRandomRank(): Rank {
	const randomIndex = Math.floor(Math.random() * RANKS.length);
	return RANKS[randomIndex];
}
