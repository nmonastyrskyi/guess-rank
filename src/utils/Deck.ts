import {CARD_SUITS, CARD_VALUES} from '@/constants';
import {Card, CardSuit, CardValue, Hand} from '@/types';
import {parseCard} from './parseCard';
import {getRank} from './getRank';

export interface Deck {
	getHighCard(): Hand;
	getPair(): Hand;
	getTwoPairs(): Hand;
	getThreeOfAKind(): Hand;
	getStraight(): Hand;
	getFlush(): Hand;
	getFullHouse(): Hand;
	getFourOfAKind(): Hand;
	getStraightFlush(): Hand;
	getRoyalFlush(): Hand;
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
		return this.shuffle(this.cards).slice(0, 5);
	}

	getPair(): Hand {
		const card1 = this.pickRandomCard();
		const card2 = this.pickPair(card1);

		const card3 = this.pickNonPairCard(card1);
		const card4 = this.pickNonPairCard([card1, card3]);
		const card5 = this.pickNonPairCard([card1, card3, card4]);

		this.resetDeck();
		return this.shuffle([card1, card2, card3, card4, card5]);
	}

	getTwoPairs(): Hand {
		const card1 = this.pickRandomCard();
		const card2 = this.pickPair(card1);
		const card3 = this.pickNonPairCard(card1);

		const card4 = this.pickPair(card3);

		const card5 = this.pickNonPairCard([card1, card3]);

		this.resetDeck();

		return this.shuffle([card1, card2, card3, card4, card5]);
	}

	getThreeOfAKind(): Hand {
		const card1 = this.pickRandomCard();
		const card2 = this.pickPair(card1);
		const card3 = this.pickPair(card1);

		const card4 = this.pickNonPairCard(card1);

		const card5 = this.pickNonPairCard([card1, card4]);

		this.resetDeck();

		return this.shuffle([card1, card2, card3, card4, card5]);
	}

	getStraight(): Hand {
		const straightCardValues = this.getStraightCardValues();

		const startIndex = Math.floor(Math.random() * (straightCardValues.length - 5));
		const straight = straightCardValues
			.slice(startIndex, startIndex + 5)
			.map<Card>((value) => `${value}${this.randomSuit()}`);

		excludeStraightFlush();

		function excludeStraightFlush() {
			if (getRank(straight) === 'Straight Flush') {
				const currentSuit = parseCard(straight[0]).suit;
				const newSuit = CARD_SUITS.find((suit) => suit !== currentSuit)!;
				const index = Math.floor(Math.random() * 5);
				straight[index] = `${parseCard(straight[index]).value}${newSuit}`;
			}
		}

		return this.shuffle(straight);
	}

	private getStraightCardValues(): CardValue[] {
		return ['A', ...CARD_VALUES];
	}

	getFlush(): Hand {
		const suit = CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)];
		const shuffledOneSuiteCards = this.shuffle(this.cards).filter((card) => parseCard(card).suit === suit);

		const flush = shuffledOneSuiteCards.slice(0, 5);

		excludeStraightFlush();

		function excludeStraightFlush() {
			let index = 5;
			while (getRank(flush) === 'Straight Flush') {
				flush[0] = shuffledOneSuiteCards[index];
				index++;
			}
		}

		return flush;
	}

	getFullHouse(): Hand {
		const card1 = this.pickRandomCard();
		const card2 = this.pickPair(card1);
		const card3 = this.pickPair(card1);

		const card4 = this.pickNonPairCard(card1);

		const card5 = this.pickPair(card4);

		this.resetDeck();

		return this.shuffle([card1, card2, card3, card4, card5]);
	}

	getRoyalFlush(): Hand {
		const suit = CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)];
		const royalFlush = (['T', 'J', 'Q', 'K', 'A'] as const).map<Card>((value) => `${value}${suit}`);

		return this.shuffle(royalFlush);
	}

	private pickNonPairCard = (pairCard: Card | Card[]): Card => {
		const pairCardValuesArr = Array.isArray(pairCard)
			? pairCard.map((c) => parseCard(c).value)
			: [parseCard(pairCard).value];

		let card = this.pickRandomCard();

		while (pairCardValuesArr.includes(parseCard(card).value)) {
			card = this.pickRandomCard();
		}

		return card;
	};

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
		const straightCardValues = this.getStraightCardValues();
		const suit = this.randomSuit();
		const startIndex = Math.floor(Math.random() * (straightCardValues.length - 5));
		const straight = straightCardValues.slice(startIndex, startIndex + 5).map<Card>((value) => `${value}${suit}`);

		return this.shuffle(straight);
	}

	getHighCard(): Hand {
		let hand = this.getRandomHand();

		while (getRank(hand) !== 'High Card') {
			hand = this.getRandomHand();
		}

		return hand;
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
