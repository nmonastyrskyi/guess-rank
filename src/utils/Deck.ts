import {CARD_SUITS, CARD_VALUES} from '@/constants';
import {Card} from '@/types';

interface Deck {
	pickRandomCard(): Card;
}

class DeckImpl implements Deck {
	private cards: Card[];
	constructor() {
		this.cards = [];
		for (const value of CARD_VALUES) {
			for (const suit of CARD_SUITS) {
				this.cards.push(`${value}${suit}`);
			}
		}
	}

	pickRandomCard(): Card {
		const randomIndex = Math.floor(Math.random() * this.cards.length);
		return this.cards.splice(randomIndex, 1)[0];
	}
}

export function createDeck() {
	return new DeckImpl();
}
