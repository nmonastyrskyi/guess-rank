import {Hand, Rank} from '@/types';
import {createDeck} from './Deck';
import {RANKS} from '@/constants';

export function generateHand(): Hand {
	const deck = createDeck();
	const rank = getRandomRank();
	console.info('🚀 ~ Rank should be: ', rank);

	switch (rank) {
		case 'High Card':
			return deck.getHighCard();
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
		case 'Royal Flush':
			return deck.getRoyalFlush();
		default:
			throw new Error('Unknown rank');
	}
}

function getRandomRank(): Rank {
	const randomIndex = Math.floor(Math.random() * RANKS.length);
	return RANKS[randomIndex];
}
