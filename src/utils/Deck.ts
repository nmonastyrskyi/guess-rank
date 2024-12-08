import {CARD_SUITS, CARD_VALUES} from '@/constants';
import {Card, CardSuit, Hand} from '@/types';
import {parseCard} from './parseCard';

export interface Deck {
	getPair(): Hand;
	getTwoPairs(): Hand;
	getThreeOfAKind(): Hand;
	getStraight(): Hand;
	getFlush(): Hand;
	getFullHouse(): Hand;
	getFourOfAKind(): Hand;
	getStraightFlush(): Hand;
	getRandomHand(): Hand;
}

class DeckImpl implements Deck {
	private cards: Card[];
	private initialCards: Card[];
	constructor() {
		this.cards = [];
		this.initialCards = [];
		for (const value of CARD_VALUES) {
			for (const suit of CARD_SUITS) {
				this.cards.push(`${value}${suit}`);
			}
		}
		this.initialCards = [...this.cards];
	}

	getRandomHand(): Hand {
		return this.shuffle(this.cards.slice(0, 5));
	}

	getPair(): Hand {
		const card1 = this.pickRandomCard();
		const card2 = this.pickPair(card1);

		let card3 = this.pickRandomCard();
		let card4 = this.pickRandomCard();
		let card5 = this.pickRandomCard();

		while (parseCard(card3).value === parseCard(card1).value) {
			card3 = this.pickRandomCard();
		}

		while (parseCard(card4).value === parseCard(card1).value) {
			card4 = this.pickRandomCard();
		}

		while (parseCard(card5).value === parseCard(card1).value) {
			card5 = this.pickRandomCard();
		}

		this.resetDeck();
		return this.shuffle([card1, card2, card3, card4, card5]);
	}

	getTwoPairs(): Hand {
		const card1 = this.pickRandomCard();
		const card2 = this.pickPair(card1);
		let card3 = this.pickRandomCard();

		while (parseCard(card3).value === parseCard(card1).value) {
			card3 = this.pickRandomCard();
		}

		const card4 = this.pickPair(card3);

		let card5 = this.pickRandomCard();

		while (parseCard(card5).value === parseCard(card1).value || parseCard(card5).value === parseCard(card3).value) {
			card5 = this.pickRandomCard();
		}

		this.resetDeck();

		return this.shuffle([card1, card2, card3, card4, card5]);
	}

	getThreeOfAKind(): Hand {
		const card1 = this.pickRandomCard();
		const card2 = this.pickPair(card1);
		const card3 = this.pickPair(card1);

		let card4 = this.pickRandomCard();

		while (parseCard(card4).value === parseCard(card1).value) {
			card4 = this.pickRandomCard();
		}

		let card5 = this.pickRandomCard();

		while (parseCard(card5).value === parseCard(card1).value) {
			card5 = this.pickRandomCard();
		}

		this.resetDeck();

		return this.shuffle([card1, card2, card3, card4, card5]);
	}

	getStraight(): Hand {
		const startIndex = Math.floor(Math.random() * (CARD_VALUES.length - 5));
		const straight = CARD_VALUES.slice(startIndex, startIndex + 5).map<Card>((value) => `${value}${this.randomSuit()}`);

		return this.shuffle(straight);
	}

	getFlush(): Hand {
		const suit = CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)];
		const flush = this.shuffle(this.cards)
			.filter((card) => card[1] === suit)
			.slice(0, 5);

		return flush;
	}

	getFullHouse(): Hand {
		const card1 = this.pickRandomCard();
		const card2 = this.pickPair(card1);
		const card3 = this.pickPair(card1);

		let card4 = this.pickRandomCard();

		while (parseCard(card4).value === parseCard(card1).value) {
			card4 = this.pickRandomCard();
		}
		const card5 = this.pickPair(card4);

		this.resetDeck();

		return this.shuffle([card1, card2, card3, card4, card5]);
	}

	getFourOfAKind(): Hand {
		const card1 = this.pickRandomCard();
		const card2 = this.pickPair(card1);
		const card3 = this.pickPair(card1);
		const card4 = this.pickPair(card1);
		const card5 = this.pickRandomCard();

		this.resetDeck();

		return this.shuffle([card1, card2, card3, card4, card5]);
	}

	getStraightFlush(): Hand {
		const suit = this.randomSuit();
		const startIndex = Math.floor(Math.random() * (CARD_VALUES.length - 5));
		const straight = CARD_VALUES.slice(startIndex, startIndex + 5).map<Card>((value) => `${value}${suit}`);

		return this.shuffle(straight);
	}

	private pickPair(card: Card): Card {
		const {value, suit} = parseCard(card);

		const pairCards = this.cards.filter((c) => c[0] === value && c[1] !== suit);

		if (pairCards.length === 0) {
			throw new Error(`Could not find pair for card ${card}`);
		}

		const secondCard = pairCards[Math.floor(Math.random() * pairCards.length)];

		this.removeCardFromTheDeck(secondCard);
		return secondCard;
	}

	private removeCardFromTheDeck(card: Card): void {
		const index = this.cards.indexOf(card);
		if (index === -1) {
			throw new Error(`Card ${card} not found in deck`);
		}
		this.cards.splice(index, 1);
	}

	private randomSuit(): CardSuit {
		return CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)];
	}

	private shuffle<T>(array: T[]): T[] {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}

	private resetDeck(): void {
		this.cards = [...this.initialCards];
	}

	private pickRandomCard(): Card {
		const randomIndex = Math.floor(Math.random() * this.cards.length);
		return this.cards.splice(randomIndex, 1)[0];
	}
}

export function createDeck() {
	return new DeckImpl();
}
