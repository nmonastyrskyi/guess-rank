import {Card} from '@/types';

export function getCardUrl(card: Card): string {
	return `https://deckofcardsapi.com/static/img/${card.replace('T', '0')}.png`;
}
